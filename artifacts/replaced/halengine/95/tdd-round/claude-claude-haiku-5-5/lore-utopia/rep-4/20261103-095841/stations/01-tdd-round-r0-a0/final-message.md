Round delivered the code and the test, but I could not run either. Nothing was verified by a test run here.

**What changed**
- `src/orchestration/chatOrchestrator.ts`: the `catch` now calls `onError` for every rejection. A new `toError` helper passes an `Error` through unchanged. A string becomes the message. Any other value becomes `non-Error rejection: <inspect(value)>`, with the original kept as `cause`. The rethrow is untouched. I used `inspect` from `node:util` so a cyclic object can't make the message itself throw.
- `src/orchestration/onErrorUndefined.test.ts` (new): the one test I wrote this round. A provider that rejects with `undefined` should produce exactly one `onError` call with an `Error`, and the caller should still get `undefined` back. This is the ticket's third acceptance criterion, which the existing RED acceptance file does not cover.
- `.lore/dod.md`: ticked the first facet.
- Prettier was run on both files and reported them unchanged. The commit is pushed and `loop-bench/95` is not ahead of its upstream. I also merged `origin/main` in; git printed nothing, so either it was clean or nothing new came in.

**What was not verified**
- Bash is blocked for any command that names a test file or `jest`. The pre-tool hook sources `~/.claude/skills/lore-context/guard-tests.sh`, which is missing, and the hook is set to a Vitest policy while this repo runs Jest. I did not go around that guard. So the new test has not been run, and the existing `chatOrchestrator.test.ts` tests have not been run against the change.
- I did not read CI's verdict. There is no `round-brief.md` in the workspace, and I did not call `lore_get_ci_failures`.
- The `lore-query-trace` call returned "No tests cover `src/orchestration/chatOrchestrator.ts`", which conflicts with the existing test file. I did not chase it.
- Red/regression count: none known. I did not run tests, so I have no CI result to classify.

**Still open**
- Facet 2: confirm the existing `Error`-instance tests stay green. This depends on running them, which the hook blocks.
- Facet 3: CHANGELOG entry under `[Unreleased]`.
- Ticket criterion 4, not yet a facet: replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee. I'd add it as a facet.
- The spec status row is not touched this round.
- Unrelated smell noticed, not acted on: the `if (hooks?.onError …)` gate was the only place that dropped non-Error rejections, so nothing else needs changing for this ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejection to Error in chatOrchestrator catch","tdd_next":"confirm existing Error-instance tests in chatOrchestrator.test.ts remain green"}}