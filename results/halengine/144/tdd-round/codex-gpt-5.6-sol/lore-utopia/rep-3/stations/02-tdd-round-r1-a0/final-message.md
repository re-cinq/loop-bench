Completed and pushed commit `f9cc92a`:

- Fixed all reported lint/test/changelog findings.
- Added session-list frame types and exports.
- Wired the session store into the message handler.
- Implemented authenticated `list_sessions` handling, ISO dates, empty fallback, and error logging.
- Targeted validation test: 4 passed.
- Red tests attributable to this round: 0; regressions: 0.
- Merged `origin/main` (already current) and confirmed the branch matches upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread the session store and handle list_sessions frames","tdd_next":"Document list_sessions and session_list in both protocol specs"}}