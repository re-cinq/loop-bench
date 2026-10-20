I've completed a round of red-green-refactor to address CI failures and add the requested `ssrLink` alias.

### Changes Made:
- **Fixed Build:** Modified `scripts/getRollupConfig.ts` to correctly pass the `externalPackages` parameter to the Rollup build functions. This resolved a build failure in `@trpc/server` where `next/navigation` was incorrectly treated as an internal dependency.
- **Fixed Lint:** Removed an unused `promise` variable in `packages/client/src/links/localLink.ts` that was causing a lint error in CI.
- **Added `ssrLink`:** Implemented `ssrLink` and `SSRLinkOptions` as aliases for `localLink` in `packages/client/src/links/localLink.ts`, fulfilling the requirement from the ticket title.
- **Verified Correctness:** Added a test case in `packages/client/src/links/localLink.test.ts` to confirm the `ssrLink` alias is correctly exported and functional. All 9 tests for `localLink` now pass.
- **Updated DoD:** Added and ticked the facet for `ssrLink` export in `.lore/dod.md`.

### Unrelated Smells Identified:
- `packages/server` has `tslib` in `devDependencies` and explicitly sets `importHelpers: false` in its `tsconfig.build.json`. While this seems to be a workaround for `await using` syntax support in the current environment, it might be cleaner to rely on a consistent root `tsconfig` or correctly managed runtime dependencies if helpers are needed. I've left these as-is to stay within the round's scope after verifying the build passes with them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Export ssrLink as an alias for localLink","tdd_next":"acceptance green"}}