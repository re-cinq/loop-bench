Done. Ticket #94 is now expressed as two red acceptance tests through the real entry point.

**Triage: `direct`** — the seam exists: `createChatOrchestrator(provider, promptBuilder, undefined, {hooks})` is the real orchestrator entry, and the bug is that the `beforeSession` await sits above its `try` (`src/orchestration/chatOrchestrator.ts:91`), so its throw never reaches the `catch`/`finally` at :149–162.

**What I committed** (branch `loop-bench/94`, pushed, already contains latest `origin/main`):

- `src/orchestration/chatOrchestrator.acceptance.test.ts` — two tests, one `expect` each, mirroring the neighbouring suite's style (real `PromptBuilder`, a real counting provider, no mocks of the subject):
  1. **runs onError and afterSession when beforeSession throws, in that order, and still rejects with that error** — pins that the throw reaches the same `catch`/`finally`: both hooks fire, `onError` before `afterSession`, and the caller still gets the original rejection.
  2. **hands onError the session and error any other failure hands it, after a turn that reached no provider call** — pins the `(session, error)` shape and the recorded turn-extent assumption: provider never called, session entries exactly as `beforeSession` was given.
- `specs/hal-engine-config-hooks/spec.md` — the recorded-flaw bullet is replaced by a new `## A failed beforeSession` section whose two statements cite the red tests (`#L44`, `#L62`, on the `it(` declarations, names matching exactly per the repo's anchor gate). The other two recorded flaws stay in the out-of-scope section, now "two properties". No `| Status |` touched.
- `.lore/dod.md` — claim quoted verbatim, strategy `direct`, facets for the implementation round (move the await inside `try`, no error wrapping, leave the `instanceof Error` gate, add the CHANGELOG `[Unreleased]` entry, existing tests unedited).

**Actual red output** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`):

```
● ChatOrchestrator with a throwing beforeSession › runs onError and afterSession when beforeSession throws, in that order, and still rejects with that error
    - Expected  - 4
    + Received  + 1
    -   "order": Array [
    -     "onError",
    -     "afterSession",
    -   ],
    +   "order": Array [],
        "outcome": "session setup failed",
Tests:       2 failed, 2 total
```

Both fail for the ticket's stated reason: the rejection still arrives (`outcome` matches, so that criterion holds today), but `order` is empty and `sessionIdSeenByOnError`/`errorMessageSeenByOnError`/`entriesSeenByAfterSession` are undefined/`-1` — neither `onError` nor `afterSession` runs. Findings on the way (neighbouring, not tested): the `instanceof Error` gate means a beforeSession throwing a non-`Error` will still bypass `onError` after this fix — that's the ticket's own declared out-of-scope item, and my tests throw an `Error` deliberately so they stay in scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}