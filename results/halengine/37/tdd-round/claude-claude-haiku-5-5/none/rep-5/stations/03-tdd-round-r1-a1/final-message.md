Round done: the function-valued schema facet is closed and pushed. The branch is in sync with its upstream and `origin/main` was already merged, so no merge commit was needed.

**What this round did**
- **Red:** added one test to `src/orchestration/tools/registry.test.ts`. A function-valued source returns a `string` schema, then a `number` schema, and `execute` must validate against the second. It failed because the validator from `register` time was reused, so the executor ran.
- **Green:** `registry.ts` now resolves function-valued sources on each `execute` and compiles the returned schema through a `WeakMap` keyed by schema object. Static tools keep the validator compiled at `register`. The file shows 4 of 4 passing.
- **Refactor:** Prettier ran on the two source files. No other changes.
- **Docs and tracking:** the spec statement on function-valued caching now links to the new test (`registry.test.ts#L75`). The dod facet is ticked.
- **Commit:** `feat(tools): validate each call against its schema`, with the Haiku co-author line.

**Test runs:** only `registry.test.ts` was run, with Jest (`package.json` uses Jest, not Vitest). No acceptance tests and no lint, typecheck or build were run here. I did not use `lore_*` tools because none are available in this session, so there was no `tests_covering` query.

**CI verdict:** the round brief reports red on `cea1b29`, but HEAD is `bbbcb6b`, which already removes the `strict` option, adds `cause` to the rethrow, and restructures the test file. The findings look addressed on HEAD, but I have not confirmed that because CI has not reported on it. Specifically unverified: the spec-link check at `registry.acceptance.test.ts:94` and the changelog check.

**Regressions:** none known. I have not seen a CI verdict on this HEAD, so I can't count red tests against this round. The round's own test was red, then green.

**Concerns**
- `bbbcb6b` edited `registry.acceptance.test.ts` (it restructured the round-2 branch of the orchestrator test). The ticket and dod say acceptance tests must not be edited. I did not touch it further, but someone should check whether that edit is acceptable.
- The eslint findings `prefer-early-return` and `max-member-chain` sit in that acceptance file. Fixing them would mean editing an acceptance test, so I left them alone.

**Still open in dod**
- Add `ajv` to `package-lock.json` (the `package.json` entry is present) and bump the version from `0.3.0` to MINOR.
- Wrong-typed validation: its one-line doc comment on `execute` pointing at the spec is missing. The behaviour itself already has a test.
- Remaining unit tests in `chatOrchestrator.test.ts`.
- Docs and changelog: `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, `CHANGELOG.md`, `example/weather-tool.ts`.
- Spec-link backfill for the remaining statements.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference","tdd_next":"Validate wrong-typed properties: add the one-line execute doc comment pointing at the spec, then the remaining chatOrchestrator tool-loop unit test"}}