import * as XLSX from "xlsx";
import path from "path";
import fs from "fs/promises";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface RevenueTemplateInputs {
  adSpend: number;
  cac: number;
  churnPct: number; // 0–100
  arppu: number;

  userId?: string; // logged-in
  anonId?: string; // anonymous
}

export async function exportRevenueFromTemplate({
  adSpend,
  cac,
  churnPct,
  arppu,
  userId,
  anonId,
}: RevenueTemplateInputs) {
  /* ----------------------------------
     0. Validate identity
  ---------------------------------- */
  if (!userId && !anonId) {
    throw new Error("Either userId or anonId is required");
  }

  const ownerPath = userId
    ? `user_${userId}`
    : `anon_${anonId}`;

  /* ----------------------------------
     1. Load template from disk
  ---------------------------------- */
  const templatePath = path.join(
    process.cwd(),
    "templates",
    "revenue",
    "12-month_revenue_model.xlsx"
  );

  const fileBuffer = await fs.readFile(templatePath);

  const workbook = XLSX.read(fileBuffer, {
    type: "buffer",
    cellFormula: true,
    cellStyles: true,
  });

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  /* ----------------------------------
     2. Inject inputs (C6:C9)
  ---------------------------------- */
  sheet["C6"].v = adSpend;
  sheet["C7"].v = cac;
  sheet["C8"].v = churnPct / 100; // Excel expects decimal
  sheet["C9"].v = arppu;

  /* ----------------------------------
     3. Force Excel recalculation on open
  ---------------------------------- */
  if (!workbook.Workbook) workbook.Workbook = {};
  (workbook.Workbook as any).CalcPr = { fullCalcOnLoad: true };

  /* ----------------------------------
     4. Write workbook to buffer
  ---------------------------------- */
  const outputBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });

  /* ----------------------------------
     5. Upload to Supabase Storage
  ---------------------------------- */
  const timestamp = new Date().toISOString();
  const storagePath =
    `revenue/${ownerPath}/${timestamp}_12-month_revenue_model.xlsx`;

  const { error } = await supabase.storage
    .from("exports")
    .upload(storagePath, outputBuffer, {
      contentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      upsert: false,
    });

  if (error) throw error;

  /* ----------------------------------
     6. Signed URL
  ---------------------------------- */
  const { data } = await supabase.storage
    .from("exports")
    .createSignedUrl(storagePath, 60 * 10);

  return {
    storagePath,
    url: data?.signedUrl,
    owner: ownerPath,
  };
}
