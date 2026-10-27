Added and pushed:

- `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- `.lore/dod.md`
- Spec traceability update

Strategy: `direct`.

Focused test correctly fails because hooks are skipped:

> `events: Array [ "beforeSession", ]`
>
> `"onErrorFailure": undefined`
>
> `"afterSessionSession": undefined`

Commit `f2b52ed` is pushed and branch is synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}