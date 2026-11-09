Done. The branch `loop-bench/95` carries commit `c586531`, pushed and up to date with its upstream, and already sitting on top of `origin/main` (`684b294`) — the merge was a no-op, so CI will run.

## What the ticket owed and how I defined DONE

**Strategy: `direct`** — the seam exists today: `hooks.onError` + `processMessage` on `createChatOrchestrator` are the real entry points, and a provider fixture that rejects with a non-`Error` value drives them as-is. No production code was written; the red bar is the deliverable.

**New file** `src/orchestration/chatOrchestrator.acceptance.test.ts` — two tests, both red for exactly the ticket's quoted claim ("bypasses `onError` entirely while still propagating to the caller"). Quoted failure output:

```
● ChatOrchestrator onError for a rejection that is not an Error › calls onError once with an Error whose cause is the thrown string, and rejects the caller with the string itself

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "hookReceivesAnError": true,
    -   "hookReceivesOriginalAsCause": true,
    -   "onErrorCallCount": 1,
    +   "hookReceivesAnError": false,
    +   "hookReceivesOriginalAsCause": false,
    +   "onErrorCallCount": 0,
        "outcome": "provider socket reset",
      }

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

The second test fails the same way for the plain object and the `undefined` rejection (`onErrorCallCount: 0` in both nested objects), while `callerGetsSameReference: true` and `callerReceivesUndefined: true` already hold — so the failures land precisely on the missing `onError` call, not on anything downstream. Run via `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`.

**Also in the commit**

- `specs/hal-engine-config-hooks/spec.md` — the recorded-flaw line is replaced with the new guarantee under a new "Error reporting" heading; the two new statements cite my two tests, and a third statement pins Error-passthrough on the existing test the ticket names. All spec gates CI runs were verified locally green: `spec:names` (604 citations name their test), `repoint-spec-anchors --check origin/main` (0 stale/mislabelled), `check:spec-links` (0 misplaced), `check:spec-status` (0 findings), prettier clean.
- `.lore/dod.md` — triage, checkboxes, facets.

**Findings for the implementing round**

- Acceptance criterion 4's **CHANGELOG half is still owed** — I deliberately left it to you; `scripts/check-changelog.sh` will fail CI once your `src/` change lands without an Unreleased/Fixed entry.
- Acceptance criterion 3 (Error → same instance) is pinned by the existing unedited `chatOrchestrator.test.ts` per the ticket; CI's full coverage run proves it — I did not list that file under "Done when these pass" so your own test runs stay unblocked.
- Wrap with a ternary on `instanceof Error` rather than any new `catch` — `re-lint/no-catch-as-control-flow` is an error in this repo.
- Typecheck and eslint were not run here (this pod OOMs on both); CI's "Type check" and "Lint (--max-warnings 0)" jobs judge them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}