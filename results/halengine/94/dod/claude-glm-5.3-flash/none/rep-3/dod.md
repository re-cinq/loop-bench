# Definition of Done

> "`beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs."

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes `OrchestratorHooks` and `processMessage` is the real entry point, so the tests install a throwing `beforeSession` and call it today. They fail now because neither hook fires; moving the `beforeSession` await inside the `try` in `src/orchestration/chatOrchestrator.ts` is the whole production change.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws, in that order, and still rejects with that error** — a throw from `beforeSession` reaches the same `catch`/`finally` as any other turn failure: `onError` fires, `afterSession` follows it, and the caller still receives the original rejection unchanged.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands onError the session and error any other failure hands it, after a turn that reached no provider call** — the failure reaches `onError` with the usual `(session, error)` shape, and by hook time none of the turn had run: no provider call, and the session still carries exactly the entries `beforeSession` was given (the assumption the spec records for an `afterSession` cleanup hook).
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

Run them with the repo's own Jest invocation, never a bare `npm test`:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts
```

## Facets

- [x] Acceptance tests written and red for the ticket's reason: today the rejection arrives (`outcome` matches) but `order` is empty — neither hook ran.
- [x] `specs/hal-engine-config-hooks/spec.md`: replaced the recorded-flaw bullet in § Measured semantics — out of scope with the new § A failed `beforeSession` guarantee, citing the two red tests; the remaining two flaw bullets are untouched.
- [ ] Move the `beforeSession` await at `src/orchestration/chatOrchestrator.ts:91` inside the `try`, so its throw reaches the existing `catch` and `finally`.
- [ ] Do not wrap what is re-thrown: the caller still receives the original thrown `Error` (both tests' `outcome` pins this).
- [ ] Leave the `instanceof Error` gate in the `catch` exactly as it is — the tests throw an `Error` for that reason.
- [ ] Add the `## [Unreleased]` CHANGELOG entry (shipped source changes and `scripts/check-changelog.sh` gates on it): for an existing consumer, `onError` and `afterSession` now fire on a failed `beforeSession`, where they never did before.
- [ ] Every existing test stays unedited and green: the non-throwing `beforeSession` path is already pinned by `src/orchestration/chatOrchestrator.test.ts` (`full lifecycle order`, `error path calls onError then afterSession`) and `src/config.test.ts` (`fires the lifecycle hooks in documented order for a session that completes without error`).

## Out of scope

- The `instanceof Error` gate on `onError` — its own issue; a `beforeSession` that throws a non-`Error` still bypasses `onError`, which is why the tests throw an `Error`.
- Usage accounting across tool rounds (HALEngine#93).
- Any new hook or parameter telling `afterSession` that the session never started: the ticket's title fixes the choice — both hooks run — and the spec records what a hook may assume instead, which the second statement pins.