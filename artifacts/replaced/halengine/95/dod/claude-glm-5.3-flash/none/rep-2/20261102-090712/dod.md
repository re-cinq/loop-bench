# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` is the real entry point and accepts any `AIProvider`, so a provider whose `sendMessage` throws a string, a plain object or `undefined` drives the actual `catch` today. The first test fails now on behaviour — `onError` is never called while the rejection still reaches the caller — with no stub or rewrite needed.

## Done when these pass

- [ ] **calls onError for a rejection that is not an Error, wrapping it with the original as cause, and still rejects the caller with the original value** — a provider rejecting with a string, a plain object, or `undefined` reaches `onError` exactly once, as an `Error` whose `cause` is the original value, while the caller still receives the original rejection unchanged. Red today: `onErrorCalls: 0`, `isError: false` on all three shapes with `callerGotOriginal: true` — the exact bypass the claim describes
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **passes an Error rejection to onError as the same instance, not a wrapper** — the wrap is for rejections that are not already `Error`s only. Green today and kept as a guard: an implementation that wrapped every rejection would still fail this ticket's first test into passing while silently changing what an `Error` rejection delivers
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [x] Spec guarantee replaces the recorded flaw and the acceptance tests exist (this commit): `specs/hal-engine-config-hooks/spec.md` now states the every-rejection guarantee in place of the "Measured semantics — out of scope" section, citing both tests. The first test is the red bar; the second is the guard that must stay green.
- [ ] Remove the `error instanceof Error` gate in the `catch` of `processMessageStream` (`src/orchestration/chatOrchestrator.ts:150`): `onError` runs for every rejection; a rejection that is not an `Error` is wrapped in one with the original as its `cause`; the re-thrown value stays exactly what it is today (`throw error`).
- [ ] CHANGELOG: add an entry under `## [Unreleased]` saying what changes for an existing consumer — `onError` now also fires for non-`Error` rejections and receives a wrapper whose `cause` carries the original value. `scripts/check-changelog.sh` only demands this once non-test `src/` files change, which is this round's edit, not the test commit's.
- [ ] Both acceptance tests green, and the existing orchestrator tests — which pin the `Error`-instance behaviour at `src/orchestration/chatOrchestrator.test.ts:278` — stay green unedited.

## Out of scope

- `beforeSession` escaping the `try` (its own issue, per the ticket).
- Usage accounting across tool rounds (HALEngine#93).
- The wrapper's `message` wording: the ticket pins Error-ness, single invocation, cause identity and the unchanged caller rejection, not the text; the tests deliberately leave it to the implementer.
- The other catch sites (`consultPolicy`, `saveSession`) — none of them is the `onError` seam.