import { Link } from "@tanstack/react-router";
import { useAssessmentStore } from "../store/assessment";
import { phases } from "../data/phases";

export function PhaseOverviewGrid() {
  const { getPhaseProgress, gateStates } = useAssessmentStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {phases.map((phase) => {
        const progress = getPhaseProgress(phase.id);
        const complete = phase.gates.filter((g) => gateStates[g.id] === "complete").length;
        const inProgress = phase.gates.filter((g) => gateStates[g.id] === "in_progress").length;
        const total = phase.gates.length;

        return (
          <Link
            key={phase.id}
            to="/stages/$phaseSlug"
            params={{ phaseSlug: phase.slug }}
            className="border border-border bg-card p-4 hover:border-foreground/30 transition-colors block"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Phase {phase.id}
                </span>
                <h3 className="text-base font-serif mt-0.5">{phase.name}</h3>
              </div>
              <span
                className="font-mono text-sm font-bold"
                style={{ color: phase.accentVar }}
              >
                {progress}%
              </span>
            </div>

            <div className="w-full h-1.5 bg-secondary mb-2 overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  backgroundColor: phase.accentVar,
                }}
              />
            </div>

            <div className="flex gap-3 font-mono text-[10px] text-muted-foreground">
              <span style={{ color: "var(--gate-green)" }}>✓ {complete}</span>
              <span style={{ color: "var(--gate-amber)" }}>~ {inProgress}</span>
              <span style={{ color: "var(--gate-red)" }}>✗ {total - complete - inProgress}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
