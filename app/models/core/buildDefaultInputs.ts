import type { ModelDefinition } from "./ModelTypes";

export function buildDefaultInputs(
  definition: ModelDefinition
): Record<string, number> {
  return definition.inputs.reduce((acc, input) => {
    acc[input.key] = input.default;
    return acc;
  }, {} as Record<string, number>);
}
