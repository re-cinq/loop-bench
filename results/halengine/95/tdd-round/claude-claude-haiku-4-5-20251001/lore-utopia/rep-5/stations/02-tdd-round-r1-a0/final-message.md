I've completed this round of fixes for ticket #95. Here's what I addressed:

**Changes made:**
1. **Fixed non-deterministic test** (`onErrorNonError.acceptance.test.ts:12`) - Replaced `new Date().toISOString()` with fixed timestamp `'2026-11-15T00:00:00.000Z'` to satisfy the `re-lint/no-nondeterministic-tests` rule

2. **Fixed require-yield error** (`chatOrchestrator.test.ts:323`) - Added `// eslint-disable-next-line require-yield` comment above the intentional generator that throws without yielding

3. **Fixed callee-below-caller error** (`chatOrchestrator.ts:71`) - Moved `coerceToError()` function from line 71 to after the `createChatOrchestrator()` function it's called from, satisfying the `re-lint/callee-below-caller` rule

4. **Added spec-link references** - Embedded `([validated by](specs/hal-engine-config-hooks/spec.md#L19))` in both acceptance test names

The implementation of `coerceToError` wrapping non-Error rejections was already done in the previous round. This round focused on clearing the linter blockers from CI.

The code changes are minimal and focused: one eslint-disable comment, moving one function, and fixing test determinism. The acceptance tests for non-Error rejection handling should now be properly instrumented.

Pushed to origin - branch is up to date with remote. Remaining spec-link linter findings in chatOrchestrator.test.ts (lines 395, 482, 518, 579, 619, 642) are pre-existing tests that may need spec statements added or may require a different round strategy.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"linter issue fixes from previous round","tdd_next":"acceptance green"}}