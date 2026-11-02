The ticket's three acceptance tests are committed and pushed to `loop-bench/95`, and all three fail for the reason the ticket states.

**Strategy: `direct`.** The seam already exists: `createChatOrchestrator(...).processMessage` with an `onError` hook, and a provider whose `sendMessage` throws a non-Error value. The `catch` in `src/orchestration/chatOrchestrator.ts` gates `onError` on `instanceof Error`, so `onError` is never called.

**Tests** (`src/orchestration/nonErrorRejection.acceptance.test.ts`):
- A thrown string: `onError` once, with an `Error` whose `cause` is the string; the caller gets the string.
- A plain object: `onError` once, with `cause` being that same object; the caller gets that same instance.
- `undefined`: `onError` once, with an `Error`; the caller still rejects with `undefined`.

**Red bar**, run with `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/nonErrorRejection.acceptance.test.ts`, which matches the repo's `test` script:

```
FAIL src/orchestration/nonErrorRejection.acceptance.test.ts
  ● ... › calls onError once with an Error whose cause is a thrown string, and the caller still gets the string
    expect(received).toHaveLength(expected)
    Expected length: 1
    Received length: 0
    Received array:  []
  ● ... › calls onError once with an Error whose cause is a plain object, ...
    Expected length: 1
    Received length: 0
  ● ... › calls onError once with an Error when the rejection is undefined, ...
    Expected length: 1
    Received length: 0

Tests:       3 failed, 3 total
```

**Other notes:**
- `.lore/dod.md` quotes the ticket's central claim, names the `direct` strategy, lists the three tests, and sets out the facets (the gate removal, the spec line, the CHANGELOG entry) and the out-of-scope items.
- The ticket also asks that an existing `Error` reach `onError` as the same instance. That already holds, so I wrote no test for it; a test would pass today and not be red.
- The un-linked statement at `specs/hal-engine-config-hooks/spec.md` line 28 describes the flaw itself. The ticket replaces it, so I added no validated-by parenthetical. The new guarantee's spec statement doesn't exist yet, so there is nothing to link or stamp an anchor on.
- Formatting: prettier reported the file unchanged. I did not lint or typecheck, per the pod rules.
- The branch merged cleanly with `origin/main` and is in sync with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}