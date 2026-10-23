The two CI findings are fixed and pushed to `loop-bench/94` as `a152621`. CI has not re-judged the new head yet.

- **Typecheck** (`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts:30`): the test passed `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig` to `PromptBuilder`, none of which exist on `PromptBuilderConfig`. I changed the config to `identity: 'You are HAL.'` and `responseGuidelines: 'Be precise.'`. `responseGuidelines` is the closest match for the old suffix. The test never asserts on the prompt text, so this doesn't change what it checks.
- **ESLint** (`:40`, `re-lint/max-expects`): the test had three `expect` calls. I moved the rejection into a value via `.then(() => undefined, (error) => error)` and made one `expect` on `{rejection, caughtError, afterSessionRan}`. The rejection is still checked by identity, so it still reaches the caller unchanged.

Verification:
- `npx prettier --write` on the changed test file: unchanged.
- `node --experimental-vm-modules node_modules/jest/bin/jest.js <that file> --coverage=false`: 1 passed, 1 total. This is the project's own test command, run on this one file.
- I did not run eslint or typecheck locally, per the pod rules. CI will judge both on the push.

Other notes:
- The branch had not moved past the judged sha (c3cd08a), so I did not take the early-exit path.
- `origin/main` was already an ancestor of the branch, so the merge step needed nothing.
- The lore MCP server failed to connect (`CONNECTION_CLOSED`), so I could not run `lore-query-trace` for prior failures on these paths. The fix is based on the CI verdict and the file contents alone.
- I did not touch the spec or CHANGELOG. The round brief names only the two findings above, and the ticket's behaviour change was already in c3cd08a.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used non-existent PromptBuilder config keys and had 3 expects (max 1); fixed both and the single test file passes locally"}}