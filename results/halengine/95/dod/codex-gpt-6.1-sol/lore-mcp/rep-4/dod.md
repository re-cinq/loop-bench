# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — Both public orchestrator entry points reach the same catch block. A real lifecycle hook rejects with each value before a real Bedrock provider is invoked, so the contract needs neither test doubles nor network access.

## Done when these pass

- [ ] **reports every rejection once as an Error while preserving the original caller rejection** — String, object and undefined rejections each reach onError once as an Error with the identical cause; existing Errors retain identity, the session is preserved, and both caller entry points reject with the original value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the Error-only gate and normalize only the value sent to onError, preserving the original rethrow.
- [ ] Keep existing Error-provider tests unedited and passing; the new acceptance test also pins Error identity.
- [x] Replace the recorded flaw in the config-hooks spec with the linked guarantee.
- [ ] Add a CHANGELOG entry describing the new notifications for existing consumers.
- [ ] Pass the repository CI checks, including build, tests, typecheck, ESLint and Prettier.

## Out of scope

- beforeSession placement and usage accounting across tool rounds.
- Changes to provider implementations or to the shape of caller rejections.