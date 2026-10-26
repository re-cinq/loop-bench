# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the real `processMessage` entry point and accepts `onError` hooks. A provider that rejects with a non-Error value drives the existing catch seam directly, so no new boundary or module is needed.

## Done when these pass

- [ ] **wraps every non-Error rejection for onError while preserving the caller rejection** — string, plain-object, and `undefined` rejections each call `onError` once with an `Error` whose `cause` is the original value, while `processMessage` rejects with that original value.
      `src/orchestration/onErrorRejection.acceptance.test.ts`

The existing `Error` rejection tests remain unedited and pin that an `Error` reaches `onError` as the same instance.

## Facets

- [ ] Red: the acceptance test observes that all three non-Error values currently bypass `onError`.
- [ ] Green: wrap only non-`Error` caught values for the hook, preserve the original value when re-throwing, and leave existing `Error` identity behavior unchanged.
- [ ] Refactor: keep the new test on the real orchestrator path and the existing Error-path tests unedited.
- [ ] Documentation: replace the spec’s recorded flaw with the guarantee and add the CHANGELOG note required by the ticket.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).