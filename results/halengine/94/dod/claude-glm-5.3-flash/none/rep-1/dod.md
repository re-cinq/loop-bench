# Definition of Done

> "`beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs."

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` and `OrchestratorHooks` are the public entry point, and an acceptance test drives a real `processMessage` turn with a throwing `beforeSession` hook today and fails on the behaviour the ticket reports. No new module or characterization pass is needed; the existing suites already pin the non-throwing path.

## Done when these pass

- [ ] **runs onError then afterSession, and still rejects the caller with the thrown error, when beforeSession throws** — a throw from `beforeSession` reaches the same `catch`/`finally` as any other failure in the turn: `onError` fires with the same session and the same error object, `afterSession` follows, the rejection still carries the original error, and the provider is never reached
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands afterSession the session exactly as beforeSession left it, the turn never having started** — `afterSession` runs after a failed `beforeSession` on the session the hook left behind: the caller's own entries and nothing else, no provider call, so a cleanup hook can tell "never allocated" from "allocated and finished"
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts` (`processMessageStream`, the `if (hooks?.beforeSession)` line above the `try`), so a throw from it reaches the existing `catch` and `finally`
- [ ] Ticket criterion "A non-throwing `beforeSession` behaves exactly as today, pinned by the existing tests remaining unedited": the suites in `src/orchestration/chatOrchestrator.test.ts` (23 tests) and the hook statements of `src/config.test.ts` stay green with no edit — run that existing file yourself; it is deliberately NOT listed under "Done when these pass" so the hook cannot lock you out of your own sibling suite
- [ ] The spec already states the new guarantee: this pod replaced the recorded-flaw line with `specs/hal-engine-config-hooks/spec.md` § "Failure semantics of a throwing `beforeSession`", citing both tests. The decision the ticket asks to record is made there and pinned by the second test: `afterSession` runs after a failed `beforeSession`, on a session the turn never started. Keep prose and tests in sync if the wording shifts
- [ ] CHANGELOG: add a `[Unreleased]` → `Changed` (or `Fixed`) entry saying what changes for an existing consumer — a throwing `beforeSession` now fires `onError` and `afterSession` instead of escaping silently, and `afterSession` now runs on a turn that never reached the provider, so cleanup hooks see the session as `beforeSession` left it
- The fix shifts `chatOrchestrator.ts` line numbers below the moved call: the two prose links left in § "Measured semantics — out of scope" (`#L150`, `#L148`) will go stale — repoint them, and `npm run spec:names:fix` holds the test citations true

## Out of scope

- The `instanceof Error` gate on `onError` in the same `catch` (its own issue)
- Usage accounting across tool rounds — `afterModelResponse` receiving `lastUsage` instead of a sum (HALEngine#93)
- Transport-level error framing of the rejection (`error` frames, `stream_end`) — the ticket owns the orchestrator-level hook guarantee, and both `processMessage` and `processMessageStream` share the one generator this fix touches