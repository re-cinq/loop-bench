Added and pushed commit `e91e433`.

- Strategy: `direct`
- Acceptance test: `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- Updated `.lore/dod.md` and spec traceability.
- Test intentionally fails because `onError` and `afterSession` are not called:

> Expected `["beforeSession", "onError", "afterSession"]`  
> Received `["beforeSession"]`

Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}