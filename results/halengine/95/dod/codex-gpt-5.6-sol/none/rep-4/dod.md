# Definition of Done

> Call `onError` for every rejection.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real caller-facing seam, and an `AIProvider` can reject with arbitrary values through its normal `sendMessage()` contract.

## Done when these pass

- [ ] **normalizes non-Error hook values while preserving every original rejection** — pins one hook call with an `Error` preserving the raw rejection as `cause`, plus identity-preserving propagation to the caller, for a string, plain object and `undefined`; also pins pass-through identity for an existing `Error`.
      `src/orchestration/chatOrchestratorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Normalize every non-`Error` rejection before passing it to `onError`.
- [ ] Preserve an existing `Error` instance when invoking `onError`.
- [ ] Rethrow the original rejected value unchanged after the hook runs.
- [ ] Replace the spec's recorded flaw with the new guarantee and add the consumer-facing CHANGELOG entry.

## Out of scope

- `beforeSession` placement relative to the orchestrator's `try` block.
- Usage accounting across tool rounds.