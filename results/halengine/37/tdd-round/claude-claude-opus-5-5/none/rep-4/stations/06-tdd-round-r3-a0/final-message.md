I added one test this round and pushed it as `45c4fd6`. The branch's CI was already red before this round, and I fixed none of the three failures it reported.

**This round's test**
- **What it checks:** `validates a function-valued tool against the schema it returns for each call` in `src/orchestration/tools/registry.test.ts:71`. A tool's definition function first returns a schema requiring `location`, then one requiring `city`. The second call with `{location}` must be rejected with a message naming `city`, and the tool itself must run only once.
- **It passed on its first proper run.** The cache added in an earlier round already gives this behaviour, so this round needed no production code. It protects that behaviour: a stale cached schema would let the second call through and fail the test. My first version did fail, but because of a mistake in the test, not the code: `register` calls the definition function once to read the tool's name, which threw off my call counter.
- **Tests run:** only `registry.test.ts`, with 6 of 6 passing. I did not run the acceptance tests.
- **Spec:** I linked the statement in `specs/hal-engine-tool-input-validation/spec.md` to the new test, and corrected the two existing line links that the insertion shifted (to L89 and L106).
- **Checklist:** I ticked this facet in `.lore/dod.md` and split "`Unknown tool: <name>` still throws" into its own open facet.
- **Delivery:** formatted with prettier, pushed, and merged `origin/main` (nothing new there). The branch is not ahead of its upstream.

**Why CI is still red (verdict on `f050e665`)**
- **typecheck and test:** both show CI loading `ajv` 6 at the root, which only exists here as eslint's own nested copy. Locally `npm ls ajv` shows 8.20.0 at the root, the lockfile pins it there, and the test file passes. I could not reproduce the problem from the code, so I left the import alone; the existing open facet in `.lore/dod.md` already tracks this as a CI install question.
- **eslint:** both findings are in `registry.acceptance.test.ts` (lines 141 and 143). Rounds may not edit acceptance tests, so the test's author has to fix those.
- **Count:** none of the red tests are mine and none are regressions I caused. Every failure comes from the `ajv` resolution or the acceptance-test lint findings.

**Smells I noticed but did not touch:** `register` calls a function-valued definition just to read its name, so the function runs one extra time; that is what tripped my first test. Caching the name, or having the caller pass it, would avoid the extra call.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pin in registry.test.ts: a function-valued schema that differs between calls is validated against the current one","tdd_next":"Pin in registry.test.ts: Unknown tool: <name> still throws"}}