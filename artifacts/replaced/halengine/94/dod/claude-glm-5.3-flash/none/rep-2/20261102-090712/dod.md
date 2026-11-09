# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(...).processMessage(session)` is the real entry point and the hooks are installable today, so the acceptance tests call it and fail on the missing behaviour (`onError`/`afterSession` never fire when `beforeSession` throws). No production change is needed to make the tests runnable, only to make them pass.

## Done when these pass

- [ ] **runs onError with the session and the thrown error when beforeSession throws** — a throwing `beforeSession` delivers the session and the thrown error to `onError`, the same argument shape as any other orchestrator failure; today `onError` never fires and both arrive as `undefined`
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **still rejects the caller and runs afterSession when beforeSession throws** — the original error still rejects the caller (unchanged from today), `afterSession` still runs, and the provider was never called, so a cleanup hook cannot assume the turn started; today `afterSession` never fires
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

Both are cited from the spec section "A `beforeSession` that throws" in `specs/hal-engine-config-hooks/spec.md`, which this commit wrote in place of the recorded-flaw bullet.

## Facets

- [ ] Move the `beforeSession` call at the top of `processMessageStream` inside the `try` in `src/orchestration/chatOrchestrator.ts`, so a throw from it reaches the existing `catch` and `finally`
- [ ] Both acceptance tests go green; run them with `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] The existing hook tests stay unedited and green — they pin the non-throwing `beforeSession` path and the other error paths: the `beforeSession`/`afterSession`/`onError`/lifecycle-order suites in `src/orchestration/chatOrchestrator.test.ts` and the hook-forwarding suites in `src/config.test.ts`
- [ ] Add the `CHANGELOG.md` `## [Unreleased]` entry saying what changes for an existing consumer (an `afterSession`/`onError` installed today starts firing on a failed `beforeSession`); CI's changelog gate triggers on the `src/` change, so this lands with the production commit

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue; the second recorded-flaw bullet in the spec)
- Usage accounting across tool rounds (HALEngine#93; the third recorded-flaw bullet in the spec)
- Changing which hooks run before a throwing `beforeSession` — the guarantee is that none of them have run, which the second test pins via the untouched provider