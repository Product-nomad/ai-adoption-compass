import type { Phase } from "../data/phases";
import { useAssessmentStore } from "../store/assessment";

interface PhaseHeroCardProps {
  phase: Phase;
}

const phaseDescriptions: Record<number, string> = {
  1: "Define the business problem, value proposition, and measurable success criteria before any technical work begins.",
  2: "Inventory, assess, and prepare the data assets required for model training and validation.",
  3: "Build, evaluate, and validate the model against defined thresholds and responsible AI standards.",
  4: "Integrate the model into a production-ready solution with full testing and security review.",
  5: "Deploy to production, train end users, and establish support and adoption tracking.",
  6: "Continuously monitor performance, detect drift, and maintain responsible AI compliance.",
};

export function PhaseHeroCard({ phase }: PhaseHeroCardProps) {
  const { getPhaseProgress } = useAssessmentStore();
  const progress = getPhaseProgress(phase.id);

  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="p-6 mb-8"
      style={{ backgroundColor: "var(--secondary)" }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-6">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.15em] mb-1"
            style={{ color: phase.accentVar }}
          >
            Phase {phase.id} of 6
          </p>
          <h2 className="text-2xl font-serif mb-2">{phase.name}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            {phaseDescriptions[phase.id]}
          </p>
        </div>
        <div className="shrink-0">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40" cy="40" r="36"
                fill="none"
                stroke="var(--border)"
                strokeWidth="3"
              />
              <circle
                cx="40" cy="40" r="36"
                fill="none"
                stroke={phase.accentVar}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-lg font-bold">{progress}%</span>
              <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">Done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
