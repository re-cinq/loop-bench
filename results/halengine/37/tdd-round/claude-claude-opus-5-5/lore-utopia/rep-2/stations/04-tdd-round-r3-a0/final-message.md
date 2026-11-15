This round fixed the lint error CI flagged and made enum rejections name the allowed values. It's committed and pushed as `76f01a5` on `loop-bench/37`. Merging `origin/main` brought in nothing new, and the branch is level with its upstream.

**CI finding fixed:** the last build failed on one eslint error, `re-lint/callee-below-caller` at `registry.ts:66`. I moved `fieldPath` below `describeSchemaError`. I didn't run lint here, so the next CI run confirms it.

**Red-green-refactor (the enum facet):**
- **Red:** a new test in `src/orchestration/tools/registry.test.ts:59` gives an off-enum value, `'jane.doe@example.com'`. It expects the executor never to run and the result to read `'unit' must be one of: celsius, fahrenheit`. It failed as expected, because ajv's default wording ("must be equal to one of the allowed values") came back instead.
- **Green:** `describeSchemaError` now handles the `enum` keyword and builds the message from ajv's `params.allowedValues`, which ajv 6 and 8 both provide. The offending value is never included. The file's 4 tests pass when I run it on its own.
- **Refactor:** nothing needed.

**Traceability:** I added an enum statement to `specs/hal-engine-tool-input-validation/spec.md` with a link to the new test at `#L59`. This repo has no `reanchor.mjs`, so I checked the other `#L` links on that spec by hand and they all still point at the right lines. The spec stays at `In Progress`. In `.lore/dod.md` I ticked the enum and lint facets and added the next one: valid input with an extra property reaches the executor unchanged, exactly once.

**Red tests:** 1 was mine (the enum test, now green), and 0 were regressions. The last CI verdict reported only the lint error, no failing tests. I didn't run the acceptance tests, the full suite, lint or the typechecker here.

**Unrelated smell, not acted on:** `npx jest` on a single file fails with an ESM error. You have to run it through `node --experimental-vm-modules`, as `npm test` does.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Enum rejection names the path and allowed values without the offending value; fixed CI eslint callee-below-caller","tdd_next":"Valid input with an unlisted extra property reaches the executor unchanged, exactly once"}}