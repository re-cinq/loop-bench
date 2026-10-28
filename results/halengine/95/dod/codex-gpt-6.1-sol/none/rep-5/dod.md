# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — Both public orchestrator methods reach the same catch boundary. A rejecting lifecycle hook and the built-in provider exercise that boundary without mocks or stubs; the hook rejects after the provider completes.

## Done when these pass

- [ ] **reports every rejection once as an Error while preserving the caller rejection** — String, object and `undefined` rejections reach `onError` exactly once as an `Error` preserving the cause by identity; existing errors retain identity, and both caller APIs reject with the original value. Spec anchor: `specs/hal-engine-config-hooks/spec.md#9`.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the instanceof gate at the shared catch boundary and normalize only the value delivered to onError, preserving the original as cause.
- [ ] Preserve existing Error identity and rethrow the original rejection, including undefined, through both public caller APIs; leave existing tests unedited.
- [ ] Keep the linked rejection guarantee in the spec and add a consumer-facing CHANGELOG entry describing newly reported failures.
- [ ] Pass the repository's required CI checks, including existing provider rejection tests, without changing their expectations.

## Out of scope

- Changes to beforeSession placement, tool-round usage accounting, or behavior when onError itself throws.
- Provider-specific error translation; the acceptance test targets the shared catch through a supported hook rather than fabricating a rejecting provider.