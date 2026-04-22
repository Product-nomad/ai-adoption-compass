import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GateStatus } from "../data/phases";
import { phases } from "../data/phases";

interface AssessmentState {
  projectName: string;
  gateStates: Record<string, GateStatus>;
  gateNotes: Record<string, string>;
  expandedAdvice: Record<string, boolean>;
  setProjectName: (name: string) => void;
  setGateStatus: (gateId: string, status: GateStatus) => void;
  setGateNote: (gateId: string, note: string) => void;
  toggleAdvice: (gateId: string) => void;
  getPhaseProgress: (phaseId: number) => number;
  getOverallProgress: () => number;
  importState: (data: { projectName: string; gateStates: Record<string, GateStatus>; gateNotes?: Record<string, string> }) => void;
  exportState: () => { projectName: string; gateStates: Record<string, GateStatus>; gateNotes: Record<string, string> };
}

const initialGateStates: Record<string, GateStatus> = {};
phases.forEach((phase) => {
  phase.gates.forEach((gate) => {
    initialGateStates[gate.id] = "not_started";
  });
});

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      projectName: "My AI Project",
      gateStates: { ...initialGateStates },
      gateNotes: {},
      expandedAdvice: {},
      setProjectName: (name) => set({ projectName: name }),
      setGateStatus: (gateId, status) =>
        set((state) => ({
          gateStates: { ...state.gateStates, [gateId]: status },
        })),
      setGateNote: (gateId, note) =>
        set((state) => ({
          gateNotes: { ...state.gateNotes, [gateId]: note },
        })),
      toggleAdvice: (gateId) =>
        set((state) => ({
          expandedAdvice: {
            ...state.expandedAdvice,
            [gateId]: !state.expandedAdvice[gateId],
          },
        })),
      getPhaseProgress: (phaseId) => {
        const phase = phases.find((p) => p.id === phaseId);
        if (!phase) return 0;
        const states = get().gateStates;
        const complete = phase.gates.filter((g) => states[g.id] === "complete").length;
        return Math.round((complete / phase.gates.length) * 100);
      },
      getOverallProgress: () => {
        const states = get().gateStates;
        const allGates = phases.flatMap((p) => p.gates);
        const complete = allGates.filter((g) => states[g.id] === "complete").length;
        return Math.round((complete / allGates.length) * 100);
      },
      importState: (data) =>
        set({
          projectName: data.projectName,
          gateStates: { ...initialGateStates, ...data.gateStates },
          gateNotes: data.gateNotes || {},
        }),
      exportState: () => ({
        projectName: get().projectName,
        gateStates: get().gateStates,
        gateNotes: get().gateNotes,
      }),
    }),
    { name: "ai-adoption-assessment" }
  )
);
