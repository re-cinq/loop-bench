I have fixed the CI failures in `@trpc/server` and a bug in `localLink` transformer handling.

### Changes:
- **`@trpc/server`**: Added `tslib` to `devDependencies` and updated `tsconfig.build.json` to use `target: esnext`. This resolved the `TS2354: This syntax requires an imported helper but module 'tslib' cannot be found` error caused by the use of `await using` syntax.
- **`localLink`**: Fixed a bug where `transformResult` was called on raw procedure results without serialization. In `localLink.ts`, I updated the implementation to call `transformer.output.serialize(result)` before `transformResult`, and ensured that subscriptions also correctly handle serialization/deserialization for both tracked and untracked values.
- **Tests**: Added a new test case to `packages/client/src/links/localLink.test.ts` that verifies `localLink` works correctly with a non-identity transformer.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI failures and transformer handling","tdd_next":"acceptance green"}}