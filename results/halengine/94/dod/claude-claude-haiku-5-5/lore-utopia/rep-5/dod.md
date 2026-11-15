# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator(...).processMessage(session)` is the real entry point and the hooks are passed through `ChatOrchestratorOptions.hooks`. Both acceptance tests call it today and fail on the missing `onError` and `afterSession` calls.

## Done when these pass

- [ ] **rejects the caller with the beforeSession error and passes that same error and session to onError** — a throwing `beforeSession` still rejects with the identical error, and `onError` receives the session and that error.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- [ ] **still runs afterSession, with the session, after a beforeSession throw** — `afterSession` fires once with the session after a `beforeSession` throw. This pins the decision that a deployer's cleanup hook runs on this path.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`, so the throw reaches `catch` (`onError`) and `finally` (`afterSession`).
- [ ] Confirm the rejection still reaches the caller unchanged (the first test's `rejects.toBe` already passes today; it must keep passing).
- [ ] Replace the recorded-flaw bullet for `beforeSession` in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, stating what a hook can assume about how much of the turn happened.
- [ ] Add a CHANGELOG entry under Unreleased saying what changes for an existing consumer (`onError` and `afterSession` now fire on a `beforeSession` throw).
- [ ] Add the inline `([validated by ...])` parentheticals on the new spec statements once the two tests above exist.

## Out of scope

- The `instanceof Error` gate on `onError`, which bypasses `onError` for a non-`Error` rejection (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- The `afterModelResponse` `lastUsage` measured semantics in the same spec.
- Whether `afterSession` should be told the session never started: the decision recorded here is that it runs, and the spec should say what a hook can assume.

## Red bar

Run here with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/beforeSessionFailure.acceptance.test.ts`: both tests fail with `Expected length: 1, Received length: 0` (`onError` and `afterSession` never called). CI runs the same suite in the "Test" step of the `CI` workflow in `.github/workflows/ci.yml`.