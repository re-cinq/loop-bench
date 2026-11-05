Stopped because the acceptance helper is incorrect: `askAfterConnect` resolves on `pong`, which can arrive before an asynchronous `listFor` response. It can therefore report missing frames for a correct implementation. It needs to await the list/error response itself.

Per your instruction, I did not edit acceptance tests. No files changed, tests run, or commits pushed. New red tests: 0; confirmed regressions: 0. CI’s reported test failures are acceptance cases.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance helper uses pong as an asynchronous list-response completion barrier; acceptance test correction is required."}}