# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(provider, promptBuilder, undefined, {hooks})` is the real entry point and `processMessage` flows through the `catch` that gates `onError`. The acceptance tests install a recording `onError` and hand the orchestrator a provider whose `sendMessage` rejects with a string, a plain object, and `undefined`, so the gate's bypass is observed at the public surface with no mock of the orchestrator itself.

## Done when these pass

- [ ] **calls onError for a rejection that is a string, wrapping it as the cause, and still rejects the caller with that string** — onError fires exactly once with an `Error` whose `cause` is the thrown string while the caller still receives the string; today the `instanceof Error` gate drops the hook call entirely (`calls: 0`) while the rejection still propagates
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError the same way for rejections that are a plain object and undefined** — the same guarantee for the other two non-Error shapes the ticket names, with the plain object preserved by identity as the `cause` and `undefined` still rejecting the caller
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In the `catch` of `processMessageStream` (`src/orchestration/chatOrchestrator.ts` ~L150), drop the `error instanceof Error` gate: call `onError` with `error` directly when it is already an `Error`, otherwise wrap it in one that carries the original as `cause`; still `throw error` unchanged so the caller's rejection value keeps its shape. This is the change that turns both tests green.
- [ ] A rejection that is already an `Error` reaches `onError` as the same instance, not a wrapper — pinned by `src/orchestration/chatOrchestrator.test.ts` staying green and UNEDITED (the `onError` describe block and the `error path calls onError then afterSession` test). The wrap must touch only the non-Error branch; `spec.md` states this as the same-instance guarantee.
- [ ] `specs/hal-engine-config-hooks/spec.md` replaces its recorded-flaw line with the new guarantee — done by this commit: the "Measured semantics — out of scope" section is gone and the guarantee bullet now cites the acceptance tests.
- [ ] Add the `CHANGELOG.md` entry under `## [Unreleased]` (### Fixed) saying what changes for an existing consumer: `onError` now also fires for rejections that are not `Error`s, wrapped with the original as `cause`; the caller's rejection value is unchanged. `scripts/check-changelog.sh` starts demanding this the moment the `src/` change lands, since it diffs `src/` against the base ref.

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- usage accounting across tool rounds (HALEngine#93)
- changing the rejection value the caller sees, or pinning the wrapper Error's message wording — the ticket fixes neither, so the tests assert only Error-ness, `cause` identity and caller identity