Pushed and up to date. The round fixed the CI failures:

- **ESLint**: Extracted `scriptedProvider` to `testHelpers.ts` (fixes cross-file duplication), replaced `any` with `TurnUsage`, consolidated 5 expects into one `toMatchObject`, removed the inline arithmetic comments (3-line comment block), removed unused `AIProvider`/`SendMessageParams` imports, extracted `runWithUsageCapture` helper to eliminate intra-file duplication.
- **Test**: Removed the `import {describe, it, expect} from 'vitest'` import — Jest injects these globally, and the import was failing at teardown under Jest's ESM module mapper.

All 4 DoD facets remain ticked from the previous round; all 3 acceptance tests pass locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures (eslint + test) in usage acceptance tests","tdd_next":"acceptance green"}}