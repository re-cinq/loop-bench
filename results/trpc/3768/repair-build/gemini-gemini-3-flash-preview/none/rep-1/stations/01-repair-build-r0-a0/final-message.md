I have successfully completed the task of making the build green for the `trpc/trpc` repository's `localLink` / `ssrLink` feature branch.

### Key Changes:
1.  **Exported `localLink` and `ssrLink`**: Added `localLink` to the public exports of `@trpc/client` in `packages/client/src/links.ts`. I also added `ssrLink` as an alias for `localLink` in `packages/client/src/links/localLink.ts` to fulfill the ticket's title.
2.  **Implemented Subscription Support**: Enhanced `localLink` to handle `subscription` operations. It now supports both `Observable` and `AsyncIterable` results from the router.
3.  **Support for `tracked` Envelopes**: Added logic to correctly unwrap and transform `tracked` envelopes, ensuring they are delivered to the client in the expected format `{ id, data }`.
4.  **Signal Abortion**: Ensured that the operation's `AbortSignal` is correctly triggered when a client unsubscribes, allowing the server-side generator or observable to clean up resources.
5.  **Error Handling**: Refined error handling to ignore `AbortError` during unsubscription, preventing unnecessary error propagation to the client.
6.  **Verification**: 
    *   Verified that the initial `TypeError: (0 , localLink) is not a function` in `packages/tests/server/localLink.acceptance.test.ts` is resolved.
    *   Added new test cases to `packages/tests/server/localLink.acceptance.test.ts` to verify `tracked` envelope support and the `ssrLink` alias.
    *   Confirmed that all 5 tests in the acceptance suite now pass locally.
    *   Verified that the transient `ECONNREFUSED` error in `httpSubscriptionLink.test.ts` reported by CI does not reproduce locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Exported localLink/ssrLink and implemented subscription support (AsyncIterable, Observable, tracked envelopes) in localLink."}}