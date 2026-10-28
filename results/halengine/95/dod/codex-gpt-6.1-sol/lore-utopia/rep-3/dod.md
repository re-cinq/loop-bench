# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — Both public message entry points reach the existing shared catch. A real lifecycle hook rejects with each value before the installed Bedrock provider is reached, exercising that catch without a provider double or network access.

## Done when these pass

- [ ] **reports every rejection once as an Error while preserving the caller rejection** — String, object, and undefined rejections each notify once with an Error preserving the original cause; existing Errors retain identity, and both caller entry points retain the original rejection and session.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize only the value passed to onError; preserve existing Error identity and rethrow the original rejection.
- [ ] Pass the acceptance matrix through both message entry points; keep existing error tests unedited.
- [ ] Retain the linked replacement guarantee in the spec and add a consumer-facing CHANGELOG entry explaining the new notifications and cause.
- [ ] Pass the repository CI build, tests, typecheck, eslint, and formatting checks.

## Out of scope

- Changes to beforeSession placement, usage accounting, provider adapters, or errors thrown by onError itself.