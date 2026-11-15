I've committed and pushed a failing acceptance test for #95 to `loop-bench/95`. It fails for exactly the reason the ticket gives. The branch was already up to date with `origin/main`, and `git status` shows nothing left unpushed.

**Strategy: `direct`.** The test goes in through the real entry point, `createChatOrchestrator(...).processMessage`, using a provider whose stream rejects with a real value. No mocks are needed.

**Ticket claim (quoted in `.lore/dod.md`):**
> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Test:** `src/orchestration/chatOrchestrator.acceptance.test.ts` is one `it.each` with three cases: a string, a plain object, and `undefined`. Each case checks two things:
- `onError` is called exactly once, with an `Error` that has its own `cause` set to the original value.
- `processMessage` still rejects with that same value, checked by identity.

**Red bar** (`npx jest --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`):
```
● ... › calls onError once with an Error whose cause is a string, and the caller still receives the original rejection
      Object {
        "outcome": Object {
          "rejected": true,
          "value": "provider exploded",
        },
    -   "seen": Array [
    -     Object {
    -       "cause": "provider exploded",
    -       "isError": true,
    -     },
    -   ],
    +   "seen": Array [],
      }
● ... cause is undefined ...
        "outcome": Object { "rejected": true, "value": undefined },
    -   "seen": Array [ Object { "cause": undefined, "hasCause": true, "isError": true } ],
    +   "seen": Array [],
Tests:       3 failed, 3 total
```
The first excerpt is from before I added the `hasCause` check; the `undefined` excerpt is from the final run. In every case `onError` never fires (`seen: []`), but the caller still gets the original rejection. That is exactly what the ticket reports.

**Also in this commit:**
- **Spec:** in `specs/hal-engine-config-hooks/spec.md` I replaced the "Measured semantics — out of scope" section, which recorded the flaw, with the new guarantee in the hooks list. It links to the test at `#L40`. Until the fix lands, the spec states something that isn't true yet. I left `Status` alone.
- **No spec stamp mechanism:** `scripts/lore-list-tests.mjs` doesn't emit a `spec` field, so I put the anchor `specs/hal-engine-config-hooks/spec.md#8` in the `describe` title instead.

**For the next round:**
- **No new red test for an existing `Error`:** the ticket requires that an `Error` rejection reaches `onError` as the same instance. That passes today, so I wrote no test for it; the ticket says the existing tests, left unedited, pin it. Those tests only compare `error.message`, though, not identity, so a fix that wraps every rejection would still pass them. Whoever implements this should keep the original instance in that case.
- **CHANGELOG:** the entry the ticket asks for is still owed and listed under Facets in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}