// lib/excel/exportWorkbook.ts
import * as XLSX from "xlsx";

interface WorkbookSheet {
  name: string;
  columns?: string[];
  rows: (string | number)[][];
}

interface WorkbookSpec {
  filename: string;
  sheets: WorkbookSheet[];
}

export function exportWorkbook(spec: WorkbookSpec) {
  const wb = XLSX.utils.book_new();

  for (const sheet of spec.sheets) {
    const data = sheet.columns
      ? [sheet.columns, ...sheet.rows]
      : sheet.rows;

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheet.name);
  }

  // 🚨 This line triggers the download
  XLSX.writeFile(wb, spec.filename);
}
