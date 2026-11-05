This round only repaired CI's red build; I wrote no new test and closed no facet.

- **Fix:** `ajv` is a CommonJS package, so Jest's ESM loader found no named `Ajv` export, which is the "does not provide an export named 'Ajv'" test failure in the brief. I switched `src/orchestration/tools/registry.ts` to `import AjvModule from 'ajv'` and `new AjvModule.default(...)`. That addresses the four typecheck errors in the brief and the three failing suites, though I didn't run the typecheck or those suites here.
- **Local check:** `registry.test.ts`, the file I ran, passes 3 of 3. I did not run the acceptance tests, lint or `tsc`, as instructed.
- **Failures:** all the failures in the brief were this one import problem, none were regressions, and none were tests I wrote.
- **Delivery:** I formatted, committed and pushed. `origin/main` merged cleanly, and the branch is not ahead of its upstream.
- **dod.md:** I appended a note under Facets for the repair, and facet 4 stays unticked.
- **Next round (facet 4):** compile-once, dynamic-schema and no-leak-log tests, the `chatOrchestrator` retry-loop test, the spec links, and the docs, README, `.specify/spec.md`, ADR-002, example and CHANGELOG updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: Ajv default-import fix for ESM and typecheck","tdd_next":"compile-once, dynamic-schema and no-leak-log unit tests, chatOrchestrator retry-loop test, then spec links and docs/README/.specify/ADR-002/CHANGELOG"}}