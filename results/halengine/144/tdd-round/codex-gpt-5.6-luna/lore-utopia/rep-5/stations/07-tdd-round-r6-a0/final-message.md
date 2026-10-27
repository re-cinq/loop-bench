Implemented and pushed commit `c907ada`.

- Added conversation-list failure handling with generic `SERVER_ERROR` responses and safe logging.
- Added focused regression test; it passed.
- Refactored duplicate test setup and repaired traceability links.
- Merged `origin/main`; branch is synchronized.
- Red tests: 1 authored, 0 regressions observed. Acceptance suite not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Map rejected conversation-list store calls to SERVER_ERROR with safe logging","tdd_next":"acceptance green"}}