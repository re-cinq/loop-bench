# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` takes any `AIProvider`, so a provider whose `sendMessage` generator throws a non-`Error` value drives the real `catch` through the public `processMessage` entry point, and the tests fail today on behaviour (`onErrorCalls: 0` while the caller still receives the original rejection), not on a missing import or fixture.

## Done when these pass

- [ ] **reports a string rejection to onError once as an Error carrying the string as its cause, and rejects the caller with the string** — criterion 1: exactly one `onError` call, an `Error` whose `cause` is the string, and the caller's rejection still the original string. Red today with `onErrorCalls: 0`.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports a plain-object rejection the same way: onError once, an Error carrying the object as its cause, the caller receiving the object** — criterion 2, object shape; both the `cause` and the caller's rejection asserted by identity (`===`).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports an undefined rejection the same way: onError once, an Error whose cause is undefined, the caller still rejected with undefined** — criterion 2, `undefined` shape.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **passes a rejection that is already an Error to onError and the caller as the same instance, not a wrapper** — criterion 3's "same instance, not a wrapper" half. Green today — it is a guard, not the red bar: the existing `src/orchestration/chatOrchestrator.test.ts` pins an `Error` rejection only by message, which a wrapper copying the message would still satisfy; this one pins instance identity on both sides and must stay green through the fix.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- In the `catch` in `src/orchestration/chatOrchestrator.ts` (~L149): when `onError` is installed, call it for every rejection; wrap a value that is not already an `Error` in one carrying the original as `cause`; keep `throw error` re-throwing the original value so the caller boundary is unchanged. (The red-green pair: the three red tests go green, the identity guard stays green.)
- Leave `src/orchestration/chatOrchestrator.test.ts` unedited and green — criterion 3's own pin.
- `specs/hal-engine-config-hooks/spec.md`: the recorded-flaw section is already replaced by the four guarantee statements citing the acceptance tests (committed here). Nothing further owed there.
- Add a `## [Unreleased]` → `### Fixed` CHANGELOG entry saying what changes for an existing consumer: a rejection that is not an `Error` now reaches `onError` as an `Error` wrapping it, while the rejection the caller sees is unchanged. CI enforces this step — `bash scripts/check-changelog.sh` in the Verify job fails once `src/` changes without it.
- Criterion 5 (`npm run build`, `npm test`, `npm run typecheck`, `npm run eslint --max-warnings 0`, `npm run prettier:check`) is CI's `Verify` job in `.github/workflows/ci.yml`.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- The wrapper `Error`'s `message` wording — the ticket owns the seam, not the prose, so no test pins it.
- Other `catch` sites (`consultPolicy`, `saveSession`) that already handle non-`Error` values.