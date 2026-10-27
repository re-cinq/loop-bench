Committed and pushed `6f6626d`. The new registry test confirms extra properties pass through unchanged and unknown tool names still throw. It passed immediately, so this round found no implementation gap; **0 red tests were mine and 0 were regressions**. I also fixed the four lint findings reported by CI and updated the spec links. The branch is up to date with its upstream, and `origin/main` merged cleanly.

The remaining checklist facet is still open: the orchestrator retry test and documentation updates remain. No unrelated smells were noticed.

Test run: `src/orchestration/tools/registry.test.ts` — 6 passed. Formatter run; no lint, typecheck, or acceptance tests run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"registry passthrough and unknown-tool unit coverage; prior CI lint findings repaired","tdd_next":"orchestrator retry test and remaining documentation updates"}}