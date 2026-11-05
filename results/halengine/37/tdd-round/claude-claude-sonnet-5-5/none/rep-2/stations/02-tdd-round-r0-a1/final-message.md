This round closed one facet: the unit test showing a function-valued tool definition is validated against the schema current at each call. It is committed and pushed, and the branch is level with its upstream.

- **Test:** added to `src/orchestration/tools/registry.test.ts`. It passes locally, run through Jest as the repo's `npm test` script does. It was already green when I wrote it, because the existing implementation caches validators by schema object and already behaves this way. It pins that behaviour but never went red.
- **Spec link:** the matching statement in `specs/hal-engine-tool-input-validation/spec.md` now cites it, using a hand-written `#L28` anchor. `scripts/spec-links/reanchor.mjs` does not exist in this repo.
- **`.lore/dod.md`:** I ticked this facet, and added a line for the facets still open (the larger "Add unit tests" facet stays unchecked).
- **CI:** I did not run the acceptance tests. `round-brief.md` was absent, so I have no CI verdict to read; nothing red was reported, so zero regressions and zero of my tests red.
- **Merge:** merging `origin/main` was a no-op.

**Still open for the next round:**
- Unit tests for required, wrong type, register throws, compile-once, unknown tool and no-leak logs, plus the tool-loop test in `chatOrchestrator.test.ts`.
- The one-line doc comment on `execute`. It is missing, and `src/orchestration/tools/registry.ts` has no comment on it yet.
- Updates to `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `CHANGELOG.md`, `example/weather-tool.ts` and `adrs/ADR-002-response-validation.md`.

I made no unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"unit test: function-valued schema validated per call","tdd_next":"remaining registry.test.ts unit tests (required, wrong type, register throws, compile-once, unknown tool, no-leak logs), chatOrchestrator tool-loop test, execute doc comment, docs/README/.specify/CHANGELOG/example/ADR-002"}}