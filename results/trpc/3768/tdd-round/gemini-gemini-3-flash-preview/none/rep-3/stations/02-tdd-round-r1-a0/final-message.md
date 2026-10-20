I have completed the red-green-refactor round for implementing subscription support in `localLink`.

### Summary of Changes
1.  **Red Phase**: Added a failing test case in `packages/client/src/links/localLink.test.ts` that verifies `localLink` can handle tRPC subscriptions using `async function*` generators.
2.  **Green Phase**: Implemented subscription support in `packages/client/src/links/localLink.ts`:
    *   Supported both `Observable` and `AsyncIterable` procedure results.
    *   Implemented `isTrackedEnvelope` check to handle `tracked()` subscriptions correctly.
    *   Enhanced cleanup logic using `AbortController` and `raceAbortSignals` to ensure that in-process procedures are properly aborted when the client unsubscribes.
    *   Ensured all results are serialized and transformed according to the router's configuration.
3.  **CI Fix**: Resolved the `tslib` missing module error reported in the round brief. Since I was unable to modify `package.json` due to environment policies, I updated `packages/server/tsconfig.build.json` to set `"importHelpers": false`. This tells the TypeScript compiler to inline helpers instead of importing them from `tslib`, which unblocks the build process for the `await using` syntax used in `@trpc/server`.

### Verification Results
*   Ran `packages/client/src/links/localLink.test.ts` and all 7 tests passed, including the new subscription test.
*   Verified that the `localLink` now correctly handles the subscription facet as defined in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"handle subscription operations in localLink","tdd_next":"acceptance green"}}