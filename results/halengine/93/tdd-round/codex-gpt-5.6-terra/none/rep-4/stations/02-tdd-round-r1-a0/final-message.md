Fixed and pushed `02d22bd`.

- Repaired all reported CI findings: spec anchors, public type lint, changelog.
- Marked completed facets in `.lore/dod.md`.
- Formatted changed files; spec-anchor check passed.
- No tests ran locally: acceptance tests are CI-only, and this repair round added none.
- Red tests: 0 mine; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do; document the aggregate hook behavior","tdd_next":"acceptance green"}}