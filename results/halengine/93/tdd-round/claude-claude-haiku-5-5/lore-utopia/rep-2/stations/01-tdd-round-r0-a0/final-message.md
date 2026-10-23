The round is pushed. The branch is up to date with `origin/loop-bench/93`, and the merge with `origin/main` needed nothing.

**What I did (one round, facet 2: sum each token field for reporting rounds)**
- **Red:** added an `addUsage` block to `src/orchestration/orchestratorHelpers.test.ts` covering sum, a silent round, the first report, and no reports at all. It failed because `addUsage` did not exist.
- **Green:** added `addUsage` to `orchestratorHelpers.ts`. It returns `undefined` only when neither side reported. In `chatOrchestrator.ts` the line `lastUsage = outcome.usage ?? lastUsage` now reads `lastUsage = addUsage(lastUsage, outcome.usage)`.
- **Refactor:** Prettier rewrapped the new signature. I made no other changes.
- **Ticked** the facet in `.lore/dod.md`.
- Commit `feat(orchestrator): sum usage across tool rounds`.

**Test results**
- My test file passes: 8 of 8, run with `node --experimental-vm-modules node_modules/jest/bin/jest.js <file>`, the same flag `npm test` uses. The repo runs Jest, not Vitest as the brief said.
- I did not run the acceptance file `chatOrchestratorUsage.acceptance.test.ts`, nor the existing `chatOrchestrator.test.ts` guard, because the rules say to run only this round's file. CI will say whether the acceptance tests are green. By reading the code, both acceptance tests should now pass.
- Red tests this round: 0 of mine, 0 regressions.
- The lore trace could not be run: the API returned 403 because the token lacks `read` scope. I checked coverage by grepping instead.

**Still open in `.lore/dod.md`**
- The type-contract facet. The hook's public type is still `UsageMetadata`, so it does not yet say the value is a turn total. A name such as `TurnUsage` would make that explicit.
- The CHANGELOG entry stating the change for existing consumers.
- `specs/hal-engine-config-hooks/spec.md` already describes the summed behaviour, citing the acceptance test. I did not check its Status header.

I did not run lint, typecheck, or build here, per the brief.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum each token field only for provider rounds that report usage","tdd_next":"replace final-round retention with a named total-usage type contract"}}