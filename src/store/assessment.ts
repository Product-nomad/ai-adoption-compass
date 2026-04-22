import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GateStatus } from "../data/phases";
import { phases } from "../data/phases";

interface AssessmentState {
  projectName: string;
  gateStates: Record<string, GateStatus>;
  expandedAdvice: Record<string, boolean>;
  setProjectName: (name: string) => void;
  setGateStatus: (gateId: string, status: GateStatus) => void;
  toggleAdvice: (gateId: string) => void;
  getPhaseProgress: (phaseId: number) => number;
  getOverallProgress: () => number;
  importState: (data: { projectName: string; gateStates: Record<string, GateStatus> }) => void;
  exportState: () => { projectName: string; gateStates: Record<string, GateStatus> };
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
      expandedAdvice: {},
      setProjectName: (name) => set({ projectName: name }),
      setGateStatus: (gateId, status) =>
        set((state) => ({
          gateStates: { ...state.gateStates, [gateId]: status },
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
        }),
      exportState: () => ({
        projectName: get().projectName,
        gateStates: get().gateStates,
      }),
    }),
    { name: "ai-adoption-assessment" }
  )
);
