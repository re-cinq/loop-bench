Branch is already up to date with main. The push succeeded.

**Summary of changes in this round:**

- Fixed `chatOrchestrator.acceptance.test.ts`: removed incorrect `vitest` import (project uses Jest), fixed `PromptBuilder` config, extracted shared `scriptedProvider` to `orchestratorTestSupport.ts`, introduced `runTurn` helper to eliminate internal duplication, typed `receivedUsage` as `AccumulatedUsageMetadata | undefined` instead of `any`
- Created `src/orchestration/orchestratorTestSupport.ts` with shared `scriptedProvider` factory
- Updated `chatOrchestrator.test.ts`: imported `scriptedProvider` from shared file, added `AccumulatedUsageMetadata` import, fixed the "keeps usage from earlier round" assertion to match the new accumulated shape (`{...usage, providerCalls: [usage]}`)
- Added spec citations in `hal-engine-config-hooks/spec.md` and `hal-engine-architecture/spec.md` for all 8 new tests (3 acceptance + 5 orchestratorHelpers), and fixed stale anchors shifted by the test file edits
- Fixed rotten anchor in unmodified `hal-engine-tool-input-validation/spec.md`

Smells noticed but not acted on: the pre-existing rotten anchors at L353, L189, etc. in the architecture spec (these were stale before this branch).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures: vitest import, PromptBuilder config, duplicate-code violations, any type, missing spec citations","tdd_next":"acceptance green"}}