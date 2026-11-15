# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — A seam already exists at the `catch` block in `chatOrchestrator.ts` (line 150) where `onError` is gated on `error instanceof Error`. The acceptance test can call the real entry point today and fail on the gate.

## Done when these pass

- [ ] **calls onError for a string rejection with an Error whose cause is the string, and caller receives the original string** — non-Error rejections are wrapped and passed to `onError`, while the original value re-throws
      `src/orchestration/chatOrchestrator.onError-non-error-rejections.acceptance.test.ts`

- [ ] **calls onError for a plain object rejection with an Error whose cause is the object, and caller receives the original object** — non-Error rejections are wrapped and passed to `onError`, while the original value re-throws
      `src/orchestration/chatOrchestrator.onError-non-error-rejections.acceptance.test.ts`

- [ ] **calls onError for an undefined rejection with an Error whose cause is undefined, and caller receives undefined** — non-Error rejections are wrapped and passed to `onError`, while the original value re-throws
      `src/orchestration/chatOrchestrator.onError-non-error-rejections.acceptance.test.ts`

- [ ] **calls onError with the same Error instance when rejection is already an Error (not wrapped)** — Error instances bypass wrapping and existing tests stay green
      `src/orchestration/chatOrchestrator.onError-non-error-rejections.acceptance.test.ts`

## Facets

- [ ] Modify the catch block to wrap non-Error rejections in an Error with the original as the `cause`
- [ ] Keep the re-thrown value unchanged so callers see the same rejection shape

## Out of scope

- Changes to spec and CHANGELOG (part of acceptance criteria 4 but outside scope of acceptance test definition)
- `beforeSession` escaping the `try` (HALEngine#96)
- Usage accounting across tool rounds (HALEngine#93)