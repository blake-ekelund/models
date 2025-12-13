"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useModelContext } from "@/app/models/context/ModelContext";
import { ModelRegistry } from "@/app/models/core/ModelRegistry";
import InputRenderer from "@/app/models/core/renderers/InputRenderer";
import { useModelInstanceStore } from "@/app/models/core/instance/useModelInstanceStore";

/* ---------------------------------------------
   Output formatting
--------------------------------------------- */
function formatOutput(
  value: number,
  unit: "currency" | "percent" | "number" | "months"
) {
  switch (unit) {
    case "currency":
      return value.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    case "percent":
      return `${(value * 100).toFixed(1)}%`;
    case "months":
      return `${value.toFixed(1)} mo`;
    default:
      return value.toLocaleString();
  }
}

export default function ModelPage() {
  const { id } = useParams<{ id: string }>();

  const {
    recentModels,
    activeModel,
    setActiveModel,
  } = useModelContext();

  const inputs = useModelInstanceStore((s) => s.inputs);
  const setInputs = useModelInstanceStore((s) => s.setInputs);
  const setInput = useModelInstanceStore((s) => s.setInput);

  /* ---------------------------------------------
     Resolve model instance from route
  --------------------------------------------- */
  const model =
    activeModel?.id === id
      ? activeModel
      : recentModels.find((m) => m.id === id);

  /* ---------------------------------------------
     Resolve model definition (may be undefined)
  --------------------------------------------- */
  const definition = model
    ? ModelRegistry[model.type]
    : undefined;

  /* ---------------------------------------------
     Sync active model with route
  --------------------------------------------- */
  useEffect(() => {
    if (model && activeModel?.id !== model.id) {
      setActiveModel(model);
    }
  }, [model, activeModel, setActiveModel]);

  /* ---------------------------------------------
     Hydrate instance store from persisted inputs
  --------------------------------------------- */
  useEffect(() => {
    if (model) {
      setInputs(model.inputs);
    }
  }, [model, setInputs]);

  /* ---------------------------------------------
     Compute outputs (SAFE: always called)
  --------------------------------------------- */
  const outputs = useMemo(() => {
    if (!definition) return {};

    try {
      return definition.compute(inputs, {
        get: () => {
          throw new Error("Cross-model context not implemented yet");
        },
      });
    } catch {
      return {};
    }
  }, [definition, inputs]);

  /* ---------------------------------------------
     Render guards (AFTER hooks)
  --------------------------------------------- */
  if (!model) {
    return (
      <div className="p-8 text-sm text-[#456882]">
        Loading model…
      </div>
    );
  }

  if (!definition) {
    return (
      <div className="p-8 text-sm text-red-600">
        Unknown model type: <strong>{model.type}</strong>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10">
      {/* HEADER */}
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-[#1B3C53]">
          {definition.name}
        </h1>
        <p className="text-sm text-[#456882]">
          Model instance: {model.name}
        </p>
      </header>

      {/* SECTIONS */}
      {definition.sections.map((section) => (
        <section
          key={section.id}
          id={`section-${section.id}`}
          className="space-y-4"
        >
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#1B3C53]">
              {section.label}
            </h2>

            {section.description && (
              <p className="text-sm text-[#456882]">
                {section.description}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-[#E3E3E3] bg-white p-6 space-y-4">
            {section.inputKeys.length === 0 && (
              <div className="text-sm text-[#456882]">
                No inputs in this section.
              </div>
            )}

            {section.inputKeys.map((key) => {
              const def = definition.inputs.find(
                (i) => i.key === key
              );
              if (!def) return null;

              return (
                <InputRenderer
                  key={def.key}
                  definition={def}
                  value={inputs[def.key]}
                  onChange={(v) => setInput(def.key, v)}
                />
              );
            })}
          </div>
        </section>
      ))}

      {/* OUTPUTS */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#1B3C53]">
          Outputs
        </h2>

        <div className="rounded-xl border border-[#E3E3E3] bg-white p-6 space-y-3">
          {definition.outputs.map((output) => {
            const value = outputs[output.key];

            return (
              <div
                key={output.key}
                className="flex justify-between text-sm"
              >
                <div className="text-[#1B3C53]">
                  {output.label}
                </div>
                <div className="text-[#456882]">
                  {value === undefined
                    ? "—"
                    : formatOutput(value, output.unit)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
