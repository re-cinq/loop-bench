Blocked: the acceptance helper treats `pong` as proof that asynchronous `listFor` has finished. It can inspect frames before `session_list` arrives ([helper](/var/tmp/loop-bench/runs/2780fbadb1ea/workspace/target/src/transport/conversationList.acceptance.test.ts:40)). It must await the list/error response instead.

Per your instruction, I stopped without editing acceptance tests. No changes, commits, or local tests. CI’s truncated log identifies no failures, and Lore returned “branch not found,” so regression counts are unknown; I added zero red tests.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance helper incorrectly uses pong as a completion barrier for asynchronous listFor; acceptance-test correction requires authorization."}}