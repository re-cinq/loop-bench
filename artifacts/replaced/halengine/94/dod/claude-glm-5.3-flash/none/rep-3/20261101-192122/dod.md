# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` (a public export) takes `hooks` and `processMessage` is the real caller path, so the acceptance tests call it today and fail on behaviour — `onError` never fires and `afterSession` never fires, while the rejection itself already reaches the caller.

## Done when these pass

- [ ] **fires onError with the session and the error, and the rejection still reaches the caller** — a throw from `beforeSession` is caught by the same `catch`/`finally` as any other failure: the caller still gets the rejection unchanged, and `onError` receives the session and the error
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **runs afterSession after a failed beforeSession, for a session none of the turn has touched** — `afterSession` fires even when `beforeSession` threw, and nothing of the turn ran before it (no user-input hook, no provider call), which is the observable basis for the spec's statement of what a cleanup hook may assume
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Red bar (this pod): both tests fail on today's code — `onError` is never called and `fired` records only `['beforeSession']`, while `outcome` already reads `'beforeSession failed'`
- [x] Spec (this pod): `specs/hal-engine-config-hooks/spec.md` replaces the recorded-flaw bullet with the new guarantee under "A turn that fails in beforeSession", citing both tests; the remaining two measured-semantics bullets stay out of scope
- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts` (the fix; both tests go green)
- [ ] CHANGELOG entry under `## [Unreleased]` saying what changes for an existing consumer: a `beforeSession` that throws now runs `onError` and `afterSession` before the rejection propagates
- [ ] Existing hook tests stay unedited and green (`src/orchestration/chatOrchestrator.test.ts`, `src/config.test.ts`) — that pins a non-throwing `beforeSession` behaving exactly as today

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue; recorded in the spec's measured semantics)
- Usage accounting across tool rounds (HALEngine#93)
- Changing what the caller observes: the rejection reaching the caller is unchanged from today, by the ticket's own acceptance criterion