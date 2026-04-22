export type GateStatus = "not_started" | "in_progress" | "complete";

export interface Gate {
  id: string;
  label: string;
  advice: string;
}

export interface Phase {
  id: number;
  name: string;
  slug: string;
  colorVar: string;
  accentVar: string;
  gates: Gate[];
}

export const phases: Phase[] = [
  {
    id: 1,
    name: "AI Strategy",
    slug: "ai-strategy",
    colorVar: "var(--phase-1)",
    accentVar: "var(--phase-1-accent)",
    gates: [
      { id: "1-1", label: "Problem statement approved by sponsor", advice: "A well-formed problem statement names the specific pain, quantifies its cost, and identifies who owns the decision to fix it. If your sponsor can't restate it in their own words, it needs more work." },
      { id: "1-2", label: "Value proposition validated with at least one business stakeholder", advice: "Validation means someone who will be affected by the outcome has reviewed the proposed value and agreed it is worth pursuing. A nod in a meeting is not validation — written confirmation or a recorded session is." },
      { id: "1-3", label: "Success metrics defined and measurable", advice: "Each metric needs a baseline, a target, and a timeframe. If you cannot measure the baseline today, the metric is not ready." },
      { id: "1-4", label: "Regulatory and responsible AI considerations documented", advice: "At minimum: GDPR data handling, any sector-specific obligations, and a responsible AI self-assessment. For regulated industries this is a hard gate — do not proceed without legal or compliance sign-off." },
      { id: "1-5", label: "Feasibility assessment completed with no unresolved blockers", advice: "Feasibility covers three dimensions: data (does it exist?), technical (can your team build it?), and organisational (is the business ready to adopt it?). Unresolved blockers in any dimension should stop the gate." },
      { id: "1-6", label: "Go / No-Go decision recorded", advice: "The decision and its rationale must be documented — not just communicated verbally. This protects the programme and provides an audit trail if the project is later challenged." },
    ],
  },
  {
    id: 2,
    name: "Data",
    slug: "data",
    colorVar: "var(--phase-2)",
    accentVar: "var(--phase-2-accent)",
    gates: [
      { id: "2-1", label: "Data inventory complete and reviewed by data owner", advice: "Every data source should have a named owner, a documented access route, and a freshness assessment. Data that is not inventoried will surprise you mid-project." },
      { id: "2-2", label: "Data quality issues logged and triaged", advice: "Quality issues do not need to be resolved to pass this gate — they need to be known and triaged. An accepted risk with a documented mitigation is better than a hidden problem." },
      { id: "2-3", label: "GDPR and privacy obligations confirmed as met", advice: "If your data contains personal information, legal basis for processing must be established before you use it for training. Retroactive compliance is expensive. This gate should not be waived." },
      { id: "2-4", label: "Data pipeline design reviewed and approved by engineering", advice: "The pipeline design should cover ingestion, transformation, storage, and deletion. Engineering sign-off confirms it is buildable within your constraints — not just theoretically sound." },
      { id: "2-5", label: "Training, validation, and test datasets confirmed as sufficient", advice: "Sufficient means the datasets represent the real-world distribution the model will encounter in production. A test set drawn from the same distribution as training is not a test set." },
    ],
  },
  {
    id: 3,
    name: "Model Development",
    slug: "model-development",
    colorVar: "var(--phase-3)",
    accentVar: "var(--phase-3-accent)",
    gates: [
      { id: "3-1", label: "Model performance meets defined evaluation thresholds", advice: "Thresholds should have been set in Phase 1 tied to business success metrics. If you are setting thresholds now to match what the model achieved, you are working backwards." },
      { id: "3-2", label: "Bias and fairness assessment completed", advice: "Test across the demographic groups relevant to your use case. For regulated industries, document the methodology and findings even if no issues are found." },
      { id: "3-3", label: "Explainability requirements confirmed as met", advice: "For high-stakes decisions — credit, medical, legal — explainability is a regulatory requirement. Black-box models that cannot explain individual outputs may be legally unusable regardless of accuracy." },
      { id: "3-4", label: "Business stakeholder has reviewed and accepted model outputs", advice: "Show real outputs on real data to someone who will use or be affected by the model. Synthetic demos on cherry-picked examples are not stakeholder acceptance." },
      { id: "3-5", label: "Model versioned and registered", advice: "Version control for models is as important as version control for code. The ability to roll back to a previous model version is your primary safety net in production." },
    ],
  },
  {
    id: 4,
    name: "Solution Development",
    slug: "solution-development",
    colorVar: "var(--phase-4)",
    accentVar: "var(--phase-4-accent)",
    gates: [
      { id: "4-1", label: "All functional requirements tested and passed", advice: "Each requirement should have a corresponding test case with a documented pass/fail result. Tested without documented results is not a gate pass." },
      { id: "4-2", label: "Performance benchmarks met under expected load", advice: "Test at 1.5x expected peak load, not average load. AI inference costs scale with request volume — a system that performs well at average load may degrade significantly at peak." },
      { id: "4-3", label: "Security review completed with no unresolved critical issues", advice: "AI systems introduce new attack surfaces: prompt injection, model extraction, data poisoning. Ensure your reviewer has AI-specific competency — standard application security may not cover these." },
      { id: "4-4", label: "UAT signed off by representative end users", advice: "Representative means people who will actually use the system in their real workflow — not a senior manager who will never open the interface. UAT should include edge cases, not just happy-path scenarios." },
      { id: "4-5", label: "Deployment and rollback plan documented and tested", advice: "The rollback plan must be tested before go-live, not written and filed. If you have never executed the rollback, you do not know if it works." },
    ],
  },
  {
    id: 5,
    name: "Solution Deployment",
    slug: "solution-deployment",
    colorVar: "var(--phase-5)",
    accentVar: "var(--phase-5-accent)",
    gates: [
      { id: "5-1", label: "Solution deployed without critical incidents", advice: "Critical is defined relative to your context, but any incident that interrupts the primary use case or exposes data counts. Minor issues with mitigations in place do not block this gate." },
      { id: "5-2", label: "End users trained and able to use the solution", advice: "Able to use means demonstrated, not just attended. A short competency check is significantly more reliable than training completion records alone." },
      { id: "5-3", label: "Adoption metrics tracked and reported", advice: "Adoption is the leading indicator of value realisation. If users are not using the system, the Phase 1 outcomes will not be achieved regardless of how good the model is." },
      { id: "5-4", label: "Support process operational", advice: "The support process should be tested before go-live by simulating a real incident. Discovering the escalation path is broken during a live incident is avoidable." },
      { id: "5-5", label: "Sponsor go-live sign-off recorded", advice: "Written sign-off from the sponsor transfers accountability from the delivery team to the business. Without it, the delivery team remains implicitly responsible for production issues indefinitely." },
    ],
  },
  {
    id: 6,
    name: "Monitor & Optimise",
    slug: "monitor-optimise",
    colorVar: "var(--phase-6)",
    accentVar: "var(--phase-6-accent)",
    gates: [
      { id: "6-1", label: "KPIs reviewed and reported on agreed cadence", advice: "If KPIs are only reviewed when someone asks, problems will be found late. Automate reporting where possible — a dashboard nobody looks at is functionally equivalent to no monitoring." },
      { id: "6-2", label: "Model drift detection operational", advice: "Drift detection should alert on both data drift and concept drift. The latter is harder to detect but more consequential." },
      { id: "6-3", label: "User feedback process active", advice: "Passive feedback captures dissatisfaction. Active structured feedback surfaces improvement opportunities. Both are needed." },
      { id: "6-4", label: "Retraining trigger criteria defined and monitored", advice: "Retraining should be triggered by measurable degradation, not by calendar. Define the specific metric threshold that triggers a retraining cycle and automate the alert." },
      { id: "6-5", label: "Responsible AI compliance reviewed at each major change", advice: "A model that was fair at launch may become unfair as the user population or data distribution shifts. Responsible AI is a continuous practice, not a one-time assessment." },
    ],
  },
];
