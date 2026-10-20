I've completed the round by improving `localLink` to correctly propagate error data and support input transformation.

### Changes made:
- **Error Propagation**: Updated `localLink` to use `getErrorShape` from the router's configuration. This ensures that `TRPCError` instances thrown by the router are correctly formatted into a shape that includes `code` and `data`, which is then preserved in the `TRPCClientError` emitted to the client.
- **Input Transformation**: Updated `localLink` to apply the configured input transformer. It now serializes the input (simulating the client) and then deserializes it (simulating the server) before calling the procedure. This ensures that the network boundary is correctly simulated for both input and output.
- **Improved Error Handling**: Introduced an `onError` helper in `localLink` to unify error formatting across queries, mutations, and subscriptions.
- **Test Consolidation**: Added new unit tests to `packages/client/src/links/localLink.test.ts` to verify correct error data propagation and transformer execution. All 11 tests in the suite are passing.

I've verified the changes with the updated unit tests and ensured that the implementation remains idiomatic and follows the project's conventions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"error and transformer propagation in localLink","tdd_next":"acceptance green"}}