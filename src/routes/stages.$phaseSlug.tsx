import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { phases } from "../data/phases";
import { GateCard } from "../components/GateCard";
import { useAssessmentStore } from "../store/assessment";

export const Route = createFileRoute("/stages/$phaseSlug")({
  head: ({ params }) => {
    const phase = phases.find((p) => p.slug === params.phaseSlug);
    const title = phase ? `Phase ${phase.id}: ${phase.name} — AI Adoption Roadmap` : "Phase Not Found";
    return {
      meta: [
        { title },
        { name: "description", content: phase ? `CPMAI gate criteria for ${phase.name}` : "Phase not found" },
        { property: "og:title", content: title },
      ],
    };
  },
  component: PhasePage,
  notFoundComponent: () => (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-serif mb-2">Phase not found</h1>
      <Link to="/" className="font-mono text-xs text-accent underline">← Back to overview</Link>
    </div>
  ),
});

function PhasePage() {
  const { phaseSlug } = Route.useParams();
  const phase = phases.find((p) => p.slug === phaseSlug);
  const { getPhaseProgress, gateStates } = useAssessmentStore();

  if (!phase) {
    throw notFound();
  }

  const progress = getPhaseProgress(phase.id);
  const allComplete = phase.gates.every((g) => gateStates[g.id] === "complete");
  const nextPhase = phases.find((p) => p.id === phase.id + 1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
          ← All Phases
        </Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <span
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ color: phase.accentVar }}
          >
            Phase {phase.id}
          </span>
          <h1 className="text-2xl font-serif mt-1">{phase.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm" style={{ color: phase.accentVar }}>
            {progress}%
          </span>
          <div className="w-32 h-2 bg-secondary overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: phase.accentVar }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {phase.gates.map((gate) => (
          <GateCard key={gate.id} gate={gate} accentColor={phase.accentVar} />
        ))}
      </div>

      {/* Phase progress bar */}
      <div className="mb-6">
        <div className="w-full h-2 bg-secondary overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: phase.accentVar }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[10px] text-muted-foreground">
            {phase.gates.filter((g) => gateStates[g.id] === "complete").length} / {phase.gates.length} gates complete
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">{progress}%</span>
        </div>
      </div>

      {/* Gate complete banner */}
      {allComplete && (
        <div
          className="p-4 flex items-center justify-between"
          style={{ backgroundColor: "var(--gate-green)", color: "#fff" }}
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-wide font-bold">
              Phase {phase.id} Complete
            </p>
            <p className="text-sm mt-0.5 opacity-90">
              All gate criteria have been met.
            </p>
          </div>
          {nextPhase && (
            <Link
              to="/stages/$phaseSlug"
              params={{ phaseSlug: nextPhase.slug }}
              className="font-mono text-xs uppercase tracking-wide border border-white/40 px-4 py-2 hover:bg-white/20 transition-colors"
            >
              Proceed to Phase {nextPhase.id} →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
