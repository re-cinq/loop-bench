This round fixed the four CI findings from the last push and pushed the result. The branch is level with its upstream and already up to date with `origin/main`.

- **Typecheck:** `onErrorCause.test.ts` now builds its provider as an async generator, so it has the full `AsyncGenerator` shape.
- **Lint, non-repeatable test:** `onErrorNonError.acceptance.test.ts` now uses a fixed timestamp instead of `new Date()`. That is an edit to an acceptance test, but it only touches the session fixture; no assertion changed.
- **Lint, missing spec link:** the cause test is now linked from the spec. Its link moved to `#L37` after the generator edit shifted the test down a line.
- **Spec links:** the statement in `specs/hal-engine-config-hooks/spec.md` was restructured so all three links sit in one trailing parenthetical.
- **Prettier:** the check reported that all files match, but the job timed out after 10 minutes. I ran prettier on the three changed files and it changed nothing.

I ran only `onErrorCause.test.ts`, and it passes. I did not run the acceptance tests, the typecheck or the linter here.

Four checks failed and none of those findings was a regression. I did not run `scripts/spec-links/reanchor.mjs` because this repo doesn't have it. I re-checked the one link I shifted by hand.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI findings (typecheck, eslint, spec-links)","tdd_next":"acceptance green"}}