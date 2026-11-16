This round fixed the four eslint findings from CI's last verdict and pushed the fix. The branch is up to date with `origin/main` and not ahead of its upstream. I ran no tests, as the brief directs.

- **`registry.ts`:** `errorPath` now sits below `describeError`, and the chained `.replace` calls are split across two statements. This clears `callee-below-caller` and `max-member-chain`.
- **`registry.acceptance.test.ts`:** I made two style-only changes to the stub provider. A guard now returns early when `round !== 2`, and `lastMessage.content[0]` is destructured before reading `.content`. This clears `prefer-early-return` and `max-member-chain`. No assertion changed. The previous round had flagged these two findings as needing an owner decision, so look at that file's diff if you want to confirm the edit is acceptable.

There was no red test of mine this round and no regressions. The round's work was lint-only. The `chatOrchestrator.test.ts` tool-loop test is still unwritten, and so are the `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md` and `CHANGELOG.md` updates. Those remain open in the last facet of `.lore/dod.md`, which I left unticked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI eslint findings in registry.ts and registry.acceptance.test.ts","tdd_next":"chatOrchestrator tool-loop test; docs/README/.specify/CHANGELOG/spec links"}}