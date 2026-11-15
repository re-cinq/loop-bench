I fixed the two red CI checks (typecheck and test) and added the unit test for "a static tool's schema is compiled once across ten `execute` calls". The work is committed and pushed, and the branch is level with `origin/main` and its upstream.

**The CI failure.** Every suite that loads `src/orchestration/tools/registry.ts` failed on `import {Ajv} from 'ajv'`. ajv is a CommonJS package: Node's ES-module loader can't see `Ajv` as a named export, and TypeScript treats that name as a type only. Round 2 had already used the right form and round 3 replaced it, so the import had been swapping back and forth. I put back the default import with `const Ajv = AjvModule.default`, and left a short comment explaining why. I checked that form two ways here before keeping it:
- The registry unit tests run against it.
- A tiny scratch file using the same import typechecks under the repo's module settings. That was not the project typecheck; CI's build is what confirms it.

No lint rule in `eslint.config.mjs` forbids the default form, so round 3's switch looks like a mistake rather than a fix for a lint finding.

**The test.** `src/orchestration/tools/registry.test.ts:86` passed on its first run, because round 2 had already made `register` compile the schema once. To show it can fail, I temporarily changed `execute` to recompile on every call: the test went red, and it went green again once I restored the code. It is cited from its statement in `specs/hal-engine-tool-input-validation/spec.md`. The repo has no reanchor script, so I checked all five `registry.test.ts` line links by hand and they match.

**Test results.** I ran only `registry.test.ts`: 5 of 5 pass. I did not run the acceptance tests; CI judges those on this push. Of the four suites CI reported red, all were caused by this branch's own ajv import, and none were existing tests broken by other code.

`.lore/dod.md` has this facet ticked and one new facet added: a unit test for rejecting a wrong-typed field. Still open: the MINOR version bump (0.3.0 → 0.4.0) and the docs, README, example and changelog updates. I didn't touch anything else I noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Static inputSchema compiled once across ten execute calls; fixed CI ajv import (default import + .default)","tdd_next":"Reject a wrong-typed field naming path and expected type without leaking the value (acceptance test 2)"}}