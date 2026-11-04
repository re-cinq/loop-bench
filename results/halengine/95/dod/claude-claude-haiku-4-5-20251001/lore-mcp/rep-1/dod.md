# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — The seam exists: the `catch` block at lines 149-153 of `src/orchestration/chatOrchestrator.ts` already gates `onError` invocation. Acceptance tests call the real entry point (`processMessage`) and observe rejection handling through the hook.

## Done when these pass

- [ ] **calls onError with Error wrapper when provider rejects with string** — verifies non-Error rejections invoke the hook with a wrapped Error, preserving original as cause, and re-throw the original unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts#L30`

- [ ] **calls onError with Error wrapper when provider rejects with plain object** — verifies plain objects are wrapped and re-thrown unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts#L63`

- [ ] **calls onError with Error wrapper when provider rejects with undefined** — verifies undefined rejections are wrapped and re-thrown unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts#L96`

- [ ] **passes Error instance unchanged to onError when provider rejects with Error** — verifies existing Error rejections bypass wrapping (pinned by existing tests remaining unedited)
  `src/orchestration/chatOrchestrator.acceptance.test.ts#L129`

## Facets

- [ ] Remove `instanceof Error` gate from the catch block
- [ ] Wrap non-Error rejections in Error with cause set to the original
- [ ] Pass Error instances through unchanged
- [ ] Re-throw original value in all cases

## Out of scope

- Changes to `beforeSession` error handling (HALEngine#82)
- Usage accounting across tool rounds (HALEngine#93)
- Spec update and CHANGELOG (handled separately per ticket #95)