Branch is clean and up to date. This round fixed all four CI failures:

1. **ESLint `max-expects`** — collapsed the two-expect test in `orchestratorHelpers.test.ts` into a single array assertion.
2. **ESLint `callee-below-caller`** — moved `scriptedProvider` below `reportedUsageFor` in the acceptance test, preserving line numbers L66/L76 for the `it` calls.
3. **ESLint `require-spec-link`** — added a new `## Usage accumulation` section in `specs/hal-engine-config-hooks/spec.md` with five `validated by` statements covering all five previously-unlinked tests, and replaced the under-counting statement.
4. **Changelog check** — added a `### Changed` entry describing the turn-total behaviour change and migration note.

Also closed the "make the type say the turn total" DoD facet by adding a one-line JSDoc to `afterModelResponse` in `OrchestratorHooks`.

Unrelated smell noticed (not acted on): the `chatOrchestrator.ts` line-number reference in the old spec statement pointed to L148/L150 — those may now be stale after prior edits, but verifying/fixing them is out of scope for this ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix ESLint spec-link, max-expects, callee-below-caller; add changelog; document afterModelResponse type","tdd_next":"acceptance green"}}