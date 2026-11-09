Everything checks out. The working tree is clean, the branch is in sync with both `origin/main` and `origin/loop-bench/144`, and my verification pass changed nothing (prettier: `unchanged`).

## Summary

The DoD for #144 was already committed on this branch (`35b3995`) and pushed; I verified it end to end rather than taking it on faith.

**What the DoD is.** Eight socket-level acceptance tests in `src/transport/conversationHistory.acceptance.test.ts` — a new file, `.acceptance.test.ts` suffix, exercising the real entry point (`createServer` + a real `ws` upgrade), no doubles for the engine. Triage recorded in `.lore/dod.md` as **`direct`**: the seam exists, so every test sends `list_conversations` over a live socket and fails on what comes back. The one deliberate exception — `StoreCannotList` is dynamic-imported from `src/types/sessionStore.js`, the exact module where the build must define it — is documented there.

**The red bar, quoted** (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/transport/conversationHistory.acceptance.test.ts` — `Tests: 8 failed, 8 total`), each failing for the ticket's stated reason, not an import or fixture error:

- validation — all ten verdicts return `Unknown message type: list_conversations` where the frame (and its `limit`/`before` window rules) should validate
- the list itself — `answered: ["connected", "error", "error"]` instead of `['connected', 'conversation_list', 'conversation_list']`, `calls: []` — the store is never asked
- `ws.userId` authorisation — `askedAbout: []` where `['u1']` is owed
- feature off — `code: "INVALID_MESSAGE"` instead of `UNSUPPORTED`
- unlistable store — `TypeError: StoreCannotList is not a constructor` (the class the amendment names as new surface)
- failing store — `code: "INVALID_MESSAGE"` instead of `SERVER_ERROR`
- off the lock — `answeredOnce: 0`, an `error` arrives mid-stream instead of `conversation_list`
- resume from a row — `picked: undefined`, `resumed: false`, no replay

**Also verified:** all 8 `([validated by: ...](...#Lnn))` anchors in `specs/hal-engine-websocket-protocol/spec.md` match the test file's actual line numbers (this repo has no `reanchor.mjs`); the spec diff touches no `Status` row and no existing statement; the test file is prettier-clean under the repo's formatter; the criteria's remaining items (messages.ts additive interfaces, `ErrorCodes.UNSUPPORTED`, `HalEngineConfig.transport.history`, docs/CHANGELOG/version) are enumerated as build facets in `.lore/dod.md`.

One observation for the build round, not a test subject: the suite's ts-jest diagnostics were on and passed, so the file type-checks against today's `SessionStore`/`Logger`/`ValidationResult` shapes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}