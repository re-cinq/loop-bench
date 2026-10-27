Implemented and pushed commit `72aa5bd`.

- Added secure `SERVER_ERROR` handling for failing conversation stores.
- Added focused regression test; red then green.
- Repaired traceability links and formatted changes.
- Merged `origin/main`; branch is synchronized.
- Red tests written: 1. Regressions: 0.
- Acceptance suite, lint, typecheck, and build were not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ordinary conversation-list store failures return SERVER_ERROR without leaking store details","tdd_next":"streaming interleaving and resume-by-id acceptance coverage"}}