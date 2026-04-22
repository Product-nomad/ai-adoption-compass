import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { phases } from "../data/phases";
import { GateCard } from "../components/GateCard";
import { PhaseHeroCard } from "../components/PhaseHeroCard";
import { PhaseProgressBar } from "../components/PhaseProgressBar";
import { PhaseOverviewGrid } from "../components/PhaseOverviewGrid";
import { ExportButtons } from "../components/ExportButtons";
import { useAssessmentStore } from "../store/assessment";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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
  const [activeSlug, setActiveSlug] = useState("ai-strategy");
  const { gateStates } = useAssessmentStore();

  const phase = phases.find((p) => p.slug === activeSlug)!;
  const allComplete = phase.gates.every((g) => gateStates[g.id] === "complete");
  const nextPhase = phases.find((p) => p.id === phase.id + 1);
  const complete = phase.gates.filter((g) => gateStates[g.id] === "complete").length;

  return (
    <>
      <Header activePhaseSlug={activeSlug} onPhaseChange={setActiveSlug} />
      <main className="max-w-[960px] mx-auto px-6 py-8">
        <PhaseHeroCard phase={phase} />

        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Gate Criteria · {complete} of {phase.gates.length} complete
          </p>
          <ExportButtons />
        </div>

        <div className="space-y-2">
          {phase.gates.map((gate) => (
            <GateCard key={gate.id} gate={gate} accentColor={phase.accentVar} />
          ))}
        </div>

        {allComplete && (
          <div
            className="mt-4 p-4 flex items-center justify-between"
            style={{ backgroundColor: "var(--gate-green)", color: "#fff" }}
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-wide font-bold">
                Phase {phase.id} Complete
              </p>
              <p className="text-sm mt-0.5 opacity-90">All gate criteria have been met.</p>
            </div>
            {nextPhase && (
              <button
                onClick={() => { setActiveSlug(nextPhase.slug); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="font-mono text-xs uppercase tracking-wide border border-white/40 px-4 py-2 hover:bg-white/20 transition-colors"
              >
                Proceed to Phase {nextPhase.id} →
              </button>
            )}
          </div>
        )}

        <PhaseProgressBar phase={phase} />
        <PhaseOverviewGrid activePhaseSlug={activeSlug} onPhaseChange={setActiveSlug} />
      </main>
      <Footer />
    </>
  );
}
