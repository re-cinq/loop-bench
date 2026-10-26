Branch is up to date. The push landed successfully.

**What was fixed in this round:**

1. **`re-lint/no-duplicate-code`** in `conversationList.acceptance.test.ts`: Extracted `baseConfig` (shared server config) and `launch` (start/push/return URL) helpers, reducing `startEngine` and `startEngineWithHistory` to single-line wrappers.

2. **`re-lint/max-member-chain`** in `wsTestSupport.ts`: Introduced `const wsClients = hal.wss.clients` to reduce the 3-hop `hal.wss.clients.size` chain to a 1-hop `wsClients.size`.

3. **`re-lint/require-spec-link`** for two tests: The refactoring moved tests to new line numbers (L83, L124, L172); the spec links in `specs/hal-engine-conversation-list/spec.md` were updated to match (from L82, L123, L173). The session-resume spec now points to L402 for the "still types a connected frame literal" test (was L407).

4. **`spec-names`** failures: All 25 `sessionResume.test.ts` links in `specs/hal-engine-session-resume/spec.md` were off by +5 lines; corrected by subtracting 5 from each.

**Unrelated smell noticed (not acted on):** The `wsTestSupport.ts` has a global `servers` and `clients` array alongside the per-test `serverList`/`clientList` parameter pattern in `terminateAll`, which is a mismatch — but left alone per the rules.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all CI eslint and spec-names failures","tdd_next":"acceptance green"}}