import type { ModelInstance } from "@/app/models/context/ModelContext";
import { ModelRegistry } from "@/app/models/core/ModelRegistry";

/**
 * Export a model instance to Excel (xlsx)
 * - Sheet 1: Inputs
 * - Sheet 2: Outputs (computed)
 */
export async function exportModelToExcel(model: ModelInstance) {
  const XLSX = await import("xlsx");

  const definition = ModelRegistry[model.type];

  if (!definition) {
    throw new Error(`Unknown model type: ${model.type}`);
  }

  /* -----------------------------
     Build Inputs Sheet
  ----------------------------- */
  const inputRows = definition.inputs.map((input) => ({
    Input: input.label,
    Key: input.key,
    Value: model.inputs[input.key],
    Type: input.type,
  }));

  const inputsSheet = XLSX.utils.json_to_sheet(inputRows);

  /* -----------------------------
     Compute Outputs
  ----------------------------- */
  const outputs = definition.compute(model.inputs, {
    get: () => {
      throw new Error("Cross-model context not implemented yet");
    },
  });

  const outputRows = definition.outputs.map((output) => ({
    Output: output.label,
    Key: output.key,
    Value: outputs[output.key],
    Unit: output.unit,
  }));

  const outputsSheet = XLSX.utils.json_to_sheet(outputRows);

  /* -----------------------------
     Build Workbook
  ----------------------------- */
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, inputsSheet, "Inputs");
  XLSX.utils.book_append_sheet(workbook, outputsSheet, "Outputs");

  /* -----------------------------
     Download
  ----------------------------- */
  XLSX.writeFile(workbook, `${model.name}.xlsx`);
}
