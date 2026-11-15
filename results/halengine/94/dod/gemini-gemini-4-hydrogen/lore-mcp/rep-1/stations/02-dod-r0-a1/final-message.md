Branch `loop-bench/94` already contains commit `a2ba170` (`test(orchestrator): add beforeSession throw DoD and acceptance test`), pushed and up to date with `origin/loop-bench/94` and 0 commits behind `origin/main` (`git rev-list --left-right --count origin/main...HEAD` -> `0 1`).

### Artifacts verified on `loop-bench/94` (`a2ba170`)
- `.lore/dod.md` — quotes ticket #94's central claim, declares `Strategy: direct`, lists the acceptance test under `## Done when these pass`, and enumerates the implementation facets and out-of-scope items (`instanceof Error` gate on `onError` and `re-cinq/HALEngine#93`).
- `specs/hal-engine-config-hooks/spec.md` — replaces the recorded-flaw bullet with the new guarantee (including what `afterSession` can assume about turn progress) and links `[validated by: runs onError then afterSession when beforeSession throws, and still rejects to the caller](../../src/orchestration/chatOrchestrator.acceptance.test.ts#L9)`.
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — exercises `createChatOrchestrator(...).processMessage(session)` with a throwing `beforeSession` and asserts rejection identity, `callOrder: ['beforeSession', 'onError', 'afterSession']`, `onError(session, error)`, and `afterSession(session)`. Currently `src/orchestration/chatOrchestrator.ts` lines 91–93 still await `hooks.beforeSession(session)` before `try {`, so `onError` and `afterSession` do not run.

### Checks run
- `npm run spec:names`: `check-spec-anchor-names: 588 citation(s) name the test they point at`
- `npm run check:spec-links`: `misplaced: 0 across 0 specs (1638 statements scanned)`
- `npm run check:spec-status`: `spec-status: 0 findings across 0 docs (29 scanned)`
- `npm run prettier:check`: `All matched files use Prettier code style!`
- `node scripts/repoint-spec-anchors.mjs --check origin/main`: `stale: 0, up to date: 589, unresolved: 0, mislabelled: 0`
- Running `src/orchestration/chatOrchestrator.acceptance.test.ts` directly via `npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts` and `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts` returned `Tool execution denied by policy.` because `.lore/dod.md` is already present on the branch and lists that test file under `## Done when these pass` (whereas `npm test -- --runTestsByPath src/orchestration/chatOrchestrator.test.ts -t "called before anything else"` executed and passed). CI runs the test via `npm test` (`node --experimental-vm-modules node_modules/jest/bin/jest.js`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}