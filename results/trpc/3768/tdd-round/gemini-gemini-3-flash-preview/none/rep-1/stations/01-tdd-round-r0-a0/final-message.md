I have completed the implementation of `localLink` as requested in ticket #3768.

Summary of changes:
1.  **Implemented `localLink`**: Created `packages/client/src/links/localLink.ts` which provides the `localLink` function. This link allows running tRPC procedures in-process without a network transport.
2.  **Support for all operation types**:
    *   **Queries and Mutations**: Handled by calling `callProcedure` directly.
    *   **Subscriptions**: Handled both `Observable` and `AsyncIterable` results, including support for `tracked` envelopes.
3.  **Comprehensive Options**: `LocalLinkOptions` supports `router`, `createContext` (via `CreateContextCallback`), `onError` callbacks, and `TransformerOptions`.
4.  **Verification**: Added `packages/client/src/links/localLink.test.ts` with 7 test cases covering queries, mutations, subscriptions (both types), `createContext`, `onError`, and `tracked` envelopes.
5.  **Integration**: Exported `localLink` from `@trpc/client` and added it to the Rollup configuration and entrypoints.

The implementation follows the TDD loop and fulfills all facets defined in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"localLink implementation and export","tdd_next":"acceptance green"}}