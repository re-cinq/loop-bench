Blocked by an acceptance-test race: `askAfterConnect` resolves on `pong` before the awaited list response arrives. The protocol requires ping to be answered immediately; pong is not a list-completion barrier.

Per your instruction, I stopped without editing the acceptance test. No files changed, tests run, commits, or pushes. New red tests: 0; confirmed regressions: 0. The truncated CI verdict names two acceptance failures.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance helper incorrectly treats pong as completion of an asynchronous list request; it must await session_list or error."}}