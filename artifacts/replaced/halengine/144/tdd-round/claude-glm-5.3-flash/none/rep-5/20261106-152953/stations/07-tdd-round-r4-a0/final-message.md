Round complete. The branch is pushed and up to date with its upstream, working tree clean, and it merges cleanly into `origin/main`.

## What this round did

**CI repair owed first** — the round brief's single eslint finding: `src/transport/ws/messageHandler.ts:55` "Comment spans 2 lines (max 1)". Compressed to one line carrying the constraint the code cannot show. Not run locally (lint doesn't fit this pod); CI judges the push.

**Facet closed** — *pin that every message literal valid before this issue still compiles* (the second open facet in `.lore/dod.md`):
- New `src/types/messages.test.ts`: one literal per frame exactly as the unions stood at main (`user_message`, `ping` in; the eight pre-list frames out), assigned to `readonly IncomingMessage[]`/`readonly OutgoingMessage[]`, the ten `type` strings asserted in order, plus a `@ts-expect-error` line (the repo's own `sessionStoreListSignature.test.ts` idiom) pinning that a frame missing a required field still does not compile.
- Spec statement added to § 3 Message Format of `specs/hal-engine-websocket-protocol/spec.md` with the trailing citation at the `it(` line (`#L26`); name and line verified by hand against the declaration.
- `.lore/dod.md` facet ticked with how it was closed. The remaining open facet (`transport.history` / `UNSUPPORTED` / `StoreCannotList`) stays unchecked: it rewrites the three recorded acceptance tests and is recorded as the ticket owner's call.

**Honesty about the pin's teeth** — the round proved by a transient mutation of `messages.ts` (renamed a field, then reverted, verified byte-identical) that ts-jest runs transpile-only under this repo's `isolatedModules: true`: the suite stayed green against a broken union. So the compile assignments are held by CI's **typecheck** step, not by jest; this run holds the fixture's completeness and the directive is held by typecheck the same way the existing repo pin is. The file's header comment says exactly that.

**Test runs this round:** only `src/types/messages.test.ts`, by file, with a deadline — 1 test, green. **Red tests of mine: 0. Regressions: 0** (CI's verdict named only the lint finding, no failing tests).

**Smells noticed, not acted on:** the issue's amended criteria (opt-in `transport.history`, `UNSUPPORTED`, `StoreCannotList`) remain unimplemented by the recorded divergence decision in `.lore/dod.md`; `wsErrorHandler` collapses every non-`AIError` into `SERVER_ERROR` with code `'UNKNOWN'` (`messageHandler.ts:185`); the acceptance file still carries the issue-era name `conversationList` for `list_sessions` frames, a leftover of the divergence.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"pre-change message literals pinned as a fixture (src/types/messages.test.ts) with its § 3 spec statement, plus the round brief's eslint comment repair","tdd_next":"settle the recorded transport.history/UNSUPPORTED/StoreCannotList decision, which needs the ticket owner"}}