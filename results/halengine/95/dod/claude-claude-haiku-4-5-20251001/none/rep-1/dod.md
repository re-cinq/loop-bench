# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — The `catch` block at `src/orchestration/chatOrchestrator.ts:149-154` already gates `onError` invocation; the seam exists. The fix wraps non-Error rejections and calls the hook for all cases, then re-throws the original value unchanged.

## Done when these pass

- [ ] **calls onError with an Error wrapping a string rejection, while caller receives the original string** — Verifies non-Error rejections are wrapped, onError receives the wrapper, and the original string propagates to the caller.
  `src/orchestration/chatOrchestrator.onError-non-error.acceptance.test.ts`

- [ ] **calls onError with an Error wrapping a plain object rejection, while caller receives the original object** — Verifies non-Error rejections are wrapped with the object as cause, onError is called, and the original object is re-thrown.
  `src/orchestration/chatOrchestrator.onError-non-error.acceptance.test.ts`

- [ ] **calls onError with an Error wrapping an undefined rejection, while caller receives undefined** — Verifies undefined rejections are wrapped, onError is called with the wrapper, and undefined is re-thrown.
  `src/orchestration/chatOrchestrator.onError-non-error.acceptance.test.ts`

- [ ] **Existing onError tests stay green** — Verifies Error rejections are not wrapped and reach onError as the same instance.
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Modify the catch block to wrap non-Error rejections in an Error with the original as cause
- [ ] Call onError for all rejections (Error and non-Error after wrapping)
- [ ] Re-throw the original rejection value unchanged to the caller
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace the recorded-flaw line with the new guarantee
- [ ] Update CHANGELOG to document the change for existing consumers
- [ ] Verify all tests pass: `npm test`, `npm run typecheck`, `npm run eslint`, `npm run prettier:check`

## Out of scope

- `beforeSession` escaping the `try` (its own issue, re-cinq/HALEngine#80)
- Usage accounting across tool rounds (re-cinq/HALEngine#93)