import type { ModelDefinition } from "./ModelTypes";
import { SaaSRevenueModel } from "./definitions/saasRevenue";

export const ModelRegistry: Record<string, ModelDefinition> = {
  "saas-core": SaaSRevenueModel,
};
