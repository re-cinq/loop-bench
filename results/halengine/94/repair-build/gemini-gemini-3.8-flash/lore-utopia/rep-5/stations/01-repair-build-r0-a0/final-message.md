Fixed both CI failures reported on `c3cd08a`:

1. **typecheck**: Updated `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to instantiate `PromptBuilder` with `{identity: 'You are HAL.'}`, conforming to `PromptBuilderConfig` rather than passing the unrecognized `baseSystemPrompt` property.
2. **eslint (`re-lint/max-expects`)**: Consolidated the three separate `expect` calls in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` into a single `expect({outcome, caughtError, afterSessionRan}).toEqual(...)` assertion.
3. **spec anchors**: Updated `specs/hal-engine-config-hooks/spec.md` line 17 anchor from `#L40` to `#L32` to match the test's shifted line number; verified via `scripts/check-spec-anchor-names.mjs`.

Changes were committed, pushed to `origin HEAD`, and merged with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed PromptBuilderConfig type error and re-lint/max-expects assertion count in beforeSession acceptance test"}}