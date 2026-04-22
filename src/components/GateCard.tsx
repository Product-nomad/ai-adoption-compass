import { useState } from "react";
import type { Gate, GateStatus } from "../data/phases";
import { useAssessmentStore } from "../store/assessment";

const statusConfig: Record<GateStatus, { icon: string; label: string; colorClass: string }> = {
  not_started: { icon: "✗", label: "Not started", colorClass: "bg-gate-red" },
  in_progress: { icon: "~", label: "In progress", colorClass: "bg-gate-amber" },
  complete: { icon: "✓", label: "Complete", colorClass: "bg-gate-green" },
};

const statusOrder: GateStatus[] = ["not_started", "in_progress", "complete"];

interface GateCardProps {
  gate: Gate;
  accentColor: string;
}

export function GateCard({ gate, accentColor }: GateCardProps) {
  const { gateStates, setGateStatus, expandedAdvice, toggleAdvice } = useAssessmentStore();
  const currentStatus = gateStates[gate.id] || "not_started";
  const isExpanded = expandedAdvice[gate.id] || false;
  const config = statusConfig[currentStatus];

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-3 p-4">
        <div className="flex gap-1">
          {statusOrder.map((status) => {
            const sc = statusConfig[status];
            const isActive = status === currentStatus;
            return (
              <button
                key={status}
                onClick={() => setGateStatus(gate.id, status)}
                className="w-8 h-8 flex items-center justify-center font-mono text-sm border border-border transition-colors"
                style={{
                  backgroundColor: isActive ? (status === "not_started" ? "var(--gate-red)" : status === "in_progress" ? "var(--gate-amber)" : "var(--gate-green)") : "transparent",
                  color: isActive ? "#fff" : "var(--muted-foreground)",
                }}
                title={sc.label}
              >
                {sc.icon}
              </button>
            );
          })}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm leading-snug">{gate.label}</p>
        </div>

        <span
          className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 shrink-0"
          style={{
            backgroundColor: currentStatus === "not_started" ? "var(--gate-red)" : currentStatus === "in_progress" ? "var(--gate-amber)" : "var(--gate-green)",
            color: "#fff",
          }}
        >
          {config.label}
        </span>

        <button
          onClick={() => toggleAdvice(gate.id)}
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors shrink-0 px-2 py-1 border border-border"
        >
          {isExpanded ? "▲ hide" : "▼ advice"}
        </button>
      </div>

      {isExpanded && (
        <div
          className="px-4 pb-4 pt-0 border-t border-border"
          style={{ borderTopColor: accentColor }}
        >
          <div className="pt-3 pl-4 border-l-2" style={{ borderLeftColor: accentColor }}>
            <p className="text-sm text-muted-foreground leading-relaxed">{gate.advice}</p>
          </div>
        </div>
      )}
    </div>
  );
}
