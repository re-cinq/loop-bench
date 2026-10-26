Branch is up to date and clean. 

**What this round did:** Added a unit test `passes valid input with an undeclared extra property through to the executor unchanged` to `registry.test.ts` (line 24), which exercises the happy-path of `ToolRegistry.execute` and confirms extra properties pass through to the executor without modification. Added the `([validated by ...])` spec link for that statement in `specs/hal-engine-tool-input-validation/spec.md`. Ticked facet 2 in `.lore/dod.md`.

**No regressions:** 0 tests written by prior rounds turned red; the new test is GREEN. **Unrelated smells noticed but not acted on:** coverage for `connectionHandler.ts` and `helpers.ts` (ws transport) is low, but those are out of scope for this ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute — unit test for valid-input pass-through with spec link","tdd_next":"Add remaining unit tests in registry.test.ts (unknown-tool throw, wrong-type rejection, static-compile-once, dynamic-per-call) and chatOrchestrator.test.ts, link spec statements, update docs/adding-a-tool.md, README.md, .specify/spec.md, CHANGELOG.md"}}