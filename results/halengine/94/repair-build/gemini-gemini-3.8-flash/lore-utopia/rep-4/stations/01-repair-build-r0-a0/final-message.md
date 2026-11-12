Fixed the two CI failures reported on the branch:

1. **Typecheck failure (TS2353)**: In `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, `new PromptBuilder(...)` was called with properties (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`) that do not exist on `PromptBuilderConfig`. Updated configuration to `{identity: 'You are HAL.'}`.
2. **ESLint failure (`re-lint/max-expects`)**: Test had 3 `expect` calls when at most 1 is permitted. Consolidated the assertions into a single `expect({outcome, caughtError, afterSessionRan}).toEqual(...)` using the `outcomeOf` helper.
3. **Spec citation anchor**: Updated the declaration anchor in `specs/hal-engine-config-hooks/spec.md` from `#L40` to `#L36` to match the declaration line, verified with `node scripts/check-spec-anchor-names.mjs`.

Changes formatted with Prettier, committed, and pushed to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"PromptBuilderConfig type error and max-expects lint error in beforeSession acceptance test"}}