# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(...).processMessage(session)` is the real entry point, and an `AIProvider` whose `sendMessage` throws a non-Error value drives the production `catch` with no doubles. Run the tests with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.onError.acceptance.test.ts`; CI's `Verify` job runs them for every push as its "Test (with coverage floor)" step.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is the string the provider rejected with, and still rejects the caller with that string** — a string rejection fires `onError` exactly once, with an `Error` whose `cause` is that string, while the caller still rejects with the original string
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is the object the provider rejected with, and still rejects the caller with that object** — the same guarantee for a plain-object rejection, checked by identity rather than deep equality
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **calls onError once when the provider rejects with undefined, and still rejects the caller with undefined** — the same guarantee for `undefined`
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **passes a rejection that is already an Error to onError as the same instance, not a wrapper** — the fix wraps only what is not already an `Error`; this one is green on arrival today and guards the obvious wrong fix of wrapping everything (acceptance criterion 3, whose existing pins in `src/orchestration/chatOrchestrator.test.ts` remain unedited)
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [ ] In the `catch` of `processMessageStream` (`src/orchestration/chatOrchestrator.ts`), drop the `error instanceof Error` gate: pass `onError` an `Error` that wraps a non-Error rejection with the original as its `cause`, pass an `Error` rejection through as itself, and keep re-throwing the original value unchanged
- [ ] CHANGELOG: a `### Fixed` entry under `[Unreleased]` saying what changes for an existing consumer — an `onError` hook now also fires for rejections that are not `Error`s and receives a wrapper whose `cause` is the original value
- [ ] The spec's recorded-flaw section is already replaced by the guarantee ("Error delivery to `onError`" in `specs/hal-engine-config-hooks/spec.md`), citing the four acceptance tests above; the code change is what turns them green

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- What the caller receives: the re-thrown value stays exactly what it is today