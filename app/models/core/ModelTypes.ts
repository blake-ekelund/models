export type InputType = "number" | "currency" | "percent" | "integer";

export interface InputDefinition {
  key: string;
  label: string;
  type: InputType;
  default: number;
  min?: number;
  max?: number;
  description?: string;
}

export interface OutputDefinition {
  key: string;
  label: string;
  unit: "currency" | "percent" | "number" | "months";
}

/* ---------------------------------------------
   NEW: Section definition
--------------------------------------------- */
export interface ModelSection {
  id: string;
  label: string;

  /**
   * Which inputs belong to this section
   */
  inputKeys: string[];

  /**
   * Optional description shown in UI
   */
  description?: string;
}

export interface ModelDefinition {
  id: string;
  name: string;
  category: string;

  /**
   * High-level structure of the model UI
   */
  sections: ModelSection[];

  /**
   * All inputs used by the model
   */
  inputs: InputDefinition[];

  /**
   * All outputs produced by the model
   */
  outputs: OutputDefinition[];

  compute: (
    inputs: Record<string, number>,
    ctx: ModelRuntimeContext
  ) => Record<string, number>;

  /**
   * Semantic outputs this model consumes from others
   * (used later for composition)
   */
  consumes?: string[];
}

export interface ModelRuntimeContext {
  get: (key: string) => number;
}
