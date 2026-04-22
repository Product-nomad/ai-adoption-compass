import { useState } from "react";
import { useAssessmentStore } from "../store/assessment";
import { phases } from "../data/phases";

interface HeaderProps {
  activePhaseSlug: string;
  onPhaseChange: (slug: string) => void;
}

export function Header({ activePhaseSlug, onPhaseChange }: HeaderProps) {
  const { projectName, setProjectName, getOverallProgress, getPhaseProgress } = useAssessmentStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(projectName);
  const overall = getOverallProgress();

  const handleSave = () => {
    setProjectName(editValue || "My AI Project");
    setIsEditing(false);
  };

  return (
    <header>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-[960px] mx-auto px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-2">
                AI Adoption — Stage Gate Navigator
              </p>
              {isEditing ? (
                <input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  className="bg-transparent border-b border-primary-foreground/30 text-primary-foreground text-2xl font-serif outline-none px-0 py-0 w-full max-w-md"
                  placeholder="Enter project name..."
                />
              ) : (
                <button
                  onClick={() => { setEditValue(projectName); setIsEditing(true); }}
                  className="text-2xl font-serif hover:opacity-80 transition-opacity cursor-text text-left"
                  title="Click to edit project name"
                >
                  {projectName}
                </button>
              )}
            </div>
            <div className="text-right pt-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-2">
                Overall Progress
              </p>
              <div className="flex items-center gap-3">
                <div className="w-28 h-1 bg-primary-foreground/15 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    suppressHydrationWarning
                    style={{
                      width: `${overall}%`,
                      backgroundColor: overall === 100 ? "var(--gate-green)" : "var(--phase-1-accent)",
                    }}
                  />
                </div>
                <span className="font-mono text-lg font-bold" suppressHydrationWarning>{overall}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase tabs */}
      <div className="bg-card border-b border-border overflow-x-auto">
        <div className="max-w-[960px] mx-auto px-6 min-w-fit">
          <nav className="flex gap-0 overflow-x-auto scrollbar-hide">
            {phases.map((phase) => {
              const isActive = phase.slug === activePhaseSlug;
              return (
                <button
                  key={phase.id}
                  onClick={() => onPhaseChange(phase.slug)}
                  className="relative flex items-center gap-2 px-4 py-3 font-mono text-[11px] uppercase tracking-wide transition-colors whitespace-nowrap"
                  style={{
                    color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: isActive ? phase.accentVar : "var(--border)",
                    }}
                  />
                  <span>{phase.id}. {phase.name}</span>
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[3px]"
                      style={{ backgroundColor: phase.accentVar }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
