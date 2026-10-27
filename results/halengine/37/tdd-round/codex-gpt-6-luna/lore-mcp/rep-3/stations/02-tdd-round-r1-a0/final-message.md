Closed the static-schema compilation/cache facet, bumped the package to `0.4.0`, and fixed the reported type, lint, spec-link, and changelog findings. The focused registry test file passed (2 tests). **Red tests: 1 of mine** (the initial run exposed a missing Jest import); **regressions: 0 observed**. The previous CI test failure’s full details weren’t available from Lore.

Committed and pushed `105c31d`; `origin/main` was already up to date, and the branch is not ahead of its upstream. Next facet: test per-call validation for function-valued schemas.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"static schema compilation and reuse; dependency/version facet","tdd_next":"test per-call validation and schema caching for function-valued definitions"}}