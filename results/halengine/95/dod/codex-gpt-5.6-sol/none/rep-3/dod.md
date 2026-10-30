# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(...)` is the real entry point and accepts both a provider and configured hooks, so the rejection, hook argument, and caller boundary are directly observable.

## Done when these pass

- [ ] **calls onError with wrapped non-Error rejections and rethrows each original value** — string, plain-object, and `undefined` rejections each invoke the hook once with an `Error` carrying the original as `cause`, then propagate unchanged to the caller.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Normalize every caught non-`Error` value to an `Error` with the original value as its `cause` for `onError` only.
- [ ] Preserve the existing `Error` identity path and rethrow every original rejection unchanged.
- [ ] Replace the spec's recorded flaw with the guaranteed behavior and document the consumer-visible change in the changelog.

## Out of scope

- `beforeSession` placement relative to the orchestrator's `try`/`finally`.
- Usage accounting across tool rounds.