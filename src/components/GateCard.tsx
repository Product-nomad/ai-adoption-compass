import { useState } from "react";
import type { Gate, GateStatus } from "../data/phases";
import { useAssessmentStore } from "../store/assessment";

const statusConfig: Record<GateStatus, { icon: string; label: string }> = {
  not_started: { icon: "✗", label: "Not started" },
  in_progress: { icon: "~", label: "In progress" },
  complete: { icon: "✓", label: "Complete" },
};

const statusOrder: GateStatus[] = ["not_started", "in_progress", "complete"];

interface GateCardProps {
  gate: Gate;
  accentColor: string;
}

export function GateCard({ gate, accentColor }: GateCardProps) {
  const { gateStates, setGateStatus, gateNotes, setGateNote, expandedAdvice, toggleAdvice } = useAssessmentStore();
  const currentStatus = gateStates[gate.id] || "not_started";
  const isExpanded = expandedAdvice[gate.id] || false;
  const config = statusConfig[currentStatus];
  const note = gateNotes[gate.id] || "";

  const getButtonStyle = (status: GateStatus, isActive: boolean) => {
    if (!isActive) {
      return {
        backgroundColor: "transparent",
        color: "var(--muted-foreground)",
        border: "1px solid var(--border)",
      };
    }
    const colors: Record<GateStatus, string> = {
      not_started: "var(--gate-red)",
      in_progress: "var(--gate-amber)",
      complete: "var(--gate-green)",
    };
    return {
      backgroundColor: colors[status],
      color: "#fff",
      border: `1px solid ${colors[status]}`,
    };
  };

  const statusColor = currentStatus === "not_started" ? "var(--gate-red)" : currentStatus === "in_progress" ? "var(--gate-amber)" : "var(--gate-green)";

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-4 px-4 py-3">
        <div className="flex gap-1.5">
          {statusOrder.map((status) => {
            const sc = statusConfig[status];
            const isActive = status === currentStatus;
            return (
              <button
                key={status}
                onClick={() => setGateStatus(gate.id, status)}
                className="w-8 h-8 flex items-center justify-center rounded-full font-mono text-xs transition-colors"
                style={getButtonStyle(status, isActive)}
                title={sc.label}
              >
                {sc.icon}
              </button>
            );
          })}
        </div>

        <p className="flex-1 text-sm min-w-0">{gate.label}</p>

        <span
          className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0"
          style={{
            backgroundColor: `color-mix(in srgb, ${statusColor} 12%, transparent)`,
            color: statusColor,
          }}
        >
          {config.label}
        </span>

        <button
          onClick={() => toggleAdvice(gate.id)}
          className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors shrink-0 px-2.5 py-1 border border-border rounded-sm"
        >
          {isExpanded ? "▲ hide" : "▼ advice"}
        </button>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="pt-3 pl-4 border-l-2" style={{ borderLeftColor: accentColor }}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{gate.advice}</p>
          </div>
        </div>
      )}

      {/* Notes input */}
      <div className="px-4 pb-3">
        <textarea
          value={note}
          onChange={(e) => setGateNote(gate.id, e.target.value)}
          placeholder="Add your evidence, notes, or comments for this criterion…"
          className="w-full text-sm bg-muted/50 border border-border rounded-sm px-3 py-2 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/30 resize-y min-h-[60px]"
          rows={2}
        />
      </div>
    </div>
  );
}
