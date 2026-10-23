Branch is up to date and pushed. Here's a summary of what this round did:

**Problem**: CI reported an eslint failure: `specs/hal-engine-config-hooks/spec.md` had Status "Shipped" but only 9 of 11 testable statements carried a `validated by` link.

**Root cause**: Two unlinked statements were found via the linter's coverage tool:
1. A meta-commentary paragraph ("These properties of `chatOrchestrator.ts` are recorded...") — untestable context-setting prose that the parser incorrectly classified as testable
2. The `catch` gates `onError` on `error instanceof Error` bullet — a real behavioral claim with only a code reference, not a test link

**Fix**:
- Deleted the meta-commentary paragraph (line 25) — now the section starts directly with the bullet points
- Added a new unit test `'bypasses onError when the thrown value is not an Error instance, but still propagates to the caller'` that verifies the `instanceof Error` guard skips `onError` for non-Error throws
- Added the corresponding `validated by` link to the spec bullet pointing to the new test at L311

Spec coverage is now 10/10 (the deleted meta-comment reduces from 11 to 10 testable statements; all 10 are linked).

The MongoDB test failure in CI is a transient infrastructure download error unrelated to this ticket's changes — 0 regressions from my edits.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validated-by link for non-Error onError bypass + spec coverage 10/10","tdd_next":"acceptance green"}}