Done. The red bar is committed and pushed; the branch is up to date with its base and with `origin/loop-bench/144`.

## What I wrote

**Strategy: `direct`** — the seam already exists. Every test drives the real entry point (`createServer`/`createHalEngine` over a real socket, and `validateMessage`) and fails today on the absent behaviour, not on missing plumbing.

- `src/transport/conversationList.acceptance.test.ts` — 13 tests, one per unlinked claim of the ticket: the two frames end to end (newest-first, ISO-string times, the connection's own row listed, `ConnectedMessage` untouched, no `stream_end`), the `ws.userId` authorisation regression asserted on the recorded `listFor` argument, `limit`/`before` pass-through as a two-half ISO cursor, `UNSUPPORTED` when `history` is off or the store cannot list, `SERVER_ERROR` without store detail on a rejecting store with the socket kept and the session logged, `StoreCannotList` → `UNSUPPORTED`, mid-turn answered before `stream_end` (off the lock), the list-row → `?sessionId=` resume hand-off, the startup warning when `history` is on without `resume`, and the validator's accept/refuse table. One test is green by design — the typed `messages.ts` fixture pinning the additive invariant.
- `.lore/dod.md` — the ticket's claim quoted verbatim, the strategy, the test list, and the facets the build round owes (types, `ErrorCodes.UNSUPPORTED`, `StoreCannotList`, handler/config threading, spec citations by these test titles via `repoint-spec-anchors.mjs`, docs via `example/full-config.ts` + `docs:fix`, CHANGELOG/MINOR).

## Failure output (12 failed, 1 passed, 13 total — run: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`)

```
● … › validateMessage › accepts a bare frame, a limit inside 1-200, and a whole cursor
    +   "bare": false,
    +   "carried": "Unknown message type: list_conversations",
```
```
● … › answers UNSUPPORTED while history is off, and while the store cannot list at all
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
```
```
● … › answers a store that throws StoreCannotList with UNSUPPORTED, reading it as the misconfiguration it is
    the exported StoreCannotList this ticket adds is undefined
```
```
● … › carries a client from a conversation_list row to that conversation over the resume path
        "resumed": true,
    -   "rowEntryCount": 2,
    +   "rowEntryCount": undefined,
```

The last one shows the red bar is surgical: the existing #45 resume path already carries a client end to end today, and only the list row it must hand over is missing.

Notes: no production code written; prettier run over both files; lint and typecheck left to CI (the `Verify` job runs the suite with floors on every push). A neighbouring observation, not a subject for these tests: `spec.md` of the conversation-list spec is already `Shipped`, so the transport-side statements the build adds to it must be cited from day one or `check:spec-status` goes red — that ordering is spelled out in the facets.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}