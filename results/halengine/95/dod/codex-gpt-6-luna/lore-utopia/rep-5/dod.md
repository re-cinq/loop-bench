# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real provider and hooks, so the test can exercise an actual provider rejection through the orchestrator without doubles.

## Done when these pass

- [ ] **Calls onError with a caused Error and preserves the original rejection for the caller** — string, plain object, and `undefined` rejection values each reach `onError` once as an `Error` with the original value as `cause`, while that exact value still rejects to the caller.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Exercise non-Error rejection values through the provider and orchestrator path.
- [ ] Preserve the original Error instance when it reaches `onError`.
- [ ] Replace the spec's recorded flaw with the guarantee and note the consumer-visible change in the changelog.

## Out of scope

- Changing lifecycle behavior for `beforeSession` or usage accounting across tool rounds.
- Running repository-wide checks beyond the named acceptance test in this pod.