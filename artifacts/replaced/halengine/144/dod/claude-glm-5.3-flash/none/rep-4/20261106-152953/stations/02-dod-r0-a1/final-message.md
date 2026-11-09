Everything is verified. The deliverable is complete, committed, and pushed — this pod's job was to confirm it rather than redo it.

## State of the ticket

The branch `loop-bench/144` carries exactly one commit over `origin/main`: `dd42a8e` — **7 acceptance tests** in a new file `src/transport/conversationList.acceptance.test.ts`, plus `.lore/dod.md` and the spec statements they validate. Nothing was owed that wasn't already on the branch, so I changed no code this session; I ran and verified what's there.

**Strategy: `direct`** — the seam is the real `createServer` driven by a real `ws` client, plus the pure `validateMessage`. No doubles stand in for the server; the only doubles are stores a consumer could write (recording `listFor`, one lacking `listFor`, one that rejects).

## Red bar — actually run, all 7 fail on the absent behaviour

```
node --experimental-vm-modules node_modules/jest/bin/jest.js \
  --runTestsByPath src/transport/conversationList.acceptance.test.ts
```

Test 1 (happy path), quoted from the run:

```
● delivering a user conversation list over the websocket › answers list_conversations with
  exactly one conversation_list carrying the conversations of the connecting user, newest first,
  times as ISO strings, and no stream_end

    - Expected  - 24
    + Received  +  2
      -   "listed": Object {
      -     "conversations": Array [ …three summaries, newest first… ],
      -     "type": "conversation_list",
      -   },
    +   "listed": undefined,
          "told": Array [
            "connected",
    -       "conversation_list",
    +       "error",
            "pong",
          ],

Test Suites: 1 failed, 1 total
Tests:       7 failed, 7 total
```

Every failure reads against the ticket's claim: `list_conversations` is answered `INVALID_MESSAGE` today (validation doesn't know the frame), the store's `listFor` is never called (`asked: []`), no `conversation_list` ever appears. No failure is an import error, a timeout, or a fixture gap. CI re-proves the red bar on every push in the **Test (with coverage floor)** step (`npm run test:coverage`) of the **Verify** job in `.github/workflows/ci.yml`.

## Also verified

- **Traceability green**: `spec:names` (805 citations name their test), `check:spec-links` (0 misplaced across 1928 statements), `check:spec-status` (0 findings). All 17 citations point at the exact `it(` lines (163, 193, 220, 252, 273, 313, 343).
- **Seams real on base**: `SessionSummary` carries `Date` times, `SessionCursor` is the composite `{updatedAt, sessionId}` (the amendment), `listFor?` is optional, and resume sends `connected` + `entry_*` with no `stream_end` — the tests assert exactly this.
- **Formatting**: `prettier --check` clean.
- **Delivery**: `origin/main` is at the branch's merge-base (2926558) — no drift, nothing to merge; `git status -sb` shows `loop-bench/144...origin/loop-bench/144` with no ahead/behind, and origin's tip is `dd42a8e`. The push landed.
- **Honest parking**: source-text criteria (the additive-only `messages.ts` diff, `ConnectedMessage` unchanged, changelog, docs via `docs:fix`, MINOR bump, `npm run verify`) are facets in `.lore/dod.md` gated by the build round's diff and existing CI steps, not source-scanning tests. The `StoreCannotList` throwing-store case is deliberately the build round's own test — importing an export that doesn't exist yet would fail the whole file at load, making all 7 red for the wrong reason.

One note: 7 tests exceeds the usual bar of five. This ticket is size:M with 16 acceptance criteria spanning wire contract, authorisation, opt-in, failure and lock semantics; splitting the suite would have dropped coverage of criteria the ticket states explicitly.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}