Done. This branch already carried the DoD work from an earlier incarnation of this pod (`a27ff28`); I verified it end to end rather than trusting it, fixed one formatting drift, and pushed.

## Triage: `direct`

The seam already exists — `createChatOrchestrator(provider, promptBuilder, registry, {hooks})` takes a provider and an `onError` hook, so a real provider whose `sendMessage` throws a non-`Error` value exercises the catch at `src/orchestration/chatOrchestrator.ts:150` through the real entry point. No production code written; the `instanceof Error` gate still stands.

## What's on the branch

- **`src/orchestration/chatOrchestrator.onError.acceptance.test.ts`** — two tests through `processMessage`:
  1. *reports every non-Error rejection to onError as an Error carrying it as cause* — string, plain object, and `undefined` rejections must each fire `onError` once with an `Error` whose `cause` is that value (identity), while the caller still receives the original. **RED.**
  2. *hands an Error rejection to onError as that same instance and rejects the caller with it* — pins the no-wrapper half of the guarantee the existing tests don't cover (they assert `error.message`, which a wrap-everything fix would satisfy). **GREEN** today; not the red bar.
- **`specs/hal-engine-config-hooks/spec.md`** — the recorded-flaw section replaced by "Error reporting guarantee" with both `([validated by …])` citations; anchors `#L52`/`#L77` verified against the actual test lines. `| Status |` untouched.
- **`.lore/dod.md`** — claim quoted verbatim, strategy, facets (fix + CHANGELOG entry remain for the implementation round), out-of-scope list.

## Red bar, as run

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.onError.acceptance.test.ts
```

```
FAIL src/orchestration/chatOrchestrator.onError.acceptance.test.ts
  ● ChatOrchestrator onError on a rejection that is not an Error › reports every non-Error rejection to onError as an Error carrying it as cause
    - Expected  - 8
    + Received  + 8
      Array [
        Object {
          "callerRejectedWithIsRejection": true,
    -     "onErrorCallCount": 1,
    -     "reportedCauseIsRejection": true,
    -     "reportedIsError": true,
    +     "onErrorCallCount": 0,
    +     "reportedCauseIsRejection": false,
    +     "reportedIsError": false,
        },
        … (same for the object shape) …
        Object {
          "callerRejectedWithIsRejection": true,
    -     "onErrorCallCount": 1,
    +     "onErrorCallCount": 0,
          "reportedCauseIsRejection": true,
    -     "reportedIsError": true,
    +     "reportedIsError": false,
        },
      ]
Tests:       1 failed, 1 passed, 2 total
```

`onErrorCallCount: 0` while `callerRejectedWithIsRejection: true` on all three shapes is exactly the ticket's claim: the hook is bypassed while the rejection still propagates. CI runs this file on every push via its `Test` step (`.github/workflows/ci.yml`, ts-jest over `src/`).

Also confirmed: formatter run over all changed files (`prettier --check` clean on the test and spec; `dod.md` re-formatted and committed as `a664f13`), branch level with `origin/loop-bench/95` and 0 commits behind `origin/main` — no merge needed, nothing unpushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}