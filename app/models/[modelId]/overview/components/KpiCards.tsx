"use client";

function fmt(n: number) {
  return n.toLocaleString();
}

export default function KpiCards({ model }: { model: any }) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#456882] mb-4">
        Outputs
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Kpi label="Monthly Revenue" value={`$${fmt(model.monthlyRevenue)}`} />
        <Kpi label="Gross Profit / Mo" value={`$${fmt(model.grossProfit)}`} />
        <Kpi label="Active Customers" value={fmt(model.activeCustomers)} />
        <Kpi
          label="LTV"
          value={model.ltv === Infinity ? "∞" : `$${fmt(model.ltv)}`}
        />
        <Kpi label="Payback" value={`${model.paybackMonths.toFixed(1)} mo`} />
        <Kpi label="LTV : CAC" value={`${model.ltvToCac.toFixed(1)}×`} />
      </div>
    </section>
  );
}

function Kpi({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="text-xs uppercase tracking-wide text-[#456882] mb-1">
        {label}
      </div>
      <div className="text-xl font-semibold text-[#1B3C53]">
        {value}
      </div>
    </div>
  );
}
