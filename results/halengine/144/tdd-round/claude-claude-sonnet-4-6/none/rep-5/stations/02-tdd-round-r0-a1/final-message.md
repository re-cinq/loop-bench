The push landed. 

**What this round did:** Added sections §4.3 (`list_sessions`) and §5.9 (`session_list`) to `specs/hal-engine-websocket-protocol/spec.md`, each with citations pointing to the validation unit test and the three acceptance tests. The critical fix was providing a spec citation for the existing `'accepts a bare list_sessions frame'` test in `validation.test.ts`, which had none — causing `re-lint/require-spec-link` to fail. The `specs/hal-engine-conversation-list/spec.md` already had its WebSocket section from a prior round, so no changes were needed there.

**Smells noticed but not acted on:** The existing `specs/hal-engine-conversation-list/spec.md` citations use line numbers (#L87, #L129, #L161) that point inside test bodies rather than to the `it(...)` declarations (lines 93, 134, 163). These are off-by-a-few and would ideally be corrected by `repoint-spec-anchors.mjs`, but the check script doesn't validate line numbers so this is cosmetic.

**Tests this round: 0 red, 0 regression** (ran `validation.test.ts` — 4 tests, all passed; no new test written since the failing artifact was the ESLint spec-citation rule, not a test file).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md","tdd_next":"acceptance green"}}