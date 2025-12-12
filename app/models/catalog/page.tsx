"use client";

import { useRouter } from "next/navigation";
import { useModelContext } from "@/app/models/context/ModelContext";
import { useSaaSCoreStore } from "@/app/models/engines/saas-core/store";

type ModelCategory =
  | "Revenue"
  | "Cash Flow"
  | "Profitability"
  | "Planning"
  | "Operational";

interface CatalogModel {
  slug: string;
  name: string;
  desc: string;
  category: ModelCategory;
  status: "Available" | "Coming Soon";
}

const MODELS: CatalogModel[] = [
  {
    slug: "saas-core",
    name: "SaaS Revenue Model — Core",
    desc: "Steady-state SaaS economics: CAC, ARPU, churn, LTV, and payback.",
    category: "Revenue",
    status: "Available",
  },
  {
    slug: "cash-flow",
    name: "Cash Flow Model",
    desc: "Project runway, burn, and ending cash over time.",
    category: "Cash Flow",
    status: "Coming Soon",
  },
  {
    slug: "pricing",
    name: "Pricing Sensitivity Model",
    desc: "Test pricing changes and revenue impact.",
    category: "Revenue",
    status: "Coming Soon",
  },
];

export default function ModelsCatalogPage() {
  const router = useRouter();
  const { createModel } = useModelContext();
  const { inputs } = useSaaSCoreStore();

  async function handleSelect(model: CatalogModel) {
    if (model.status !== "Available") return;

    // Create a NEW model instance (Supabase-backed)
    const instance = await createModel({
      name: model.name,
      type: model.slug,
      inputs,
    });

    // Route into the new model workspace
    router.push(`/models/${instance.id}/overview`);
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-semibold text-[#1B3C53]">
          Create a New Model
        </h1>
        <p className="text-sm text-[#456882] mt-1">
          Choose a model to start from. Each selection creates a new working
          copy.
        </p>
      </header>

      {/* MODEL LIST */}
      <div className="space-y-3">
        {MODELS.map((model) => (
          <div
            key={model.slug}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="space-y-1">
              <div className="text-sm font-medium text-[#1B3C53]">
                {model.name}
              </div>

              <div className="text-xs text-[#456882]">
                {model.desc}
              </div>

              <div className="text-[11px] uppercase tracking-wide text-[#456882]/70">
                {model.category}
              </div>
            </div>

            {model.status === "Available" ? (
              <button
                onClick={() => handleSelect(model)}
                className="text-sm font-medium text-[#00338d] hover:underline"
              >
                Select
              </button>
            ) : (
              <span className="text-xs text-[#456882]/60">
                Coming soon
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
