This round fixed the two eslint findings from CI and pushed. I ran no tests, lint or typecheck here. CI judges the push.

- **Findings fixed:** the findings were in `src/orchestration/tools/registry.acceptance.test.ts`, lines 141 (`prefer-early-return`) and 143 (`max-member-chain`).
  - Round 3 of the stub provider now returns early, so the round-2 code runs flat.
  - `lastMessage.content[0]?.content` became a destructure of `lastMessage.content`.
  - The stub's behaviour and the assertions are unchanged.
  - I'm treating this as a lint repair rather than editing the test to make it pass.
- **Dod:** `.lore/dod.md` has the "Repair 3" item ticked.
- **Push state:** the commit is pushed, `origin/main` was already merged in, and the branch is level with its upstream.
- **Red tests:** none were mine and there were no regressions. CI's only failure was eslint.
- **Still open:** the remaining facet is the unit tests (`registry.test.ts`, `chatOrchestrator.test.ts`) with spec links, plus the docs, README, `.specify/spec.md`, example and ADR-002 updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI eslint findings in registry.acceptance.test.ts (behaviour-preserving restructure)","tdd_next":"registry/orchestrator unit tests with spec links, docs, README, .specify/spec.md, example, ADR-002"}}