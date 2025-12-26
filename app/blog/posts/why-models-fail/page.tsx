export default function BlogPost() {
  return (
    <article className="space-y-4">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">
          Why Financial Models Fail
        </h1>

        <p className="text-sm text-[#456882]">
          January 12, 2025 · Synario
        </p>
      </header>

      <p>
        At Synario, we’ve built hundreds of financial models for small businesses,
        founders, and operators trying to answer real questions: how much to spend,
        when to hire, whether growth is sustainable, and what actually drives
        returns.
      </p>

      <p>
        Across industries and business models, we kept running into the same
        pattern. The spreadsheets were polished. The formulas were correct. And yet,
        the decisions made from them consistently underestimated risk and
        overestimated confidence.
      </p>

      <p>
        Over time, it became clear that most financial models don’t fail because of
        bad math. They fail because of structural blind spots that repeat
        themselves, no matter how sophisticated the model looks.
      </p>

      <h2 className="text-2xl font-semibold pt-4">
        These are the five reasons financial models fail
      </h2>

      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <a href="#inputs" className="text-[#1B3C53] hover:underline">
            Unquestioned inputs
          </a>
        </li>
      </ol>

      <p className="pt-4">
        We’ll start with the most common failure—and the one that quietly undermines
        every other part of the model.
      </p>

<section id="inputs" className="space-y-6 scroll-mt-[72px]">
  <h2 className="text-2xl font-semibold">
    1. Unquestioned Inputs
  </h2>

  <p>
    The fastest way to break a financial model is to treat inputs as facts
    instead of assumptions. Not because the numbers are wrong—but because no
    one stops to ask what those numbers actually represent.
  </p>

  <p>
    Customer Acquisition Cost (CAC) is a perfect example.
  </p>

  <p>
    We’ve seen dozens of SaaS models where CAC is entered as a single, clean
    number: <em>$120 per customer</em>. It looks precise. It feels grounded.
    It often comes straight from a dashboard.
  </p>

  <p>
    The problem is that “CAC” is rarely one thing.
  </p>

  <h3 className="text-xl font-semibold pt-2">
    The SaaS CAC trap
  </h3>

  <p>
    Imagine a SaaS company evaluating whether it can scale paid acquisition.
    The model uses:
  </p>

  <ul className="list-disc pl-6 space-y-1">
    <li>CAC: $120</li>
    <li>Monthly ARPU: $40</li>
    <li>Gross margin: 80%</li>
    <li>Churn: 3% per month</li>
  </ul>

  <p>
    On paper, the math works. LTV clears CAC comfortably. Payback looks fast.
    The model says: <strong>spend more.</strong>
  </p>

  <p>
    But when we dig in, that $120 CAC turns out to be:
  </p>

  <ul className="list-disc pl-6 space-y-1">
    <li>Only paid media spend</li>
    <li>Blended across new and returning users</li>
    <li>Excluding onboarding and sales support</li>
    <li>Calculated during a period of heavy retargeting</li>
  </ul>

  <p>
    In other words, it’s not “customer acquisition cost.” It’s a partial,
    situational proxy that happened to look good at a moment in time.
  </p>

  <p>
    Once the company tries to scale:
  </p>

  <ul className="list-disc pl-6 space-y-1">
    <li>Prospecting replaces retargeting</li>
    <li>CPMs rise</li>
    <li>Conversion rates fall</li>
    <li>Support and onboarding costs increase</li>
  </ul>

  <p>
    The CAC in reality isn’t $120 anymore. It’s $180. Or $220. And the model
    never noticed, because it treated CAC as a constant instead of a system.
  </p>

  <h3 className="text-xl font-semibold pt-2">
    This isn’t just a SaaS problem
  </h3>

  <p>
    The same mistake shows up in almost every type of financial model:
  </p>

  <ul className="list-disc pl-6 space-y-1">
    <li>
      <strong>E-commerce:</strong> Contribution margin assumes shipping and
      returns don’t change with volume.
    </li>
    <li>
      <strong>Services:</strong> Utilization assumes team productivity is flat
      regardless of workload.
    </li>
    <li>
      <strong>Retail:</strong> Inventory turns assume demand is smooth, not
      seasonal.
    </li>
    <li>
      <strong>Marketplaces:</strong> Take rate assumes supply and demand scale
      evenly.
    </li>
  </ul>

  <p>
    In every case, the model doesn’t fail because the input is “wrong.” It fails
    because the input is <em>unexamined</em>.
  </p>

  <p>
    A good model doesn’t ask, “What is CAC?”  
    It asks, “Under what conditions does this CAC exist—and when does it
    change?”
  </p>

  <p>
    That’s where most models quietly fall apart.
  </p>
</section>


    </article>


  );
}
