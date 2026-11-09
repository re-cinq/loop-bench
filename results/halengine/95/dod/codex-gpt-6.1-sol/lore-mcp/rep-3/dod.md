# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The public orchestrator and real lifecycle hooks expose the shared catch directly. A rejecting beforeModelResponse hook exercises it without a provider double; the real Bedrock provider is constructed but never called.

## Done when these pass

- [ ] **reports every rejection as an Error while preserving the original caller rejection** — String, object and undefined rejections notify once with an Error and the original cause; Error instances and caller rejection identities are preserved.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the instanceof gate, normalize only the hook argument and rethrow the original value.
- [ ] Keep existing Error-path tests unedited; the acceptance test also checks Error identity.
- [ ] Keep the new spec guarantee and add a consumer-facing CHANGELOG entry describing newly reported non-Error failures.
- [ ] Let CI verify the existing suite, build, typecheck, lint and formatting after implementation.

## Out of scope

- Moving beforeSession or changing usage accounting across tool rounds.
- Hook failures replacing an in-flight rejection or provider-specific error conversion.