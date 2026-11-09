# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real lifecycle through the async stream implementation. Install real hook callbacks and use the shipped local provider; no test doubles or production edits are needed.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — setup failure reaches `onError` with the identical session and error, then awaits `afterSession` with the same session, and rejects with the identical error without entering user-input or model-response hooks.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move setup inside the lifecycle error/cleanup boundary so the acceptance test passes, preserving the existing success-path tests unedited.
- [ ] Retain the spec's failed-setup guarantee: cleanup runs after partial or absent allocation, with no new started flag; remove the temporary note about the red acceptance test once implemented.
- [ ] Add a consumer-facing CHANGELOG entry explaining that setup failures now invoke error reporting and cleanup.

## Out of scope

- Non-Error rejection handling and usage accounting across tool rounds (HALEngine#93).
- Changes to hook signatures, cleanup-hook failure precedence, or successful turn behavior.
- The current Lore list adapter emits only `id`, `name`, and `file`, with no spec metadata parser. The test carries `@spec specs/hal-engine-config-hooks/spec.md#7` and the spec links to its declaration; adding descriptor support would require a separate tooling change.