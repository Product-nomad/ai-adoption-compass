import { createFileRoute } from "@tanstack/react-router";
import { PhaseOverviewGrid } from "../components/PhaseOverviewGrid";
import { ExportButtons } from "../components/ExportButtons";
import { useAssessmentStore } from "../store/assessment";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The AI Adoption Roadmap — CPMAI Assessment" },
      { name: "description", content: "Interactive AI project assessment tool built on the PMI CPMAI framework." },
      { property: "og:title", content: "The AI Adoption Roadmap" },
      { property: "og:description", content: "Assess your AI projects against the PMI CPMAI framework." },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const { getOverallProgress } = useAssessmentStore();
  const overall = getOverallProgress();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif mb-2">The AI Adoption Roadmap</h1>
        <p className="text-muted-foreground text-sm max-w-xl">
          Assess your AI project against the PMI Certified Practitioner in Machine Intelligence (CPMAI) framework. 
          Toggle gate criteria, track progress, and export your assessment.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
            All Phases
          </span>
          <div className="flex items-center gap-2">
            <div className="w-48 h-2 bg-secondary overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${overall}%`,
                  backgroundColor: overall === 100 ? "var(--gate-green)" : "var(--phase-1-accent)",
                }}
              />
            </div>
            <span className="font-mono text-sm">{overall}%</span>
          </div>
        </div>
        <ExportButtons />
      </div>

      <PhaseOverviewGrid />
    </div>
  );
}
