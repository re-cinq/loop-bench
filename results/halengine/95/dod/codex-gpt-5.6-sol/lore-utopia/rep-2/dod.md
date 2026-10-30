# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider and hooks, so the acceptance test can drive a rejecting provider through the real `processMessage` entry point and observe both the hook and caller boundaries.

## Done when these pass

- [ ] **reports %s to onError without changing the caller rejection** — string, plain-object, and `undefined` rejections each call `onError` once with an `Error` carrying the original as `cause`, while the caller receives the original value.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Normalize each caught non-`Error` value for `onError` without changing the value re-thrown to the caller.
- [ ] Preserve the existing same-instance behavior for caught values that are already `Error` objects.
- [ ] Replace the spec's recorded flaw with the guaranteed rejection semantics and document the consumer-visible change in `CHANGELOG.md`.
- [ ] Make the named acceptance test pass, then refactor without changing its boundary assertions.

## Out of scope

- `beforeSession` placement outside a catch boundary and usage accounting across tool rounds.