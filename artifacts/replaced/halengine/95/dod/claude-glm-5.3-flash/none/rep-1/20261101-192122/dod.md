# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes `OrchestratorHooks.onError`, and a provider whose `sendMessage` generator throws drives the real `catch` in `src/orchestration/chatOrchestrator.ts` from the public entry point. No doubles are needed; the tests install a real hook and a real provider and read what each received.

Run them with:

```bash
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
```

CI shows the red bar in the `CI / Verify` workflow, step "Test (with coverage floor)" (`npm run test:coverage`), on the pull request.

## Done when these pass

- [ ] **reports a rejection that is not an Error to onError wrapped in one, with the original as its cause, and still rejects the caller with the original value** — a provider rejecting with a string, a plain object, and `undefined`: each reaches `onError` exactly once as an `Error` whose `cause` is the original value, and the caller's rejection is still the original value, unchanged. RED today: `onError` is called 0 times, because the `catch` gates it on `error instanceof Error` — the ticket's claim, verbatim.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands a rejection that is already an Error to onError as the same instance and still rejects the caller with it** — pins acceptance criterion 3's "same instance, not a wrapper": the hook receives the thrown `Error` itself, not a copy. GREEN today, deliberately: this property already holds, and the test exists so a fix that wraps `Error`s too cannot pass the file. The existing `src/orchestration/chatOrchestrator.test.ts` tests pin this path only at `.message` level, so without this assertion a wrapping fix would stay green there.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] the existing `src/orchestration/chatOrchestrator.test.ts` stays unedited and green after the fix

## Facets

- [x] Acceptance tests written; the non-`Error` one red on `onErrorCalls: 0` (this pod).
- [x] `specs/hal-engine-config-hooks/spec.md`: the "Measured semantics — out of scope" section (the recorded flaw, from HALEngine#83) replaced by the two guarantee statements, citing the acceptance tests (this pod).
- [ ] The `catch` in `src/orchestration/chatOrchestrator.ts` calls `onError` for every rejection: values that are not already `Error` get wrapped in one with the original as `cause`; `Error` instances reach the hook as themselves; what is re-thrown to the caller is exactly what it is today.
- [ ] CHANGELOG: a `### Fixed` entry under `## [Unreleased]` saying what changes for an existing consumer — an `onError` hook now also fires for non-`Error` rejections, receiving them wrapped.
- [ ] Green: both acceptance tests pass; `src/orchestration/chatOrchestrator.test.ts` untouched.

## Out of scope

- `beforeSession` escaping the `try` (the ticket names it its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Any change to what the caller receives at the rejection boundary, or to the `onError` hook's type signature — a hook typed against `Error` keeps compiling without edits.