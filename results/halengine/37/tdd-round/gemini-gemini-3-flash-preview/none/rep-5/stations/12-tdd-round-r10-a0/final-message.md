I fixed the CI failures that were blocking the completion of ticket #37. The failures were caused by an incorrect `Ajv` import for ESM (using a named export `{ Ajv }` that wasn't provided in the runtime environment) and a TypeScript error on `ErrorObject.instancePath` (likely due to a type conflict between Ajv 6 and 8).

I updated `src/orchestration/tools/registry.ts` to use the correct default import for `Ajv` and used a cast to bypass the `instancePath` type error, ensuring compatibility with Ajv 8's runtime behavior. I verified the fix by running the unit tests (`registry.test.ts`), acceptance tests (`registry.acceptance.test.ts`), and configuration tests (`config.test.ts`), all of which now pass locally. I also finalized `CHANGELOG.md` by moving the `Unreleased` entries into a new `[0.4.0]` section and fixing the release links.

All facets in `.lore/dod.md` are checked off, and the branch has been synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}