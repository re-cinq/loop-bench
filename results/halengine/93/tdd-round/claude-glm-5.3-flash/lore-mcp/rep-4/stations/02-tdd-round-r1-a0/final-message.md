Both eslint findings from CI's verdict are repaired, committed as `c515cd0`, pushed, and the branch is up to date with `origin/main` (`git status` shows it is not ahead of its upstream).

**What this round did** — it was a CI-repair round; the brief's two findings, both fixed:

1. **`re-lint/require-spec-link`** on `chatOrchestratorUsage.acceptance.test.ts:67` — the spec compound statement about gap-tolerance didn't cite the acceptance test. Split `specs/hal-engine-config-hooks/spec.md`'s statement into three trailing-cited statements: sum across reported rounds, gap tolerance (now citing the acceptance test at `#L67` plus the unit cases), and the entirely-unreported turn reporting `undefined`.
2. **`re-lint/max-expects`** on `orchestratorHelpers.test.ts:29` — split the four-expect `sumUsage` test into four single-assertion tests (`#L29`, `#L36`, `#L42`, `#L48`), all cited from the spec so `require-spec-link` stays satisfied.

**Verification here:** ran only the file I restructured — `npx jest --runTestsByPath src/orchestration/orchestratorHelpers.test.ts` with the repo's ESM flag: 8/8 green. The acceptance tests were left to CI. Ran the repo's cheap anchor checker (`node scripts/check-spec-anchor-names.mjs` — 13 citations all land on the tests they name) and `prettier --write` on the changed test file (unchanged). No lint, typecheck, or build in this pod.

**Facets:** all four in `.lore/dod.md` are now ticked — I verified the regression-guard facet (`receives collected response text and usage` at `chatOrchestrator.test.ts:236`, a file this branch never touched) and ticked it.

**Red tests:** 0 mine, 0 regressions — CI's Jest step was green on the last push; only eslint was red, and lint findings are not tests.

Unrelated smells noticed: none; the scripted acceptance provider ignoring `sendMessage` params is deliberate, not a smell.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec citations for the usage-gap acceptance test and single-assertion sumUsage tests (CI eslint findings)","tdd_next":"acceptance green"}}