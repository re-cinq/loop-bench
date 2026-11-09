The round is delivered and pushed. Summary:

**What CI demanded (round brief):** two eslint errors on `src/types/messages.test.ts` from the previous round's fixture — `re-lint/test-imports-its-subject` (the file's only import was `import type`, erased at runtime, so the test loaded nothing real) and `re-lint/max-expects` (two `expect` calls in one test). Both were my previous round's, zero regressions.

**The repair** (`src/types/messages.test.ts`, no new test — the diff is the deliverable):
- The fixture now value-imports `ErrorCodes` from `./messages.js` (the module's one runtime export, re-exported from `session.ts`) and the `error` frame uses `ErrorCodes.SERVER_ERROR` instead of the string literal — so the pin genuinely loads the subject it pins, not just a copy of its types.
- The two expects became one object assertion (`{frameTypes, brokenType}` `.toEqual({...})`), the shape the rule's message prescribes.
- The `it` kept its title and its line 26, so § 3's `([validated by ...](../../src/types/messages.test.ts#L26))` citation still lands inside the test's span — no re-anchoring, `spec:names` unaffected.

**Verification here:** the one test file I changed ran green (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/types/messages.test.ts`, 1 passed); prettier over the changed file reports it unchanged. No acceptance test, full suite, lint, typecheck, or build was run — CI judges those.

**Bookkeeping:** `.lore/dod.md`'s fixture facet now records the repair; the open facet (the `transport.history`/`UNSUPPORTED`/`StoreCannotList` decision) stays unchecked — it rewrites the three recorded acceptance tests and is the ticket owner's call, not a repair round's.

**Delivery:** committed as `d103f42` and pushed; the branch is in sync with `origin/loop-bench/144`, and `origin/main` is already contained in it (no merge needed, nothing to resolve).

Smells noticed, not acted on: the bare `npx jest` invocation fails on this repo's ESM suite without `--experimental-vm-modules`, which also makes the `lore-run-test.mjs` wrapper's `npx jest` call suspect; and `package.json` still reads `0.5.0` with no MINOR bump yet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"eslint repair of src/types/messages.test.ts — real subject import plus single object assertion","tdd_next":"settle the transport.history/UNSUPPORTED/StoreCannotList decision (ticket owner), else CI's verdict on this push"}}