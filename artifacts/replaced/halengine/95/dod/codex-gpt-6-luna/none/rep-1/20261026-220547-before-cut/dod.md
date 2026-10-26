# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` is directly callable with a real provider, so the acceptance test exercises its rejection path and hook without doubles.

## Done when these pass

- [ ] **calls onError with a caused Error for every non-Error provider rejection and preserves the rejection** — string, plain-object, and `undefined` rejections each call the hook once with an `Error` whose `cause` is the original, while the caller receives the exact original value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add an acceptance test through the provider-to-orchestrator call path for the non-Error rejection values.
- [ ] Update the recorded-flaw statement in the config-hooks spec with the tested guarantee.

## Out of scope

- Existing `Error` identity behavior, `beforeSession` escaping the `try`, and usage accounting across tool rounds.
- Spec changelog and build requirements are implementation deliverables, not part of this acceptance test slice.