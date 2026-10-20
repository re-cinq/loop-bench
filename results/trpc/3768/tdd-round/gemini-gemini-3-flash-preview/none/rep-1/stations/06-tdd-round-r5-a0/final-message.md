I have completed the TDD round to fix the subscription cleanup in `localLink`.

The investigation revealed that while `localLink` was resolution procedures in-process, it failed to correctly propagate the abort signal to the router. This meant that subscription procedures (such as those using `AsyncIterable` or `EventEmitter`) would not receive the abort signal when the client unsubscribed, leading to resource leaks (e.g., active event listeners remaining on the server-side router).

I implemented a robust signal management strategy in `localLink`:
1.  Created an internal `AbortController` for each operation.
2.  Linked this controller to the incoming `op.signal` to respect caller-initiated aborts.
3.  Ensured the controller is aborted in the observable's teardown function (when `unsubscribe()` is called).
4.  Passed the internal controller's signal to `callProcedure`, ensuring the router and its procedures are correctly notified of the cancellation.

I added unit tests in `packages/client/src/links/localLink.test.ts` to verify both unsubscription-led and signal-led aborts. These tests, along with the existing acceptance tests in `packages/tests/server/localLink.acceptance.test.ts`, are now passing.

I also verified that all regression tests in `packages/tests/server/regression/` stay green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"localLink runs subscription procedures in the same process and cleans up on unsubscribe","tdd_next":"acceptance green"}}