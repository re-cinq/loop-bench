# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` is the real seam, and a provider async generator can reject with each required raw value. The acceptance test checks both the hook's wrapped `Error` and the unchanged caller rejection.

## Done when these pass

- [ ] **Wraps string, object, and undefined for onError while preserving the caller rejection** — each non-`Error` rejection calls the hook once with an `Error` whose `cause` is the original, and propagates unchanged to the caller.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Pin non-`Error` rejection handling through the provider and orchestrator entry points.
- [ ] Replace the spec's recorded flaw with the guarantee and cite the acceptance test.
- [ ] Preserve the existing test that pins an `Error` rejection reaching `onError` as the same instance.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.
- Changelog and implementation work; this branch defines the acceptance contract only.