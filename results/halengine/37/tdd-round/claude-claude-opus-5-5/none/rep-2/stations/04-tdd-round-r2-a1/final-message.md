I closed the function-valued schema facet this round. It's committed and pushed to `loop-bench/37`, which is level with its upstream and already contains `origin/main`.

**CI failures in the brief:** TS2693 and "no export named 'Ajv'" were reported on 737a72e. The previous round's b392994 fixed them by default-importing ajv, and that commit was already pushed. Here `registry.test.ts` now loads ajv under jest ESM. The 15-minute test timeout in that same build has no stated cause in the brief. CI on this push will show whether it comes back.

**Red:** I added a test in `src/orchestration/tools/registry.test.ts:74`. A tool whose definition comes from a function returns a new schema on each call, with the same `$id`, and its required field changes between calls. It failed on the second call: ajv threw "schema with key or id already exists", which the registry passed on as an error.

**Green:** in `src/orchestration/tools/registry.ts`, the registry now keeps one compiled validator per schema object in a `WeakMap`. It also sets `addUsedSchema: false` so a schema's `$id` isn't stored registry-wide. The new test now passes along with the 3 existing ones in that file (4/4).

**Bookkeeping:** I linked the statement in `specs/hal-engine-tool-input-validation/spec.md` to the new test by hand at `#L74`, because this repo has no `reanchor.mjs`. The existing links didn't move, since the test went at the end of the file. I ticked the facet in `.lore/dod.md` and added a new unchecked one for the remaining checks that already pass but need tests (extra properties, unknown tool, orchestrator retry), plus the docs and the version bump. Prettier also re-indented the acceptance-test path lines in `dod.md`.

**Red tests:** 1 of mine, now green, and 0 regressions as far as I can tell. I can't confirm against the CI that ran 737a72e, because it never got past loading ajv.

**Not run here:** acceptance tests, the full suite, lint and typecheck, as instructed.

**Smells I noticed but didn't touch:**
- `get()` and `getDefinitions()` call function-valued sources again on every call.
- An invalid schema returned by a function is only caught during `execute`, which throws instead of returning a rejection result.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap), validating against the schema current at each call","tdd_next":"A static tool's schema is compiled once across ten execute calls (pinned by a test)"}}