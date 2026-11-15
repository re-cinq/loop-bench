This round fixed the eslint finding and pushed it, but only partly cleared CI's red build. I can't explain the typecheck and test failures from this pod.

**What CI reported on c948748:**
1. **eslint** `registry.test.ts:35`: `executor.mock.calls.length` was three member hops deep, over the `re-lint/max-member-chain` limit of two. **Fixed.** The test now checks `expect(executor).not.toHaveBeenCalled()` and matches the result text separately. I ran that one file locally and its 2 tests pass. The test's line didn't move, so the spec's `#L28` link is still right.
2. **typecheck** (`'Ajv' only refers to a type`, no `instancePath` on `ErrorObject`) **and test** (`ajv does not provide an export named 'Ajv'`): **not fixed.** Both errors mean CI loaded ajv 6 at the top of `node_modules`. That doesn't match this branch:
   - The pushed `package-lock.json` pins `node_modules/ajv` to 8.20.0; ajv 6.15.0 appears only inside eslint's own folder.
   - A clean `npm ci --ignore-scripts` from the pushed `package.json` and lockfile, in a temp directory with npm 10.9.8, put ajv 8.20.0 at the top level, and `npm ls ajv` agrees.
   - `origin/main` hasn't moved, so the version CI tests (this branch merged with main) has the same lockfile.
   - CI's typecheck step runs straight after `npm ci`, so nothing in between swaps the package.

   My guess is a stale install on CI's side, not a code problem. I couldn't confirm it: `lore_get_ci_failures` returned "branch not found". I left the code alone and wrote this down in `.lore/dod.md`. The next round should read CI's verdict on this push before changing anything.

**Red tests:** all four failing suites in the verdict (the acceptance test, `registry.test.ts`, `config.test.ts`, `chatOrchestrator.test.ts`) fail on that same ajv import. None comes from a wrong assertion. `registry.test.ts` and the acceptance file are this ticket's, so 2 are ours. The other 2 (`config.test.ts`, `chatOrchestrator.test.ts`) existed before the branch and fail only because they load the registry, so they count as regressions. They should clear once CI resolves ajv 8.

**Delivery:** I ran prettier, committed and pushed. Merging `origin/main` brought in nothing new, and `git status` shows the branch is not ahead of its upstream. Per the brief, I did not run lint, typecheck or a build here.

**Something I noticed and left alone:** the `ToolRegistry.get` signature lets a caller reach `execute` directly and skip validation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI eslint re-lint/max-member-chain in registry.test.ts:35; confirmed pushed lockfile installs ajv 8.20.0 at root","tdd_next":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap)"}}