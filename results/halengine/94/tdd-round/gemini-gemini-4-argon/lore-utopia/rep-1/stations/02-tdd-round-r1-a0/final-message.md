Fixed both CI findings from the previous push (`typecheck` TS2353 on `PromptBuilderConfig` and `eslint` `re-lint/max-expects` on `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`), repointed the spec citation anchor in `specs/hal-engine-config-hooks/spec.md`, formatted with Prettier, and pushed to `origin`.

0 red tests were mine and 0 were regressions (no acceptance tests were run locally per instructions).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix typecheck and eslint max-expects failures in beforeSession acceptance test","tdd_next":"acceptance green"}}