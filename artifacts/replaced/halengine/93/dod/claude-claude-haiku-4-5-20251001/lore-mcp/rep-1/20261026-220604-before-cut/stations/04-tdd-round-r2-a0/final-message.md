All facets were already ticked. The DoD is current and accurate — no changes needed.

Summary of what this round fixed:
- **Bug**: `scriptedProviderWithUsage` was yielding an extra `end_turn` stop chunk after a `tool_use` stop chunk, overriding the stop reason and preventing the tool loop from continuing. Fixed by merging usage into the last stop chunk in the array.
- **Bug**: "partial usage" test had no TOOL_CALL in round 2, so the loop never reached round 3. Fixed by adding `TOOL_CALL_2` to round 2.
- **ESLint `no-duplicate-code`**: Extracted a `run()` helper to deduplicate the orchestrator call + assertion pattern.
- **ESLint `require-spec-link`**: Added test for `onError` skipping non-Error throws; added spec link in `spec.md`.
- **ESLint `require-status-matches-coverage`**: Added 2 missing test-citation links in `spec.md` (intro paragraph → orchestratorHelpers unit test; Measured semantics bullet → new chatOrchestrator test), bringing coverage to 13/13.
- Updated acceptance test `#Lnn` anchors in spec to match refactored file.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: acceptance test scripted provider bug, duplicate code, spec link coverage","tdd_next":"acceptance green"}}