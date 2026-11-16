This round only fixed the eslint finding. I couldn't find what failed in the `test` job, and the docs work is still owed.

- **Lint fix:** the `re-lint/prefer-early-return` error at `chatOrchestrator.test.ts:547` came from an `else` branch in my tool-loop test stub. I replaced it with two `if`s. The commit is pushed, `origin/main` merged with nothing to add, and the branch is not ahead of its upstream.
- **Tests:** `chatOrchestrator.test.ts` and `registry.test.ts` pass locally, 27 tests. I ran them with the repo's own `node --experimental-vm-modules` jest invocation, not the acceptance tests.
- **CI `test` failure:** the brief's log was truncated to the coverage table. `lore_get_ci_failures` returned "branch not found" for `loop-bench/37`. Querying `HEAD` returned a green verdict on a different SHA, which I can't map to this branch. The next CI verdict should show whether that failure was real. Likely suspects are the acceptance tests or a coverage threshold.
- **Red tests:** none of the tests I wrote were red, and I found no regressions.
- **Still owed:**
  - `docs/adding-a-tool.md`
  - `README.md`
  - `.specify/spec.md`
  - `adrs/ADR-002-response-validation.md`
  - `example/weather-tool.ts`
  - `CHANGELOG.md`
- **Other note:** `dod.md` still has the last facet unchecked, since the docs are not done.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint prefer-early-return in orchestrator rejection test","tdd_next":"docs/adding-a-tool.md, README, .specify/spec.md, ADR-002, example/weather-tool.ts, CHANGELOG; re-check CI test failure"}}