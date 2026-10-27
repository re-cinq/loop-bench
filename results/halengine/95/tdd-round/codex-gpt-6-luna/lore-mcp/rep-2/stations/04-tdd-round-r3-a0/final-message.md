Handled non-`Error` rejections whose string conversion throws: `onError` receives a readable `Error` with the original value as `cause`, while the caller still gets the original rejection. Fixed the hook callback’s return type and added the spec citation.

The test I wrote failed first and passed after the change. I did not run acceptance tests, lint, typecheck, or the full suite. CI’s previous test failure invoked the build that the callback type error prevented; that connection is inferred from the failure log.

Committed and pushed as `c268595`; the branch is up to date with its upstream. Red tests this round: 1 (mine); regressions confirmed this round: 0. The unrelated logger console lint finding in the CI log remains untouched.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle rejection values that cannot be stringified while preserving the original cause","tdd_next":"acceptance green"}}