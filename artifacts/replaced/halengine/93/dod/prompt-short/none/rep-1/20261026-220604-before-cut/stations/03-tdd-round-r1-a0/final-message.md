The branch is clean and pushed. Let me do a quick sanity check on any remaining unaddressed smells:

**Smells noted but not acted on (per instructions):**
- `src/orchestration/chatOrchestrator.ts` has `chatOrchestrator.ts#L150` in the spec — this link will point to line 151 after the import addition, but it's prose (non-test file link) and won't cause CI failures.
- The `registryReturning` function is similar (but not identical) in both test files — the lint didn't flag it, so it's below the threshold.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"TurnUsageMetadata type alias + all CI failures fixed (eslint/spec-links/changelog)","tdd_next":"acceptance green"}}