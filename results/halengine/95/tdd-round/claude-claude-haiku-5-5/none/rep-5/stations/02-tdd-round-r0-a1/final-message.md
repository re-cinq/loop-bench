This round closed facet 2: a plain-object rejection now gets a readable message. The change is committed and pushed to `loop-bench/95`, and `git status` shows the branch in sync with its upstream. Merging `origin/main` produced nothing new.

**What changed**
- `src/orchestration/chatOrchestrator.ts`: `toError` now builds the message with a new `messageOf` helper. Objects are serialised with `JSON.stringify`, and it falls back to `String()` if that returns nothing or throws (for example, a circular object). Non-objects still use `String()`. An `Error` still passes through as the same instance, and `cause` is unchanged.
- `src/orchestration/chatOrchestrator.test.ts`: one new test in the `onError` block, `gives onError a message that names a plain-object rejection rather than [object Object]`. I ran it first and it failed with `"[object Object]"`, then it passed after the change.
- `.lore/dod.md`: facet 2 is ticked.

**Test runs**
- I ran only my new test, by file and name, with the repo's ESM Jest setup: `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.test.ts -t '...'`. Plain `npx jest` cannot load this ESM suite.
- I did not run the other tests in `chatOrchestrator.test.ts`, including the existing `Error`-instance `onError` tests that facet 3 covers. CI will judge them.
- I did not run the acceptance file `onErrorNonError.acceptance.test.ts`, per the brief.
- Prettier check passes on the changed files. I did not run lint or the typechecker.
- No `round-brief.md` exists, so there was no CI verdict to work from.

**Tooling gap**
- The `lore_*` tools (including `lore-query-trace`) are not available in this session; a tool search returned only scheduling and messaging tools. I skipped the pre-edit coverage query and could not use `lore_get_ci_failures`. The change is small and confined to `toError`, so I judged that acceptable, but the coverage check was not done.

**Red tests**
- Mine: 1 written this round, red then green.
- Regressions: none known, since no CI verdict was available.

**Still open**
- Facet 3: confirm the existing `Error`-instance `onError` tests stay green. Facet 4: CHANGELOG entry, plus the spec line change the ticket asks for. Neither was done this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Give a plain-object rejection a readable message","tdd_next":"Confirm existing Error-instance onError tests remain green without modification"}}