import type { Phase } from "../data/phases";
import { useAssessmentStore } from "../store/assessment";

interface PhaseProgressBarProps {
  phase: Phase;
}

export function PhaseProgressBar({ phase }: PhaseProgressBarProps) {
  const { gateStates } = useAssessmentStore();

  const notStarted = phase.gates.filter((g) => gateStates[g.id] === "not_started").length;
  const inProgress = phase.gates.filter((g) => gateStates[g.id] === "in_progress").length;
  const complete = phase.gates.filter((g) => gateStates[g.id] === "complete").length;
  const total = phase.gates.length;

  return (
    <div className="mt-8 p-4 border border-border bg-card">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Phase Progress
        </span>
        <div className="flex items-center gap-4 font-mono text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--gate-red)" }} />
            {notStarted} Not started
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--gate-amber)" }} />
            {inProgress} In progress
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--gate-green)" }} />
            {complete} Complete
          </span>
        </div>
      </div>
      <div className="flex gap-1">
        {phase.gates.map((gate) => {
          const status = gateStates[gate.id] || "not_started";
          const color = status === "complete" ? "var(--gate-green)" : status === "in_progress" ? "var(--gate-amber)" : "var(--border)";
          return (
            <div
              key={gate.id}
              className="flex-1 h-2 transition-colors duration-300"
              style={{ backgroundColor: color }}
            />
          );
        })}
      </div>
    </div>
  );
}
