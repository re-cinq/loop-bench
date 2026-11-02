Round complete for the validation facet, and the branch is pushed (`0bbbe1f`, in sync with `origin/loop-bench/144`).

**What I did (one red-green-refactor round)**
- **Red:** added `accepts a bare list_sessions frame, with no limit or before` to `src/transport/ws/validation.test.ts`. It failed with `Unknown message type: list_sessions`.
- **Green:** added `ListSessionsMessage` to `src/types/messages.ts` (additive, and it joins `IncomingMessage`), and a `list_sessions` case in `validation.ts` that returns the bare frame. All 4 tests in that file pass.
- **Refactor:** nothing needed; the code is the minimum that passes.
- Ran the formatter (prettier, no changes), updated `.lore/dod.md`, committed, and pushed. Merging `origin/main` produced nothing new.

**Facet status**
- Facet "Validate `list_sessions` frames" is **not ticked**. The bare frame is accepted, but `limit` and `before` validation is still missing. I recorded the remainder as a new unchecked sub-facet.
- Still open: the types facet is only partly done (`ListSessionsMessage` exists, but `SessionSummaryFrame` and `SessionListMessage` are not added yet), plus the handler, store threading, and specs facets.

**Things I could not do or chose not to**
- **No lore tools were available.** `ToolSearch` returned only `CronCreate`, so I skipped the `lore-query-trace` coverage check before editing. The edits were small and additive, so I judged the risk low, but the check did not run.
- **Tests run here:** only `src/transport/ws/validation.test.ts`, via the project's ESM Jest command (`node --experimental-vm-modules node_modules/jest/bin/jest.js`). The bare `npx jest` form failed on ESM before that. I did not run the acceptance file `src/transport/conversationList.acceptance.test.ts`, per the round rules.
- **Not checked:** no typecheck and no lint, per the pod rules. `ts-jest` may still surface a type error in CI.
- **Wire-name mismatch to flag:** the ticket says `list_conversations` / `conversation_list`, but the acceptance tests and dod use `list_sessions` / `session_list`. I followed the acceptance tests. The ticket's amendment (`before` as a `{updatedAt, sessionId}` cursor) matches `SessionCursor`, so I used that type.
- **Unrelated smells noticed, not acted on:** none significant this round.

**Regressions:** none observed. I ran only my own test, so CI's verdict on the existing suite is still unknown.

**Red test count (CI verdict):** none yet; there was no `round-brief.md` and no `CI reported failures` section, so this is the first CI read.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames: accept bare frame (partial; limit/before still open)","tdd_next":"Validate list_sessions frames: reject malformed limit or before with INVALID_MESSAGE"}}