Added and committed the direct acceptance test and DoD.

- Test: `src/orchestration/onError.acceptance.test.ts`
- DoD: `.lore/dod.md`
- Spec traceability updated.
- Commit pushed: `e122101`
- Branch synchronized with `origin/main`.

Failure observed:

> `onErrorCallCount: 0`  
> `receivedErrorIsError: false`  
> `receivedCause: "not an Error"`

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}