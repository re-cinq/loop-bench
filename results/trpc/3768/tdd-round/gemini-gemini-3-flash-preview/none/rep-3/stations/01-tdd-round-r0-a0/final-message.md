I have implemented the first version of `localLink` in `@trpc/client`, focusing on `query` and `mutation` operations.

### Changes Made:
- **`packages/client/src/links/localLink.ts`**: Created the `localLink` implementation. It allows running tRPC procedures in the same process as the client by directly calling the router. It supports:
    - **`router`**: The tRPC router to execute procedures against.
    - **`createContext`**: A callback to provide context for the procedures.
    - **`onError`**: A callback to handle errors at the link level.
    - **Transformers**: Input and output transformers are correctly applied to mimic network-based links.
- **`packages/client/src/links/localLink.test.ts`**: Added a comprehensive suite of unit tests verifying:
    - Basic query execution.
    - Context propagation.
    - Input and output transformation.
    - Error propagation and `onError` callback invocation.
- **`packages/client/src/links.ts`**: Exported `localLink` and its options.
- **`.lore/dod.md`**: Updated the Definition of Done to reflect the completed facets.

### Verification:
- Ran `packages/client/src/links/localLink.test.ts` using `vitest`, and all 6 tests passed.
- Verified that procedures can be called, context is correctly passed, and transformers work as expected.

### Next Steps:
- Implement subscription support in `localLink`, handling both async iterables and observables, and ensuring proper cleanup on unsubscribe.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"localLink basic implementation and query/mutation support","tdd_next":"handle subscription operations in localLink"}}