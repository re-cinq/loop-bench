# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real provider and hooks, so the acceptance test drives the provider rejection through the orchestrator and observes both the hook and caller boundary.

## Done when these pass

- [ ] **calls onError with an Error whose cause is the original rejection and rethrows it unchanged** — string, plain object and `undefined` rejections each reach the hook once as an `Error` with the original cause, and remain unchanged for the caller.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Pin non-`Error` rejection behavior through the provider and orchestrator seam.
- [ ] Replace the spec's recorded flaw with the guaranteed behavior and cite the acceptance test.
- [ ] Document the consumer-visible change in the changelog.

## Out of scope

- Existing `Error` rejections continue to reach `onError` as the same instance.
- `beforeSession` escaping the `try` and usage accounting across tool rounds.
- Repository-wide build, typecheck, lint and formatting checks; CI runs those checks.