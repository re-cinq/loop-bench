Round complete. Here's what was done:

**CI failures fixed (all 10 ESLint errors from the round-brief):**

1. **`no-duplicate-code`** (7 errors across both test files) — Extracted `eventually`, `delegatingTo`, and `teardownAll` from `conversationList.acceptance.test.ts` and `sessionResume.test.ts` into `wsTestSupport.ts`, which both files now import. The `afterEach` teardown loops were replaced with a single `teardownAll(servers, clients)` call.

2. **`prefer-early-return`** (1 error in `conversationList.acceptance.test.ts`) — Restructured `askAfterConnect`'s message handler: `pong` and non-connected frames now guard-and-return first, letting the connected path run flat.

3. **`prefer-polymorphism`** (1 error in `validation.ts`) — Replaced the 3-way `switch` on `message.type` with a `Partial<Record<string, MessageValidator>>` lookup table.

4. **`no-nested-if`** (2 errors in `validation.ts`) — Flattened both nested-if blocks in `validateListSessionsMessage` using a named `isInvalidLimit` boolean predicate and a ternary for `beforeError`.

Validation test suite (13 tests) passes locally. 0 regressions caused; 0 new tests written (this was a linting/structural fix round).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ESLint findings from CI (no-duplicate-code, prefer-polymorphism, no-nested-if, prefer-early-return)","tdd_next":"acceptance green"}}