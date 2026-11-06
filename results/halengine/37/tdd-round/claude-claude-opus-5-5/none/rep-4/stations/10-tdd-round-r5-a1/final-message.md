This round added the tool-loop test to `chatOrchestrator.test.ts`, and it is pushed. The branch is already up to date with `origin/main` and not ahead of its upstream.

**CI brief:** The CI verdict in the round brief is for the older commit `4e14f4d`. The commit after it, `8e19c19`, already fixes everything it names: the `ajv8` type errors (it now uses `ajv` 6 from `dependencies`), the acceptance-test lint errors, and the spec Status (now `Shipped`). That fix went in by changing the acceptance test file, though only to restructure the stub provider for the linter; its assertions are unchanged. There was nothing more to fix from that brief. CI hasn't reported on `8e19c19` yet, so the earlier 15-minute test-suite timeout may or may not come back.

**This round:**
- **Red:** I added a test in `src/orchestration/chatOrchestrator.test.ts:525`. A stub provider sends a tool call with `{}`, then a corrected retry with `{location:'Paris'}`, then ends the turn. The test asserts that `processMessage` resolves to `'sunny in Paris'` and that the provider's second round received a `tool_result` saying `location` is required. Validation was already built in earlier rounds, so this test pins existing behaviour rather than driving new code. To check it isn't empty, I temporarily switched validation off: the test went red ("sunny in undefined" reached the provider), and I restored the code.
- **Green:** No production change was needed. All 23 tests in that file pass. I ran only that file.
- **Refactor:** Nothing changed.
- **Traceability:** The orchestrator-recovery statement in `specs/hal-engine-tool-input-validation/spec.md` now links to the new test at `#L525`. I checked the other 11 links by hand because the repo has no `reanchor.mjs`. All still point at the right lines.
- I updated `.lore/dod.md`: the tool-loop facet is ticked, with a note that the stale CI brief was already handled.

Red tests: 1 mine (only because of a wrong regex word order in my first draft, which I fixed), 0 regressions.

**Left for later rounds:** `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md` and the ADR-002 updates, plus the MINOR version bump.

**Smells I noticed but didn't touch:**
- `chatOrchestrator.test.ts` builds an inline provider in several places (`capturingProvider`, `scriptedProvider`, and now this test). A shared scripted provider that also records requests would remove the repetition.
- In `registry.test.ts`, the compile-count tests spy on `Ajv`'s prototype, which ties them to how the library is built inside. Counting reads of the schema would avoid that.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add a tool-loop test in chatOrchestrator.test.ts (rejected call, then corrected retry)","tdd_next":"Update example/weather-tool.ts, docs/adding-a-tool.md, README.md, .specify/spec.md and ADR-002 for schema validation; MINOR version bump"}}