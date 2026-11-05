I closed one facet this round: a test that a static tool's schema is compiled once across ten `execute` calls. It passes locally, and the commit is pushed and in sync with `origin/main`. I ran only `registry.test.ts` (3 tests, all passing) and did not run the acceptance tests.

- **Brief mismatch:** `round-brief.md` reports red CI on `099de4a`, but the branch head is `67810d7`, which already repairs those findings (ajv import, `cause`, lint shape, changelog). I did not re-check them against a newer CI verdict.
- **Test:** the new test in `src/orchestration/tools/registry.test.ts` registers a definition whose `inputSchema` is a getter that counts reads. It asserts the read count is the same after ten calls as it was right after `register`.
- **Spec link:** the matching statement in `specs/hal-engine-tool-input-validation/spec.md` now carries the `([validated by: …](…registry.test.ts#L66))` link. The repo has no `scripts/spec-links/reanchor.mjs`, so I checked the line numbers by hand: `#L4`, `#L28` and `#L66` match their tests.
- **`.lore/dod.md`:** I added a sub-item recording the compile-once test and what remains.
- **Red tests:** none of mine were red. I did not look at which other tests were red, so I can't count regressions.

Still open:
- the unknown-tool test
- the required, wrong-type and register-throws unit tests in `registry.test.ts`
- the no-leak log test
- the `chatOrchestrator.test.ts` tool-loop test
- the one-line doc comment on `execute`
- the docs, README, `.specify/spec.md`, ADR-002 and example updates

I noticed that the `execute` doc comment is still missing, but I left it for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"unit test: static schema compiled once across repeated executes","tdd_next":"remaining registry.test.ts unit tests (unknown tool, required, wrong type, register throws, no-leak logs), chatOrchestrator tool-loop test, execute doc comment, docs/README/.specify/ADR-002/example"}}