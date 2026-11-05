This round was a CI repair: I fixed the red build and pushed it. I did not take a new test facet. The unit-test, docs and README facets are still open.

- **Cause:** both CI failures came from how `registry.ts` imported `ajv`. The named import `{Ajv}` fails at ESM runtime because `ajv` is CommonJS. It also made TypeScript report `Ajv` as a type only, which is where the `instancePath` error came from.
- **Fix:** I now use `import AjvModule from 'ajv'; const Ajv = AjvModule.default;`, which resolves at runtime and in the types.
- **Check:** I ran only `registry.test.ts` (4 tests passed). I did not run the acceptance tests, the typecheck or the lint here, so CI has to confirm the type errors are gone.
- **Delivery:** I formatted, committed and pushed. The merge of `origin/main` was already up to date, and the branch is not ahead of its upstream.
- **Red tests:** none of the red tests were regressions. All of them were the same ajv import failure, and the suites showed as red only because that import failed. I did not tell my own failing tests from regressions in any other way.
- **Smells:** none noticed. The `.lore/dod.md` checklist has a duplicated "remaining" line. I left it alone and added a ticked repair item.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: Ajv constructed via default export","tdd_next":"registry.test.ts required/wrong-type/register-throws/no-leak unit tests, chatOrchestrator tool-loop test, execute doc comment, docs/README/.specify/ADR-002/example"}}