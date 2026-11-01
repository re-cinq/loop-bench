# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` drives the real streaming lifecycle. One test installs real lifecycle callbacks and a production Bedrock provider, which is never reached because initialization fails; no doubles or network calls are needed.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — pins callback order, argument identity, awaited cleanup of a partially acquired resource, unchanged rejection, and no user-input processing after failure.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move initialization into the existing protected lifecycle so the acceptance test passes without changing the error or hook signatures.
- [ ] Preserve existing successful-session tests unedited; CI runs the regression suite and required build, type, lint, and formatting checks.
- [ ] Honor the spec decision: cleanup runs after partial initialization and deployers track which resources were acquired.
- [ ] Add an Unreleased CHANGELOG entry explaining that existing consumers now receive error and cleanup callbacks on failed initialization.

## Out of scope

- Non-Error rejection handling and usage accounting across tool rounds.
- New hook arguments or an engine-provided initialization-status flag.
- The two remaining recorded flaws in the spec are explicitly outside #94, not acceptance work for this ticket.

The test stamps `specs/hal-engine-config-hooks/spec.md#7` and the statement links to its declaration. The current Lore list adapter emits only id, name, and file; it has no spec-descriptor support. Updating that shared adapter is outside this test-only change.