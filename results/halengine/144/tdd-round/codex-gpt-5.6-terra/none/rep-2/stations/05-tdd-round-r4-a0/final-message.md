Documented `list_sessions` / `session_list`, updated changelog, ticked the DOD facet, and repaired 30 stale spec anchors flagged by CI. Committed and pushed `58fc9ef`; branch is synced with upstream.

No tests ran locally: this was the documentation-only remaining facet, and acceptance tests are CI-owned. Previous CI reported 0 red tests of mine and 0 regressions (only static-check failures).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in the protocol and conversation-list specs","tdd_next":"acceptance green"}}