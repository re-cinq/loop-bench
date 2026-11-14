Resolved both CI findings reported in `round-brief.md` on `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` (`TS2353` on `PromptBuilderConfig` and `re-lint/max-expects`), updated the shifted spec citation anchor in `specs/hal-engine-config-hooks/spec.md` (`#L40` -> `#L35`), and pushed commit `e797717`.

- **Tests run locally:** This round ran no Jest tests locally (pod policy disallowed the runner invocation); `check-spec-anchor-names.mjs` verified all 589 spec citations.
- **Red tests / regressions:** 0 regressions; both CI failures (`typecheck` and `eslint`) were on the branch's new `chatOrchestrator.beforeSession.acceptance.test.ts`.
- **Unrelated observations (not acted on):** `chatOrchestrator.ts` still gates `onError` on `error instanceof Error` and passes only the last round's usage (`lastUsage`) to `afterModelResponse` (both explicitly out of scope and tracked under separate issues).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI typecheck and eslint findings in chatOrchestrator.beforeSession.acceptance.test.ts and repoint spec anchor","tdd_next":"acceptance green"}}