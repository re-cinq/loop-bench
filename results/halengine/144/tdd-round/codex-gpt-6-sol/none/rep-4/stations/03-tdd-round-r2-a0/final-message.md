Committed and pushed the round as `371f1d1`. The new teardown test failed before the fix and passed afterward. I also addressed the CI findings listed in the round brief and completed the protocol documentation facet. The branch is up to date with `origin/main` and its upstream; CI has not yet judged this push.

Red tests: 1 written this round, now green; 0 identified regression test failures. The ticket and `.lore/dod.md` disagree on frame names and missing-store behavior; this round followed the DoD. No unrelated smells were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in the protocol and conversation-list specs","tdd_next":"acceptance green"}}