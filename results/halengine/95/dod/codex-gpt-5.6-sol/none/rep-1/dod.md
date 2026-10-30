# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real caller boundary and accepts both a provider and lifecycle hooks, so the rejection, hook argument, call count, and propagated value are all directly observable.

## Done when these pass

- [ ] **calls onError once with a wrapping Error and rethrows each original value unchanged** — pins string, plain-object, and `undefined` provider rejections through the real orchestrator entry point.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Normalize each non-`Error` rejection to an `Error` whose `cause` is the original value before calling `onError`.
- [ ] Preserve the original rejection unchanged when propagating it to the caller.
- [ ] Replace the spec's recorded flaw with the guaranteed behavior and document the consumer-visible change in `CHANGELOG.md`.
- [ ] Keep the existing same-instance behavior for rejections that are already `Error` objects.

## Out of scope

- `beforeSession` placement relative to the orchestrator's `try` block.
- Usage accounting across tool rounds (HALEngine#93).