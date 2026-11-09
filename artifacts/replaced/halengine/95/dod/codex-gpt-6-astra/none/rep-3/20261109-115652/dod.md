# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — Both public orchestrator methods expose the catch path. A real Bedrock provider reads a throwing lazy configuration value before any network request, producing real string, object, undefined, and Error rejections without mocks or stubs.

## Done when these pass

- [ ] **reports every provider rejection once without changing the caller rejection** — For both public entry points, report each rejection exactly once with the same session, wrap non-Errors with their original cause (including an own undefined cause), preserve existing Error identity, and preserve the caller's original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error values for onError, preserving their cause; rethrow the original value.
- [ ] Keep existing Error handling and existing tests unedited; the acceptance test additionally checks identity.
- [ ] Deliver the new guarantee in the config-hooks spec and document the consumer-visible change in CHANGELOG.md.
- [ ] Pass the ticket's build, test, typecheck, ESLint and Prettier gates in CI.

## Out of scope

- beforeSession try placement and usage accounting across tool rounds (#93).
- Hook failures that replace the original rejection, provider retry policy, and external service integration.
- Changing the Lore descriptor adapter: it currently emits only id, name and file; the test stamps spec anchor specs/hal-engine-config-hooks/spec.md#9 and the spec carries its validating link.