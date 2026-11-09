Done. The branch is pushed, clean, and current with its base.

## What I did

**Triage: `direct`** — the seam already exists (`createChatOrchestrator(...).processMessage()` with `hooks` is the real public entry point), so the acceptance tests call it directly and fail on the missing behaviour.

**`src/orchestration/chatOrchestrator.acceptance.test.ts`** (new file, 2 tests, both red):

1. **runs onError then afterSession and still rejects when beforeSession throws** — pins criteria 1–3 of the ticket: the throw still rejects the caller (unchanged), `onError` fires with the same session and error as any other failure, then `afterSession`.
2. **hands afterSession a session the turn never started** — pins the question the ticket asks to be decided: `afterSession` runs after a failed `beforeSession` and sees an untouched session (provider never consulted, entries exactly the caller's), recorded in the spec.

**`specs/hal-engine-config-hooks/spec.md`** — the recorded-flaw bullet is replaced by a new "When beforeSession throws" section carrying the guarantee and the cleanup-hook assumption, each statement citing its test (`#L42`, `#L79`); the out-of-scope section now reads "These two properties". The repo's own gates pass: `spec:names`, `check:spec-links`, `check:spec-status`. `.lore/dod.md` records the claim, strategy and remaining facets (the one-line code move + CHANGELOG are the next round's).

## Red output (the deliverable)

```
● ChatOrchestrator when beforeSession throws › runs onError then afterSession and still rejects when beforeSession throws
    Object {
      "callOrder": Array [
        "beforeSession",
  -     "onError",
  -     "afterSession",
      ],
  -   "onErrorGotError": true,
  -   "onErrorGotSession": true,
  +   "onErrorGotError": false,
  +   "onErrorGotSession": false,
      "outcome": "beforeSession failed",
    }

● ChatOrchestrator when beforeSession throws › hands afterSession a session the turn never started
    Object {
      "cleanup": Object {
  -     "ran": true,
  -     "roles": Array ["user"],
  +     "ran": false,
  +     "roles": Array [],
      },
      "outcome": "allocation failed",
      "providerConsulted": false,
    }

Tests: 2 failed, 2 total
```

Both fail for the ticket's stated reason — the hooks never fire — while `outcome` proves the rejection still reaches the caller, exactly the "unchanged from today" half of criterion 1.

**Command run** (and what CI's Test step runs on push): `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`

One neighbouring observation (not tested, out of scope per the ticket): when the fix lands, the `finally` will also run `saveSession` on this path — a consumer with a `sessionStore` gains a save after a failed `beforeSession`, which the CHANGELOG entry should mention alongside the hooks.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}