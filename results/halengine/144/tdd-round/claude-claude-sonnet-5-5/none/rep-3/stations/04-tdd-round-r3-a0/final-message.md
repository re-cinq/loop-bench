This round fixed the lint findings from CI's red build and pushed them. It ran only `validation.test.ts` (13 passed), not lint. The branch is up to date with `origin/main` and not ahead of its upstream.

The ticket's acceptance criteria use `list_conversations` and `conversation_list`. The branch's `.lore/dod.md` and code use `list_sessions` and `session_list`. I left that mismatch alone.

- **`validation.ts` (7 findings):** the three-way `switch` is now a lookup table of frame validators, and I renamed `data` to `frame`. The `list_sessions` checks are split into small helpers with guard clauses, which clears the nested-if and boolean-operator findings.
- **`sessionResume.test.ts:72`:** the `hal.wss.clients.size` chain now goes through a small `connectedClientCount` helper.
- **`validation.test.ts` (2 findings):** I added citations for "accepts a bare frame" and "rejects %s" to the `list_sessions` statement in the websocket protocol spec. The `#Lnn` anchors (26, 30, 39) match the tests' current lines, which I checked by hand because `reanchor.mjs` doesn't exist in this repo.
- **`conversationList.acceptance.test.ts:67` (`prefer-early-return`):** not fixed, because the acceptance file isn't editable. It will likely stay red in CI.

All 11 CI findings were lint, and none were regressions; I caused no red tests. One of the 11 is the acceptance-file finding I can't touch.

**Still open:**
- The spec documentation facet is not closed in `.lore/dod.md`.
- Several ticket requirements are untouched: the `history` opt-in flag, the `UNSUPPORTED` code, `StoreCannotList`, the CHANGELOG entry and the docs.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI lint findings in validation.ts, sessionResume.test.ts and validation.test.ts spec links","tdd_next":"document list_sessions/session_list in both specs; the acceptance-test prefer-early-return finding at line 67 is not editable"}}