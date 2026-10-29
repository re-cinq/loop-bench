Committed and pushed the round as `0b3b64e`; the branch is current with `origin/main` and has no unpushed commits.

The new server-stop test failed first, then passed after `stop()` was changed to wait for socket closure. I also addressed the prior CI findings: the teardown lint errors and the missing Mongo binary cache directory. I ran only the new test. The prior CI verdict showed 0 red tests from this round and 3 existing store agreement test failures; CI has not yet judged this push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wait for connected sockets on server stop and repair the reported CI findings","tdd_next":"acceptance green"}}