Committed and pushed `213018e`.

- Escaped `/` and `~` in required-field JSON Pointer paths.
- Added and linked a regression test; it failed first, then passed.
- Corrected CI-required spec status to Shipped.
- Test run: `registry.test.ts` — 12 passed.
- Red tests: 1 mine; regressions: 0.
- Remaining facet: documentation/version/migration updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Escape `/` and `~` in required-property names returned as JSON Pointer paths","tdd_next":"Add unit tests and documentation updates"}}