Added and pushed:

- `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- `.lore/dod.md`
- Updated lifecycle spec

Acceptance test correctly fails because hooks are not called:

> Expected events: `onError`, `afterSession`; received: `[]`

Commit `a858bee` is pushed, branch is synchronized with `origin/main`, and working tree is clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}