# Definition of Done

> A provider rejecting with a string calls `onError` once, with an `Error` whose `cause` is that string, and the caller still receives the original rejection unchanged. The same holds for a rejection with a plain object and with `undefined`. A rejection that is already an `Error` reaches `onError` as the same instance, not a wrapper.

**Strategy: `direct`** — The `processMessage` entry point already exists and we can test the real orchestrator's catch block directly. The onError hook is called via that entry point and we can observe whether it receives wrapped or original rejections.

## Done when these pass

- [ ] **calls onError with Error wrapping a string rejection, preserving the string as cause** — String rejections are wrapped in Error with the string as cause, and the caller receives the original string
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError with Error wrapping a plain object rejection, preserving the object as cause** — Plain object rejections are wrapped in Error with the object as cause, and the caller receives the original object
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError with Error wrapping an undefined rejection, preserving undefined as cause** — Undefined rejections are wrapped in Error with undefined as cause, and the caller receives undefined
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError with the same Error instance for Error rejections, not wrapped** — Error instances are passed through unchanged and the existing tests remain unedited
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap non-Error rejections in Error with the original value as cause in chatOrchestrator.ts catch block
- [ ] Pass Error instances through unchanged to onError
- [ ] Update specs/hal-engine-config-hooks/spec.md to replace the recorded-flaw line with the new guarantee
- [ ] Update CHANGELOG with what changes for existing consumers

## Out of scope

- beforeSession escaping the try (its own issue)
- Usage accounting across tool rounds (HALEngine#93)