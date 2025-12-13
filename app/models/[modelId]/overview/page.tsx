"use client";

import { useParams } from "next/navigation";

import { useModelInstanceStore } from "@/app/models/[modelId]/components/useModelInstanceStore";
import { buildSaaSCoreModel } from "@/app/models/engines/saas-core/buildModel";

import InputCards from "./components/InputCards";
import KpiCards from "./components/KpiCards";
import ChartArea from "./components/ChartArea";

export default function OverviewPage() {
  const { modelId } = useParams<{ modelId: string }>();

  // ✅ CRITICAL: history.present can be undefined during hydration / saves
  const inputs =
    useModelInstanceStore((s) => s.history.present) ?? {};

  // build model defensively
  const model = buildSaaSCoreModel(inputs);

  return (
    <div className="max-w-7xl mx-auto px-8 py-6 space-y-6">
      <InputCards
        modelId={modelId}
        inputs={inputs}
      />

      <KpiCards model={model} />

      <ChartArea />
    </div>
  );
}
