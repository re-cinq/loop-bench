# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — Both public orchestrator methods reach the same catch block. A real rejecting lifecycle hook exercises that boundary with real values, without a provider double.

## Done when these pass

- [ ] **reports every non-Error rejection with its original cause while preserving the caller rejection** — Strings, plain objects, and `undefined` each trigger one Error notification preserving the cause, through both public methods, while callers receive the original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the non-Error notification gate and wrap non-Error values with their original cause.
- [ ] Preserve existing Error instance identity and caller rejection values; leave existing Error tests unedited.
- [ ] Keep the spec's new rejection guarantee and add a CHANGELOG entry explaining the consumer-visible change.
- [ ] Pass the acceptance test and CI's existing build, test, typecheck, eslint, and formatting gates.

## Out of scope

- Changes to beforeSession placement, tool-round usage accounting, or provider implementations.
- New requirements for wrapper messages or failures thrown by onError itself.