# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The real orchestrator entry points share the catch block. Throwing lifecycle hooks exercise that block with real values and the built-in provider, without a provider double.

## Done when these pass

- [ ] **reports every rejection as an Error while preserving the caller rejection** — Strings, plain objects and undefined each reach onError exactly once as Errors with the original cause; existing Errors retain identity, and both caller entry points retain the original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the Error-only reporting gate and wrap non-Errors with their original cause; keep rethrowing the original value.
- [ ] Preserve existing Error identity and leave existing tests unedited.
- [ ] Apply the same guarantee to provider rejections through the shared catch block; the acceptance test uses lifecycle failures to avoid provider doubles.
- [ ] Keep the spec guarantee linked to the acceptance test and add a CHANGELOG migration note explaining that existing hooks now see previously omitted failures.
- [ ] Pass the repository CI checks, including build, tests, typecheck, ESLint and Prettier.

## Out of scope

- Changes to beforeSession placement, usage accounting across tool rounds, or failures thrown by onError/afterSession themselves.