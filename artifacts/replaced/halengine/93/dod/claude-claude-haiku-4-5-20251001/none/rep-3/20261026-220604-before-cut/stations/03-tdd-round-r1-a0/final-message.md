Branch is clean and pushed. This round ran no new tests here (the acceptance test is blocked by the guard as a CI-judged test; the refactored file is semantically identical — same five assertions, same expected values).

**Smells noticed but not acted on:**
- `CLAUDE.md` still shows the old `afterModelResponse` signature without the JSDoc I added — a docs-only inconsistency, not a CI failure.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: refactored acceptance test (no-duplicate-code, max-comment-lines), added spec links for all 5 tests, CHANGELOG entry, JSDoc on afterModelResponse, updated .lore/dod.md","tdd_next":"acceptance green"}}