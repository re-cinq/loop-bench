# Definition of Done

> "`beforeSession` is awaited before the `try` block opens ([chatOrchestrator.ts#L91](../../src/orchestration/chatOrchestrator.ts#L91)), so a throw there escapes before the `catch`/`finally` exist and skips both `onError` and `afterSession`." — the recorded flaw this ticket exists to fix, quoted from `specs/hal-engine-config-hooks/spec.md` and restated as the ticket's Why.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(provider, promptBuilder, registry, {hooks})` is the real entry point and `hooks` is the supported way to install the lifecycle, so a test can install a throwing `beforeSession` today and observe what fires. It is red now because `onError` and `afterSession` never run; the fix is one move of the `beforeSession` await inside the `try` in `src/orchestration/chatOrchestrator.ts`.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws and still rejects the caller** — a `beforeSession` that throws still rejects `processMessage` with that error (criterion 1), `onError` fires first with the same session object and the same error instance any other orchestrator failure delivers (criterion 2), `afterSession` fires after it (criterion 3), and none of the later hooks, the provider call or an entry commit happened before the failure — so the spec's claim about what the hook may assume is itself pinned
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] RED: the acceptance test fails today with `callOrder` equal to `['beforeSession']` only — `onError` and `afterSession` never recorded, rejection and zero provider calls already correct
- [x] `specs/hal-engine-config-hooks/spec.md`: the recorded-flaw bullet replaced by the Failure path guarantee, citing the acceptance test; the "Measured semantics — out of scope" lead now reads "these two properties" for the two flaws that remain out of scope
- [x] `.lore/dod.md` recording the decision the ticket asks to make explicit
- [ ] Move the `beforeSession` await inside the `try` in `src/orchestration/chatOrchestrator.ts` so the throw reaches the existing `catch`/`finally`
- [ ] The decision, recorded in the spec by this pod and binding on the fix: `afterSession` DOES run after a failed `beforeSession` (the ticket's acceptance criteria fix this answer); what a hook may assume is stated in the spec's Failure path bullet — the turn never started, so no input/model hook ran, the provider was not called and no entry was added
- [ ] CHANGELOG `## [Unreleased]` entry saying what changes for an existing consumer — owed with the src/ change, which is when `scripts/check-changelog.sh` gates it
- [ ] After the src/ edit re-run `node scripts/repoint-spec-anchors.mjs` — the two remaining flaw bullets anchor to `chatOrchestrator.ts#L150` and `#L148`, which the move shifts
- [ ] Criterion 4's guard: the existing tests stay unedited and green — `src/orchestration/chatOrchestrator.test.ts` (`called before anything else`, `calls all hooks in correct order`, `error path calls onError then afterSession`) and `src/config.test.ts` (`fires the lifecycle hooks in documented order for a session that completes without error`); CI runs them

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue per the ticket)
- Usage accounting across tool rounds (HALEngine#93)
- Whether the session store's `save` now runs on this path once the `finally` is entered — the ticket does not ask for it to be pinned, and the write-signal spec already owns that hook
- The WebSocket transport's error frame for this failure; both entry points (`processMessage`, `processMessageStream`) share the one generator this test exercises