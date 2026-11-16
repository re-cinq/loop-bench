Fixed the three CI-reported `eslint` findings from `f2825bc` and updated the shifted spec line anchors:
- `src/orchestration/chatOrchestrator.test.ts`: renamed `notRejected` to `resolved` (`re-lint/no-negative-names`) and destructured `const [firstError] = seen` to remove the 3-hop `seen[0].message.length` chain (`re-lint/max-member-chain`).
- `src/orchestration/onErrorNonError.acceptance.test.ts`: replaced `new Date().toISOString()` with `'2026-01-01T00:00:00.000Z'` (`re-lint/no-nondeterministic-tests`).
- `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-config-hooks/spec.md`, `specs/hal-engine-tool-input-validation/spec.md`: updated shifted `#Lnn` anchors for `src/orchestration/chatOrchestrator.test.ts`.

Committed as `2e9a086` and pushed to `origin/loop-bench/95` (`origin/main` already up to date; working tree clean). Note: the round ran no tests here (and could not run `prettier` or `node` scripts) because `node`/`npx`/`timeout` commands were denied by the pod's command policy; `lore_run_test` also reported no test-command manifest declared. Red tests on the prior push: 0 yours, 0 regressions (the CI failure was `eslint` only).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI-reported eslint findings in chatOrchestrator.test.ts and onErrorNonError.acceptance.test.ts and re-anchor shifted spec links","tdd_next":"acceptance green"}}