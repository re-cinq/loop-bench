# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — Both public orchestrator methods reach the same catch. A real configured lifecycle hook rejects after the shipped mock provider completes, exercising that catch without mocking or stubbing a provider.

## Done when these pass

- [ ] **reports every rejection as an Error while preserving the original caller rejection** — String, plain object and undefined rejections notify once with an Error preserving cause; Error identity and original caller rejection survive both public entry points.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error rejections only for onError, preserving cause and leaving the original rethrow intact, including provider rejections through this same catch.
- [ ] Keep the existing Error-instance tests unedited and green.
- [ ] Implement the linked spec guarantee and document the consumer-visible change in CHANGELOG.md.
- [ ] Pass the repository CI checks for build, tests, types, lint and formatting.

## Out of scope

- Changes to beforeSession placement, usage accounting, hook-error precedence, or provider implementations.