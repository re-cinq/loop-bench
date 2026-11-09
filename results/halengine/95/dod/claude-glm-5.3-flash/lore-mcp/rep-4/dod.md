# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` with a provider whose `sendMessage` generator throws a non-Error value, an `onError` hook installed, and the caller's rejection observable as a value. The acceptance test calls that real entry point today and fails on behaviour (`onErrorCalls: []`), not on a missing fixture.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is the rejection value, and rejects the caller with that value unchanged, when the provider rejects with a string, a plain object, or undefined** — for each of the three non-Error rejection shapes, `onError` fires exactly once with an `Error` (`instanceof Error`) whose `cause` is the original value by identity, and the caller's rejection is the original value by identity; the spec statement this validates now lives in `specs/hal-engine-config-hooks/spec.md` under "Installing hooks through config", replacing the deleted "Measured semantics — out of scope" flaw record.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **existing orchestrator tests stay green and unedited** (acceptance criterion 3, which the ticket pins this way: a rejection that is already an `Error` reaches `onError` as the same instance, not a wrapper): `called with session and error when stream fails`, `error still propagates after onError hook`, `runs onError then afterSession when it throws, and still rejects to the caller`, `error path calls onError then afterSession`
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Acceptance test written and red for the ticket's reason: `onErrorCalls: Array []` for all three shapes while `callerReceivedOriginal: true` — the gate drops the failure, the caller still sees it.
- [x] `specs/hal-engine-config-hooks/spec.md` replaces the recorded-flaw line with the new guarantee, citing the acceptance test.
- [ ] In `src/orchestration/chatOrchestrator.ts`, the `catch` calls `onError` for every rejection: whatever is not already an `Error` is wrapped in one with the original as `cause`; the re-thrown value at the caller boundary stays exactly what it is today (`throw error`).
- [ ] `CHANGELOG.md` gains a `### Fixed` entry under `## [Unreleased]` written for an existing consumer (a hook typed against `Error` keeps compiling; the raw value is reachable via `cause`; `npm run check-changelog` requires it once `src/` changes).
- [ ] Acceptance file green and `src/orchestration/chatOrchestrator.test.ts` still green.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Changing what the caller receives: the re-thrown value stays exactly what it is today.