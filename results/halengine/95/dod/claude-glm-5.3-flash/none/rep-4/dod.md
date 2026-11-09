# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator`'s hook set. An acceptance test drives a real provider generator that throws a non-Error through the orchestrator's own `catch` and observes `onError` and the caller's rejection. No new module and no characterization needed; the existing hook tests already walk this path for `Error` values.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is the rejected string, and still rejects the caller with that string** — a provider whose generator throws a string reaches `onError` exactly once, with an `Error` declaring `cause` set to that string, the hook receives the turn's session, and the caller's rejection is still the original string
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **wraps a rejection with a plain object and with undefined the same way, and still rejects the caller with the original value** — the same contract for a plain object (identity preserved through `cause` and through the caller boundary) and for `undefined`, including that the wrapper declares a `cause` at all
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Acceptance test: string rejection calls `onError` once with a wrapper whose `cause` is the string; caller rejection unchanged (red today: `onErrorCalls: 0`)
- [ ] Acceptance test: plain-object and `undefined` rejections call `onError` wrapped the same way (red today: `onErrorCalls: 0`)
- [ ] `src/orchestration/chatOrchestrator.ts` catch: drop the `instanceof Error` gate; wrap a non-Error in an `Error` with the original as `cause` before handing it to `onError`; rethrow the ORIGINAL value so the caller boundary keeps today's shape; an `Error` rejection reaches the hook as the same instance, not a wrapper
- [ ] Existing Error-path tests stay green and unedited — `called with session and error when stream fails`, `error still propagates after onError hook`, `runs onError then afterSession when it throws, and still rejects to the caller` (ticket criterion 3 pins itself on these)
- [ ] `specs/hal-engine-config-hooks/spec.md` recorded-flaw section replaced with the new guarantee, cited to the acceptance tests (done in the dod commit; re-run `node scripts/check-spec-anchor-names.mjs` if the test file's lines move)
- [ ] CHANGELOG: a `### Fixed` bullet under `## [Unreleased]` saying what changes for an existing consumer — `onError` now also fires for rejections that are not `Error`s, wrapped with the original as `cause`, so failure counts and paging can only go up, never silent

## Out of scope

- `beforeSession` escaping the `try` (its own issue) and usage accounting across tool rounds (HALEngine#93)
- Changing the value the caller receives: the re-thrown rejection stays exactly what it is today, wrapper or not
- The `onError` hook signature — it stays `(session, error: Error)`; wrapping is what keeps it compilable