I fixed a critical CI build failure in `@trpc/server` and added the requested `ssrLink` alias along with proper package entrypoints.

### Summary of Changes
- **Fixed `@trpc/server` Build:** Moved `tslib` from `devDependencies` to `dependencies` in `@trpc/server/package.json`. This resolved the `TS2354` error where the TypeScript compiler could not find `tslib` helpers for the new `await using` syntax during the Rollup build.
- **Added `ssrLink` Alias:** Introduced `ssrLink` as a public alias for `localLink` in `@trpc/client`, as requested in the ticket title.
- **Improved Package Exports:** Added `localLink` to the Rollup entrypoints and `package.json` exports in `@trpc/client` to ensure it can be imported as a separate entrypoint (e.g., `@trpc/client/links/localLink`), maintaining consistency with other links.
- **Verification:** Added a unit test to verify the `ssrLink` alias and confirmed that all 10 unit tests for `localLink` are passing. Verified that `@trpc/server` now builds successfully.

### Next Steps
The build failure blocking CI has been resolved. The next round should verify that the acceptance tests are now green in CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ssrLink alias and entrypoints","tdd_next":"acceptance green"}}