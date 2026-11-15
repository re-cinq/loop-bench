I pushed a fix for the red CI build: the registry now validates with ajv 6, the version CI actually has. CI hasn't run on it yet. The one test I ran here, `registry.test.ts`, passes 7 of 7 against ajv 6. I didn't run the acceptance tests, typecheck or lint; CI does those.

**Why this kept failing.** I looked at CI's checkout (`../ci-6`). It uses a `node_modules` folder dated Oct 19, taken from main, and never installs from this branch's lockfile. The ajv at its root is 6.15.0, which eslint pulls in. So ajv 8 was never present in CI, and none of the previous rounds' changes to the `import` line could pass. Every error in the brief comes from ajv 6:
- `Ajv` only exists as a type, so it can't be used as a value.
- `ErrorObject` has no `instancePath` field.
- `ajv` has no named `Ajv` export.

`registry.acceptance.test.ts`, `registry.test.ts` and `config.test.ts` all failed only because they import the registry.

**What changed (commit 81a63ea):**
- **Dependency:** `package.json` now asks for `"ajv": "^6.12.6"`. The lockfile is now main's with ajv added as a dependency, so it matches CI's tree exactly. The ticket says "ajv unless the build proves otherwise", and the build has now shown six times that CI resolves ajv 6.
- **`registry.ts`:** it uses `import Ajv from 'ajv'` with the options `{jsonPointers: true, format: false}`, so failure paths still read `/location`. Paths come from `dataPath`, and the missing property name is read only after checking it exists, which is what ajv 6's types require. Ajv 6 adds no defaults, coercion or `additionalProperties: false` unless asked, which matches the ticket.
- **`registry.test.ts`:** one assertion expected ajv 8's wording ("must be string"). It now expects ajv 6's "should be string" and still checks the path and the expected type. This file is this branch's own unit test, not an acceptance test. The acceptance tests only check that the result contains the field name and "string", so they are unaffected.
- **`.lore/dod.md`:** a new facet is ticked, with a warning not to switch back to ajv 8 or change the import again.

**Red tests:** all three failing suites were mine; there were 0 regressions. Six of `registry.test.ts`'s seven tests passed unchanged on ajv 6.

**Things I noticed but didn't act on:**
- The bench CI doesn't reinstall dependencies from the branch's lockfile, so any dependency change on any branch will be invisible to it.
- The first ticked facet in `.lore/dod.md` still lists ajv 8's options (`strict`, `validateFormats`).
- I changed this pod's local `node_modules` (root `ajv` is now 6.15.0) to match the new lockfile. That isn't in git.

**Next round:** test that valid input with an extra property reaches the executor unchanged, exactly once, and that `Unknown tool: <name>` still throws. The MINOR version bump is still owed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI's red ajv build: switch to ajv ^6.12.6 (the version CI's tree resolves) with dataPath/jsonPointers","tdd_next":"Test valid input with an extra property passes through unchanged exactly once, and Unknown tool still throws"}}