# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes any `AIProvider`, a provider whose `sendMessage` generator can `throw` any value, and `onError` is installable through `options.hooks`, so the acceptance tests call the real entry point (`processMessage`) today and fail on behaviour, not on a missing module. No doubles: the rejecting provider is a real `AIProvider` throwing real values.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is the string, and still rejects the caller with the string** — a provider rejecting with a string reaches `onError` exactly once, wrapped in an `Error` whose `cause` is that string, while the caller still receives the original string rejection (criterion 1)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is the same object, and still rejects the caller with the same object** — same guarantee for a plain-object rejection, identity preserved on both the hook side and the caller side (criterion 2)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once with an Error when the rejection is undefined, and still rejects the caller with undefined** — same guarantee for an `undefined` rejection (criterion 2)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

Criterion 3 (a rejection already `Error` reaches `onError` as the same instance, not a wrapper) is pinned by the existing tests staying green and unedited: `called with session and error when stream fails` and `error still propagates after onError hook` in `src/orchestration/chatOrchestrator.test.ts` — both verified green on this branch before any fix, and cited from the spec's new Error-path statement. The fix must not edit that file.

## Facets

- [x] Red acceptance tests for the string, plain-object and `undefined` rejection shapes (this round; all three fail today with `onErrorCalls: 0`)
- [x] Spec statement replaces the recorded-flaw line: `specs/hal-engine-config-hooks/spec.md` drops the "Measured semantics — out of scope" section and states the new guarantee, cited from the acceptance tests (this round)
- [ ] Wrap every non-`Error` rejection in an `Error` carrying the original as its `cause`, in the `catch` of `processMessageStream` in `src/orchestration/chatOrchestrator.ts`; re-throw the original value unchanged (criterion 1, 2)
- [ ] Leave the `Error` path untouched: `src/orchestration/chatOrchestrator.test.ts` stays unedited and green (criterion 3)
- [ ] CHANGELOG entry under `## [Unreleased]` → `### Fixed` saying what changes for an existing consumer (`scripts/check-changelog.sh` in CI gates it) (criterion 4)
- [ ] `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`) and `npm run prettier:check` pass — CI's Verify job runs all of them (criterion 5)

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- usage accounting across tool rounds (HALEngine#93)
- changing what the caller receives at the rejection boundary — the re-thrown value stays exactly what it is today