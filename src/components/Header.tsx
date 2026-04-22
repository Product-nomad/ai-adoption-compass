import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useAssessmentStore } from "../store/assessment";
import { phases } from "../data/phases";

export function Header() {
  const { projectName, setProjectName, getOverallProgress, getPhaseProgress } = useAssessmentStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(projectName);
  const overall = getOverallProgress();
  const location = useLocation();

  const handleSave = () => {
    setProjectName(editValue || "My AI Project");
    setIsEditing(false);
  };

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-mono text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
              CPMAI
            </Link>
            <span className="opacity-30">·</span>
            {isEditing ? (
              <input
                autoFocus
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                className="bg-transparent border-b border-primary-foreground/40 text-primary-foreground text-lg font-serif outline-none px-0 py-0"
              />
            ) : (
              <button
                onClick={() => { setEditValue(projectName); setIsEditing(true); }}
                className="text-lg font-serif hover:opacity-80 transition-opacity cursor-text"
                title="Click to edit project name"
              >
                {projectName}
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs opacity-60">{overall}%</span>
            <div className="w-32 h-1.5 bg-primary-foreground/20 overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${overall}%`,
                  backgroundColor: overall === 100 ? "var(--gate-green)" : "var(--phase-1-accent)",
                }}
              />
            </div>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto -mx-1 px-1 pb-1">
          {phases.map((phase) => {
            const progress = getPhaseProgress(phase.id);
            const isActive = location.pathname === `/stages/${phase.slug}`;
            return (
              <Link
                key={phase.id}
                to="/stages/$phaseSlug"
                params={{ phaseSlug: phase.slug }}
                className="flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors whitespace-nowrap"
                style={{
                  backgroundColor: isActive ? phase.accentVar : "transparent",
                  color: isActive ? "#fff" : "var(--primary-foreground)",
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                <span>{phase.id}. {phase.name}</span>
                <span
                  className="text-[9px] px-1.5 py-0.5"
                  style={{
                    backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                  }}
                >
                  {progress}%
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
