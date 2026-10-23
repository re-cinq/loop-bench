Round done: facet 1 is closed and pushed as `c615a91` on `loop-bench/94`. The branch matches its upstream, and the merge with `origin/main` was a no-op.

**What changed**
- `src/orchestration/chatOrchestrator.ts`: `beforeSession` is now the first statement inside `try`, so a throw reaches `onError`, `afterSession` and the save in `finally`. The call is the same line count, so the `#L148`/`#L150` links into this file are still correct.
- `src/orchestration/chatOrchestrator.test.ts`: one new test, "called with session and error when beforeSession throws", in the `onError` block. It was red before the move (`onError` never fired) and green after. The file's 24 tests all pass.
- `specs/hal-engine-architecture/spec.md` and `specs/hal-engine-tool-input-validation/spec.md`: 12 links into the orchestrator test file that sit below the insertion point moved by +25 lines. The repo has no `reanchor.mjs`, so I re-verified each one by test title.
- `.lore/dod.md`: facet 1 ticked. The "Done when" acceptance box is left unticked because CI decides it.

**Tests run**
- I ran only `src/orchestration/chatOrchestrator.test.ts`, which holds the new test, using the repo's Jest invocation with `--experimental-vm-modules`. The repo uses Jest, not Vitest.
- I did not run the acceptance test `chatOrchestrator.beforeSession.acceptance.test.ts`, per the brief.
- Prettier reported both files unchanged. I did not run lint or the typechecker.

**Not done (next rounds)**
- Facet 2: the spec. The `beforeSession` claim at `specs/hal-engine-config-hooks/spec.md:26` already describes the new behaviour, but it still sits under "Measured semantics — out of scope", whose heading says this issue changes nothing. The spec also still needs the answer to whether `afterSession` should be told the session never started, and that answer is not recorded yet.
- Facet 3: the CHANGELOG entry for existing consumers.

**Other notes**
- The lore MCP server failed to connect, so I did not run `lore-query-trace` before editing or `lore_get_ci_failures`. No `round-brief.md` exists, so I had no CI verdict to act on.
- Red tests I wrote this round: 0. Regressions: none known; CI has not yet reported on this push.
- Smells noticed and not acted on: none beyond the stale "changes none of them" heading above.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}