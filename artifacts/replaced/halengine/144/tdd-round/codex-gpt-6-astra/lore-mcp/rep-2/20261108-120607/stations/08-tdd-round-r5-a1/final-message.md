Committed and pushed `aaf955b`. One red-to-green test now passes; Mongo download directories are isolated by process. Formatting and traceability updated. Branch is synchronized with main and upstream.

Red counts: 1 new test; CI named 1 existing failure, with no evidence this branch caused it. CI must confirm the startup fix. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Isolate MongoDB test binary download locks by process","tdd_next":"Confirm MongoDB startup in CI, then document list_sessions and session_list in both specs"}}