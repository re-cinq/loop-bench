# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `onError` is our existing lifecycle seam where the error handling change should be implemented.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is a thrown string, and rejects to the caller unchanged** — ensures a thrown string is wrapped in an Error and passed to onError, while the caller receives the original string.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is a thrown plain object, and rejects to the caller unchanged** — ensures a thrown object is wrapped in an Error and passed to onError, while the caller receives the original object.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is thrown undefined, and rejects to the caller unchanged** — ensures a thrown undefined is wrapped in an Error and passed to onError, while the caller receives undefined.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Wrap non-Errors in `chatOrchestrator.ts` `catch` block to invoke `onError` with `cause` while still re-throwing the raw value
- [x] Replace the flaw documentation in `specs/hal-engine-config-hooks/spec.md` with the new guarantee
- [x] Add CHANGELOG entry explaining the behavior change for existing consumers

## Out of scope

- `beforeSession` escaping the `try`
- usage accounting across tool rounds