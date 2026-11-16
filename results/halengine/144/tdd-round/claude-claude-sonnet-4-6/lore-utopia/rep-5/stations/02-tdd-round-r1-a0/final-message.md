Branch is pushed and up to date. The commit resolves all 5 CI failures from the round-brief:

1. **`re-lint/require-spec-link`** (4 validation tests + 1 acceptance test): Added `§4.3 list_sessions` and `§5.9 session_list` to `specs/hal-engine-websocket-protocol/spec.md` with citations for all 4 validation tests. The acceptance test citation was fixed by `spec:names --fix`.

2. **`re-lint/max-expects`** (validation.test.ts line 44): Converted `it.each` with 2 expect calls to a plain `it` with one loop-internal `expect` call.

3. **`re-lint/no-duplicate-code`** (3 blocks across sessionResume/conversationList): Extracted `eventually`, `delegatingTo`, and `drainEngines` to `wsTestSupport.ts`; removed local copies from both test files.

4. **spec-names**: Re-ran `spec:names --fix` after all edits to reanchor 31 citations shifted by the code removals.

5. **changelog**: Added `list_sessions`/`session_list` entry under `[Unreleased]`.

Unrelated smells noticed (not acted on): `specs/hal-engine-session-resume/spec.md` has many citations to `sessionResume.test.ts` - all were reanchored by the spec:names fix since removing `eventually`/`delegatingTo` shifted every test 20 lines earlier.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"document list_sessions and session_list in websocket-protocol spec + fix all CI lint failures","tdd_next":"acceptance green"}}