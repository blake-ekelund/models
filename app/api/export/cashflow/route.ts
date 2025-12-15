import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import fs from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  const anonId: string | null = body.anonId ?? null;
  const inputs = body.inputs;

  if (!anonId) {
    return NextResponse.json(
      { error: "Missing anonymous identifier" },
      { status: 400 }
    );
  }

  /* ----------------------------------
     1. Load Excel template
  ---------------------------------- */
  const templatePath = path.join(
    process.cwd(),
    "templates",
    "cashflow",
    "12-month_cashflow_model.xlsx"
  );

  const raw = await fs.readFile(templatePath);

  const workbook = new ExcelJS.Workbook();

  // @ts-expect-error — ExcelJS typings are incorrect for Node 20 buffers
  await workbook.xlsx.load(raw);

  const sheet = workbook.worksheets[0];

  /* ----------------------------------
     2. Inject inputs
     (adjust cell refs if needed)
  ---------------------------------- */
  sheet.getCell("C6").value = inputs.startingCash;
  sheet.getCell("C7").value = inputs.monthlyRevenue;
  sheet.getCell("C8").value = inputs.cogsPct / 100;
  sheet.getCell("C9").value = inputs.monthlyOpex;

  workbook.calcProperties.fullCalcOnLoad = true;

  /* ----------------------------------
     3. Write Excel to buffer
  ---------------------------------- */
  const outputBuffer = await workbook.xlsx.writeBuffer();

  /* ----------------------------------
     4. Upload to Supabase Storage
  ---------------------------------- */
  const timestamp = new Date().toISOString();
  const storagePath =
    `cashflow/anon_${anonId}/${timestamp}_12-month_cashflow.xlsx`;

  const { error } = await supabase.storage
    .from("exports")
    .upload(storagePath, Buffer.from(outputBuffer), {
      contentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      upsert: false,
    });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  /* ----------------------------------
     5. Signed URL
  ---------------------------------- */
  const { data } = await supabase.storage
    .from("exports")
    .createSignedUrl(storagePath, 60 * 10);

  return NextResponse.json({
    downloadUrl: data?.signedUrl,
    storagePath,
    owner: `anon_${anonId}`,
  });
}
