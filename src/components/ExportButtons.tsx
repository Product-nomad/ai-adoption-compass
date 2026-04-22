import { useAssessmentStore } from "../store/assessment";
import { phases } from "../data/phases";
import type { GateStatus } from "../data/phases";

const statusLabels: Record<GateStatus, string> = {
  not_started: "✗ Not started",
  in_progress: "~ In progress",
  complete: "✓ Complete",
};

export function ExportButtons() {
  const store = useAssessmentStore();

  const handleExportJSON = () => {
    const data = store.exportState();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.projectName.replace(/\s+/g, "_")}_assessment.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const data = JSON.parse(text);
        if (data.projectName && data.gateStates) {
          store.importState(data);
        }
      } catch {
        alert("Invalid JSON file");
      }
    };
    input.click();
  };

  const handleCopyClipboard = async () => {
    const lines: string[] = [];
    lines.push(`AI Adoption Assessment: ${store.projectName}`);
    lines.push(`Overall Progress: ${store.getOverallProgress()}%`);
    lines.push("---");
    phases.forEach((phase) => {
      const progress = store.getPhaseProgress(phase.id);
      lines.push(`\nPhase ${phase.id} — ${phase.name}: ${progress}%`);
      phase.gates.forEach((gate) => {
        const status = store.gateStates[gate.id] || "not_started";
        const prefix = status === "not_started" ? "  ⚠ " : "  ";
        lines.push(`${prefix}${statusLabels[status]} — ${gate.label}`);
      });
    });
    lines.push("\n---");
    lines.push("Built on the PMI CPMAI framework");
    await navigator.clipboard.writeText(lines.join("\n"));
    alert("Summary copied to clipboard");
  };

  const handleExportPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ format: "a4", unit: "mm" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 20;

    const checkPage = (needed: number) => {
      if (y + needed > 270) {
        doc.addPage();
        y = 20;
      }
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(store.projectName, margin, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`AI Adoption Assessment — ${new Date().toLocaleDateString()}`, margin, y);
    y += 4;
    doc.text(`Overall Progress: ${store.getOverallProgress()}%`, margin, y);
    y += 10;

    phases.forEach((phase) => {
      checkPage(30);
      doc.setFillColor(240, 238, 232);
      doc.rect(margin, y - 4, contentWidth, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(`Phase ${phase.id}: ${phase.name} — ${store.getPhaseProgress(phase.id)}%`, margin + 2, y + 1);
      y += 12;

      phase.gates.forEach((gate) => {
        checkPage(14);
        const status = store.gateStates[gate.id] || "not_started";
        const icon = status === "complete" ? "✓" : status === "in_progress" ? "~" : "✗";
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const lines = doc.splitTextToSize(`${icon}  ${gate.label}`, contentWidth - 4);
        lines.forEach((line: string) => {
          checkPage(5);
          doc.text(line, margin + 2, y);
          y += 4.5;
        });

        if (store.expandedAdvice[gate.id]) {
          checkPage(10);
          doc.setTextColor(100, 100, 100);
          doc.setFontSize(8);
          const adviceLines = doc.splitTextToSize(`Advice: ${gate.advice}`, contentWidth - 10);
          adviceLines.forEach((line: string) => {
            checkPage(4);
            doc.text(line, margin + 6, y);
            y += 3.5;
          });
          doc.setTextColor(0, 0, 0);
        }
        y += 2;
      });
      y += 4;
    });

    checkPage(10);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Built on the PMI CPMAI framework · Simon Newton · productnomad", margin, y);

    doc.save(`${store.projectName.replace(/\s+/g, "_")}_assessment.pdf`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={handleExportPDF} className="font-mono text-[11px] uppercase tracking-wide px-3 py-2 border border-border hover:bg-secondary transition-colors">
        ↓ Download PDF
      </button>
      <button onClick={handleCopyClipboard} className="font-mono text-[11px] uppercase tracking-wide px-3 py-2 border border-border hover:bg-secondary transition-colors">
        ⊡ Copy Summary
      </button>
      <button onClick={handleExportJSON} className="font-mono text-[11px] uppercase tracking-wide px-3 py-2 border border-border hover:bg-secondary transition-colors">
        ↓ Export JSON
      </button>
      <button onClick={handleImportJSON} className="font-mono text-[11px] uppercase tracking-wide px-3 py-2 border border-border hover:bg-secondary transition-colors">
        ↑ Import JSON
      </button>
    </div>
  );
}
