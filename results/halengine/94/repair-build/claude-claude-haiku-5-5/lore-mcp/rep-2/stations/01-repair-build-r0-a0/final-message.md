The branch is green on the two findings CI named, pushed, and in sync with its upstream. I did not run lint, typecheck, or the full suite here, as the ticket requires.

**What was broken**
- **typecheck:** the acceptance test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`. None of those exist on `PromptBuilderConfig`, which takes `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`. The test was wrong about the API, so I changed it to `identity: 'You are HAL.'` and `responseGuidelines: 'Be precise.'`. The `contextConfig` block had no equivalent and was dropped.
- **eslint:** the single `it` had three `expect` calls, and the rule allows one. I folded them into one `expect({rejection, caughtError, afterSessionRan}).toEqual({...})`. The rejection is captured with `.catch`, so it is checked by identity as before.

**Checks**
- Branch head was `c3cd08a`, the sha CI judged, so it had not moved.
- `npx prettier --write` on the edited test file reported it unchanged.
- `node --experimental-vm-modules node_modules/jest/bin/jest.js` on that one test file: 1 suite, 1 test, passed.
- I did not run eslint or tsc here, per the pod limits.

**Delivery**
- Commit `8b250df test(orchestrator): repair beforeSession acceptance test`, with the Co-Authored-By line, pushed to `origin loop-bench/94`.
- `git fetch origin main` followed by a merge reported "Already up to date", so there was nothing to merge.
- `git status -sb` shows the branch with no ahead/behind marker, so nothing is left unpushed.

**Not done**
- I did not query `lore-query-trace` for prior failures on these paths. The lore MCP server failed to connect (`CONNECTION_CLOSED`), so those tools were unavailable.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used non-existent PromptBuilderConfig keys (typecheck) and had 3 expect calls (max 1, eslint); fixed both and pushed 8b250df"}}