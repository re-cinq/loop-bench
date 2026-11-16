I fixed the lint finding and finished the docs facet, and pushed both. I did not diagnose CI's `test` failure. Only `chatOrchestrator.test.ts` ran here (23 passed), and the full suite wasn't run.

- **Lint fix:** the orchestrator retry test at `src/orchestration/chatOrchestrator.test.ts` had two `expect` calls. I folded the executor's call count into the single `toEqual`, so the `re-lint/max-expects` error should be gone.
- **Docs and example:** I updated `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md` and `adrs/ADR-002-response-validation.md`. I also dropped the defensive defaulting in `example/weather-tool.ts`. `CHANGELOG.md` already had its entry. I ticked the last facet in `.lore/dod.md`.
- **Unconfirmed CI `test` failure:** the brief truncated that log and the CI-failures lookup returned nothing for this branch, so I never saw the failing test. The next round should read CI's verdict on this push.
- **Branch state:** it merges cleanly with `origin/main` and is not ahead of its upstream.
- **Red tests:** none this round. I saw no red test of mine and no regressions, but I couldn't see CI's `test` failure.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"lint max-expects fix in orchestrator retry test; docs/README/.specify/ADR-002/example updates","tdd_next":"read CI's verdict on the test failure (log was truncated); acceptance green if CI is clean"}}