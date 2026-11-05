This round was docs only, so no new test was written. I did run `registry.test.ts` by file at HEAD: all 5 tests pass. That includes the enum test CI reported red.

The CI verdict I was given is for `08d8f7f`, which is older than HEAD. HEAD already loosens the `Ajv` options type, which should clear the `strict` typecheck error. I didn't typecheck here, so CI will confirm both. I didn't touch any code in `registry.ts`.

I updated `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md` and `example/weather-tool.ts` to match the new behaviour. The guide and example now say input has already passed the schema, unknown keys may remain, and a rejection is returned to the model rather than thrown. `CHANGELOG.md` already had its entry.

I ticked the tests-and-docs facet in `.lore/dod.md` and added one open facet: `adrs/ADR-002-response-validation.md` still has to record that tool input is validated at the registry. That is the next round.

The branch is pushed, `origin/main` was already merged in, and it is not ahead of its upstream. No red tests this round were mine and none were regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"docs/README/.specify/example update for registry input validation","tdd_next":"ADR-002 note on registry input validation, then acceptance green"}}