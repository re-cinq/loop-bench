Resolved the 3 ESLint findings reported by CI on the previous push:
- `src/orchestration/chatOrchestrator.test.ts`: extracted `toolResults` from `(tail as ToolResultMessage).content` (fixing `re-lint/max-member-chain`) and renamed `item` to `toolResult` (fixing `re-lint/no-vague-names`).
- `src/orchestration/tools/registry.test.ts`: renamed `data` to `logFields` in `appendLog` (fixing `re-lint/no-vague-names`).

0 red tests were mine and 0 were regressions (only ESLint failed in CI on the previous push; both modified test files passed locally). No unrelated smells were acted upon.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI eslint findings in src/orchestration/chatOrchestrator.test.ts and src/orchestration/tools/registry.test.ts","tdd_next":"acceptance green"}}