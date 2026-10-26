Pushed and confirmed. Here's what this round did:

- **Root cause**: The previous round removed `eventually` from `sessionResume.test.ts` and moved it to `wsTestSupport.ts`, but omitted the `export` keyword — causing `TS2304` at lines 238 and 274 and runtime test failures on the same lines.
- **Also**: The previous round inserted a new import line (+1) and a 39-line test block into `messageHandler.test.ts`, shifting all spec citation line numbers below the insertion point by 39. The `require-spec-link` ESLint rule checks by line range: 5 tests ended up in gaps where no spec reference fell within their span.
- **Fixes**: Exported `eventually`; imported it in `sessionResume.test.ts`; ran `spec:names --fix` which auto-reanchored 110 stale citations; added a spec citation for the new `list_sessions` unit test at L90 in `hal-engine-conversation-list/spec.md`.

Regressions fixed: 0 (sessionResume: 25/25 pass, messageHandler: 55/55 pass). The 0 tests I wrote and the regressions I caused: none. Next round takes the documentation facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI regressions: export eventually, reanchor 110 spec citations, add list_sessions unit test citation","tdd_next":"document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}