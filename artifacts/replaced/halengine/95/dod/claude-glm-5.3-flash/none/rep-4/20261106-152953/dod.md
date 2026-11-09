# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A
> rejection that is not an `Error` — a thrown string, a plain object, a value
> from a library that rejects with its own shape — bypasses `onError` entirely
> while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` is the
real entry point, and a provider that rejects with an arbitrary value reaches the
`catch` in `processMessageStream` through it today, so the acceptance tests call
it directly with a `rejectingProvider` fixture (a real `AIProvider`, no mocking
library) and fail on behaviour: `onErrorCalls: 0`, `isError: false`, while
`rejected: true` — exactly the bypass the ticket reports. No production code is
needed for the tests to load.

## Done when these pass

All four live in `src/orchestration/chatOrchestrator.acceptance.test.ts` and drive
the real orchestrator through `processMessage`:

- [ ] **calls onError once with an Error whose cause is the string the provider rejected with, and still rejects the caller with that string** — the central claim: a string rejection reaches `onError` wrapped (`cause` is the string, identity checked by value) and the caller's rejection stays the string itself.
- [ ] **wraps a plain-object rejection the same way, and the caller still receives the original object** — same guarantee for an object, with `Object.is` pinning that `cause` and the caller's rejection are the original instance, not a clone.
- [ ] **calls onError for a rejection with undefined and still rejects the caller with undefined** — the falsy case the `instanceof` gate also drops; `rejected: true` is what separates a rejection carrying `undefined` from a resolution.
- [ ] **hands an Error rejection to onError as the same instance, not a wrapper** — criterion 3's preservation guarantee, which no existing test holds (`chatOrchestrator.test.ts` compares `error.message`, which a wrapper could copy). GREEN TODAY BY DESIGN: it pins the invariant the fix must not break, so the red bar is carried by the first three tests alone.

`src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In the `catch` of `processMessageStream` (`src/orchestration/chatOrchestrator.ts:150`), drop the `instanceof Error` gate: call `hooks.onError(session, error)` for every rejection, wrapping what is not already an `Error` in one that carries the original as `cause`. Make tests 1–3 green.
- [ ] Do not wrap a rejection that is already an `Error`: it reaches `onError` as the same instance (test 4 stays green, and so does the existing suite).
- [ ] Leave `throw error` untouched — the re-thrown value at the caller boundary is exactly what it is today, so nothing downstream changes shape.
- [ ] `src/orchestration/chatOrchestrator.test.ts` stays UNEDITED and green; it is the ticket's own pin for criterion 3.
- [ ] `CHANGELOG.md`: entry under `## [Unreleased]` → `### Fixed`, written for an existing consumer — an `onError` hook now also hears the failures that used to bypass it, arriving as an `Error` wrapping the original in `cause`. CI's `check-changelog.sh` only fires once a non-test `src/` file lands, i.e. in this round.
- [ ] `specs/hal-engine-config-hooks/spec.md` already carries the new guarantee with citations to the acceptance tests (the recorded-flaw section is deleted in this commit); the statements become true when the behaviour lands.

## Out of scope

- **`beforeSession` escaping the `try`** — its own issue, per the ticket's tech notes; the same wrap belongs to whatever ticket moves that call.
- **Usage accounting across tool rounds** — HALEngine#93.
- **The transport's rendering of a non-Error rejection** — the caller boundary is unchanged by design, so nothing downstream is re-pinned here.
- **Other catch sites** — `consultPolicy` already declines on any throw and `saveSession` already stringifies non-Errors; neither is touched.

## Validation

Run here (the pod runs Jest): `node --experimental-vm-modules node_modules/jest/bin/jest.js
src/orchestration/chatOrchestrator.acceptance.test.ts` → `Tests: 3 failed, 1 passed, 4 total`,
committed with no production code. Each failure reads `onErrorCalls: 0`, `isError: false`
alongside `rejected: true` — the hook bypassed while the rejection still propagates, which is
the reported flaw and nothing else. The one pass is the criterion-3 guard, green before and
after by design.