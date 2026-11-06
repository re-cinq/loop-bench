This round moved the `beforeSession` call inside the `try`. A throw from it now reaches `onError` and `afterSession`, and still rejects to the caller. The commit is pushed and the branch is not ahead of its upstream. Merging `origin/main` changed nothing because the branch was already up to date.

- **Red:** I added one test to `src/orchestration/chatOrchestrator.test.ts:116`, "a throw still reaches onError then afterSession, and nothing in between". It failed for the expected reason: no hooks ran at all.
- **Green:** in `src/orchestration/chatOrchestrator.ts`, `beforeSession` is now the first line inside the `try`. All 24 tests in that file pass, including the existing ones, which I did not edit. I did not run the acceptance test; CI will.
- **Refactor:** nothing to do for a two-line move.
- **Traceability:** I added a link to the new test on the `beforeSession` line in `specs/hal-engine-config-hooks/spec.md`. The 15 new test lines shifted existing links, so I ran `scripts/repoint-spec-anchors.mjs` (22 links moved) and `check-spec-anchor-names --fix` (1 more). Both checks are now clean. The repo has no `scripts/spec-links/reanchor.mjs` and no way to stamp a spec anchor on a test.
- **Red tests:** 1 was mine and 0 were regressions. No CI verdict existed yet, because there was no round brief.
- **`.lore/dod.md`:** I ticked the first facet and added a new one. The `beforeSession` line already states the new guarantee, but it still sits under "Measured semantics — out of scope", whose intro says "This issue changes none of them". That is now false. The spec also still has to say that `afterSession` cannot tell a failed `beforeSession` from a finished turn.

Two things I noticed and did not touch:
- `.lore/test-commands.yml` and `CLAUDE.md` say "Jest suite", but a plain `npx jest` fails on ESM. Only the `npm test` form (`node --experimental-vm-modules`) works, and nothing documents that for running a single file.
- The two links to `chatOrchestrator.ts#L148`/`#L150` in that spec point at source lines. They are still correct, but they break silently the next time that code shifts.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md: move the beforeSession guarantee out of the out-of-scope section and state what afterSession can assume"}}