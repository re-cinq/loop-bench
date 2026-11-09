# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes `hooks` and the acceptance tests drive the real `processMessage` with a provider that rejects with the raw value, so the only thing missing is the behaviour in the `catch` at `src/orchestration/chatOrchestrator.ts:150`, which gates `onError` on `error instanceof Error`.

## Done when these pass

- [ ] **calls onError with an Error wrapping a rejection that is not an Error, and still rejects the caller with the original** — a provider rejecting with a string, with a plain object, and with `undefined` calls `onError` exactly once each time, with an `Error` whose `cause` is the original value, and the caller is still rejected with that original value unchanged. Red today: `onError` is never called (`onErrorCalls: 0, isError: false`).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands onError the rejection itself when it is already an Error, not a wrapper** — non-regression pin for acceptance criterion 3. Green today; it must stay green so the fix cannot wrap `Error` rejections too, and so the existing suite stays unedited.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] `src/orchestration/chatOrchestrator.ts` `catch`: call `onError` for every rejection — a rejection that is not already an `Error` is wrapped in one carrying the original as its `cause`; a rejection that is one is passed as-is. Keep `throw error` untouched, so the value re-thrown to the caller stays exactly what it is today. The wrapper's `message` is deliberately not pinned by the tests (`String(rejection)` is the natural choice); the pinned contract is `instanceof Error`, `cause`, call count, and the untouched rethrow.
- [ ] `CHANGELOG.md` under `## [Unreleased]` → `### Fixed`: what changes for an existing consumer — `onError` now also fires for turns whose rejection was not an `Error`, so an error-counting or paging hook starts seeing those failures.
- [x] `specs/hal-engine-config-hooks/spec.md`: done in the tests commit — the recorded-flaw section ("Measured semantics — out of scope") is replaced by the new guarantee, stated in "Installing hooks through config" and citing the two acceptance tests. Verified on this round: `Status` untouched, both `validated by` links resolve (`repoint-spec-anchors.mjs --check origin/main` and `check-spec-anchor-names.mjs` both clean).
- [ ] CI's gate goes green after the catch is fixed: `npm run build`, `npm test` (the red `Test` step currently naming `chatOrchestrator.acceptance.test.ts` is the expected state of this branch), `npm run typecheck`, `npm run eslint --max-warnings 0`, `npm run prettier:check`. CI also runs `node scripts/repoint-spec-anchors.mjs --check origin/main` and the changelog check.

## Out of scope

- `beforeSession` escaping the `try` (its own issue, per the ticket's tech notes).
- Usage accounting across tool rounds (HALEngine#93).
- The shape of the value re-thrown to the caller — the ticket pins it as unchanged, so no wrapping at the caller boundary.
- `onError`'s type signature stays `(session: ChatSession, error: Error) => Promise<void>`.