I fixed the ajv import that was behind the red typecheck and test jobs, and pushed it. This round wrote no new test. The facet is still open, and the build is not known to be green.

- **Fix:** `registry.ts` now imports `AjvModule from 'ajv'` and builds the validator with `new AjvModule.default(...)`. The named import `{Ajv}` failed typecheck because TypeScript sees `Ajv` there as a type only. It also failed at runtime because Node's ESM loader can't find a named `Ajv` export in the package. The `instancePath` typecheck error should clear with it, since it was a knock-on from the same line.
- **Test run:** `registry.test.ts` passes 3 of 3, run with `node --experimental-vm-modules`. I did not run typecheck or eslint, and the acceptance tests were left to CI. The import has gone back and forth between named and default over several earlier commits, so CI's typecheck on this push is the real check.
- **Tests that were red:** none were mine, and none were regressions. The CI test failures were suite-load errors from the import.
- **Still red, left alone:** two eslint errors in `registry.acceptance.test.ts` (`prefer-early-return` at line 141 and `max-member-chain` at line 143). I didn't touch them because I'm not allowed to edit acceptance tests. Someone needs to decide whether to relax the lint rule for that file or change the test.
- **Still to do:**
  - the ten-compile test and the no-leak test in `registry.test.ts`;
  - the `chatOrchestrator.test.ts` tool-loop test;
  - the docs, README and `.specify/spec.md` updates;
  - the spec links.
- **Delivery:** I updated the open facet in `.lore/dod.md`, merged `origin/main` (nothing to merge), and pushed. The branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix ajv default-import construction for typecheck and ESM runtime","tdd_next":"ten-compile and no-leak registry tests; chatOrchestrator tool-loop test; docs/README/.specify updates; acceptance-test eslint findings need owner decision"}}