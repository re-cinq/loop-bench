I fixed the red CI findings I could reach and pushed. I haven't seen CI's verdict on the new push.

- **eslint `no-catch-as-control-flow`:** I removed `describeThrown`, which held a `try/catch` around `JSON.stringify`. `toError` in `src/orchestration/chatOrchestrator.ts` now builds the message for a non-string, non-`Error` rejection with `util.inspect`. That never throws, and it gives a readable message for plain objects. The wrapped `Error` still carries the original value as `cause`.
- **spec-links:** Line 20 of `specs/hal-engine-config-hooks/spec.md` cited four tests outside the statement's trailing parenthetical. I split it into five statements with one citation each.
- **spec-names:** The two acceptance-test citations on line 19 pointed at `#L52` and `#L63`. The tests are at `#L53` and `#L64`, so I repointed them.
- **Local checks:** `check:spec-links` and `spec:names` both pass here, and so does `onErrorCause.test.ts` (5 of 5).
- **Branch:** `origin/main` was already merged, and the branch isn't ahead of its upstream.

Still open:
- **Acceptance test lint:** `onErrorNonError.acceptance.test.ts` has lint errors of its own: `new Date()` at line 12 and missing spec links at 53 and 64. The output was truncated, so there may be more. I can't edit an acceptance test, so I left them. If CI still flags them, someone else has to decide how to handle it.
- **Not run here:** the acceptance tests, eslint (including the `re-lint/require-spec-link` errors on `onErrorCause.test.ts`, which I expect the spec citations to clear), the typechecker and prettier `--check`. I only ran prettier `--write` on the two files I changed.
- **Red tests:** none were mine this round, and I caused no regressions that I know of.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repaired CI findings: catch-as-control-flow lint, spec citation placement and anchor lines","tdd_next":"acceptance green"}}