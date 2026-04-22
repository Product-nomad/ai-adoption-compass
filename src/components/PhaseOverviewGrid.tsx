import { useAssessmentStore } from "../store/assessment";
import { phases } from "../data/phases";

interface PhaseOverviewGridProps {
  activePhaseSlug: string;
  onPhaseChange: (slug: string) => void;
}

export function PhaseOverviewGrid({ activePhaseSlug, onPhaseChange }: PhaseOverviewGridProps) {
  const { getPhaseProgress, gateStates } = useAssessmentStore();

  return (
    <div className="mt-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
        All Phases Overview
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {phases.map((phase) => {
          const progress = getPhaseProgress(phase.id);
          const complete = phase.gates.filter((g) => gateStates[g.id] === "complete").length;
          const total = phase.gates.length;
          const isActive = phase.slug === activePhaseSlug;

          return (
            <button
              key={phase.id}
              onClick={() => {
                onPhaseChange(phase.slug);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="border bg-card p-4 text-left transition-colors hover:border-foreground/20"
              style={{
                borderColor: isActive ? phase.accentVar : "var(--border)",
                borderTopWidth: "3px",
                borderTopColor: phase.accentVar,
              }}
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-mono text-xs font-semibold">
                  {phase.id}. {phase.name}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{progress}%</span>
              </div>
              <p className="font-mono text-[10px] text-muted-foreground">
                {complete} of {total} gates complete
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
