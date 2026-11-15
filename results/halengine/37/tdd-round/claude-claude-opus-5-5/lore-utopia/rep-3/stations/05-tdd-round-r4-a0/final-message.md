I fixed both CI failures from the last push and closed one facet: a wrong-typed field is now rejected, and the rejection is logged without the field's value. The commit is pushed to `loop-bench/37` and is level with its upstream. It was already up to date with `origin/main`, so the merge changed nothing.

**CI fix (both red checks had one cause).** The `ajv` import has changed in each of the last three rounds. Last round's note said the named `Ajv` export doesn't exist at runtime; that was wrong. ajv's package sets `module.exports.Ajv`, so Node ESM sees the named export. I checked that directly here, and jest sees it too (the registry tests pass). The type file also declares `export declare class Ajv`, so `import {Ajv} from 'ajv'` should pass the typecheck. I couldn't confirm that here (no typechecking in this pod); CI's typecheck on this push will. I recorded the reasoning in `.lore/dod.md` so the next round doesn't change it again.

**Facet closed.** The red test I added to `registry.test.ts` (line 113) registers a tool and calls it with a number where a string is required. It checks that the executor never runs and the result says `/location must be string`. It also checks that exactly one warning is logged, `input rejected`, carrying `{path: '/location', keyword: 'type'}`, and that neither the result nor the log contains the number. It failed first because no rejection log existed. The fix is two lines in `ToolRegistry.execute`: on a rejection, log the path and failed rule for each failure, never the value. All 6 tests in the file now pass.

**Traceability.** The spec statement on wrong-typed input in `specs/hal-engine-tool-input-validation/spec.md` now cites the new test. The new import line shifted every test below it by one, and the repo has no `reanchor.mjs`, so I updated the five existing `registry.test.ts#L` links by hand.

**Red tests:** two were mine (the new test, now green, and the CI build break from the last round's import, now fixed). There were no regressions.

**`.lore/dod.md`:** I ticked this facet and added a new one. A rejection for a missing required field logs `path: ''`, so the log doesn't name the property. It should use ajv's `params.missingProperty`, which is a key name, not a value.

**Left alone:**
- The MINOR version bump (0.3.0 → 0.4.0) is still an open facet.
- Ajv's error text uses `input` as the root name, giving messages like "input/location must be string".

Tests ran: only `src/orchestration/tools/registry.test.ts`, with jest.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject a wrong-typed field naming path and expected type without echoing the value in result or logs (rejection warning log); fixed CI ajv import","tdd_next":"Name the missing property in a required-rejection's log entry (params.missingProperty)"}}