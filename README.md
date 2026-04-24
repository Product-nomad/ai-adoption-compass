# AI Adoption Compass

**Interactive AI project assessment tool built on the PMI CPMAI framework.**

Assess your AI initiatives against the six phases of the Cognitive Project Management for AI methodology — Business Understanding, Data Understanding, Data Preparation, Model Development, Model Evaluation, Model Operationalization — and see where each initiative is strong, where it's weak, and what the next gate is.

## Who it's for

- Project / programme managers running AI initiatives who want a structured scoring model instead of gut feel.
- Engineering leads evaluating whether a proposed AI project is realistic against CPMAI's gates.
- Anyone studying for the PMI-CPMAI certification who wants a working reference implementation.

## What it does

- Guided questionnaire per CPMAI phase.
- Per-project scorecard visualising strengths and gaps.
- Phase-by-phase drilldown: what's required to advance to the next gate.
- Roadmap view that prioritises the highest-leverage next actions.

## Stack

- [TanStack Start](https://tanstack.com/start) — React + TypeScript meta-framework.
- [Bun](https://bun.sh) — runtime and package manager.
- [shadcn/ui](https://ui.shadcn.com) + Tailwind — UI.

## Getting started

```sh
bun install
bun run dev
```

Open the URL the dev server prints.

## Project structure

```
src/
├── routes/          # TanStack Router file-based routes
├── components/      # shadcn/ui-based components
├── data/            # CPMAI phase definitions, question banks
├── hooks/           # React hooks
├── lib/             # Utilities
├── store/           # Client-side state
└── styles.css
```

## Related

- [cpmai-navigator](https://github.com/Product-nomad/cpmai-navigator) — guided walkthrough of the same methodology (complementary project).

## Licence

MIT.
