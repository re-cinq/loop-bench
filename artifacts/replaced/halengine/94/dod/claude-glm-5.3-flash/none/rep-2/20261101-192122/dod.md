# Definition of Done

> "`beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs."

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes `OrchestratorHooks` and the tests call the real `processMessage` entry point with a throwing `beforeSession` hook, a recording provider and no doubles of the orchestrator. Both tests are red today because `onError` and `afterSession` never fire on that path; the production fix is moving the `beforeSession` call inside the existing `try`.

## Done when these pass

- [ ] **a throwing beforeSession runs onError then afterSession and still rejects with the thrown error** — pins the whole hook contract of the fix: the caller still receives the thrown error as the rejection, `onError` runs with the same session and error objects any other orchestrator failure delivers, and `afterSession` runs after it
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands afterSession a session the turn never touched** — pins what a cleanup hook can assume about how much of the turn happened: the entries are exactly what the caller passed in and the provider was never called, so `afterSession` can tell "never started" from "failed part-way"
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] acceptance tests written and red for the ticket's claim (this commit)
- [x] `specs/hal-engine-config-hooks/spec.md` replaces its recorded-flaw line with the new guarantee, stating what a hook can assume about how much of the turn happened (this commit)
- [ ] move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts` — the one production edit owed
- [ ] both acceptance tests green; the existing hook tests stay unedited and green (`src/orchestration/chatOrchestrator.test.ts`, `src/config.test.ts`)
- [ ] `CHANGELOG.md` gains an entry under `## [Unreleased]` saying what changes for an existing consumer: `afterSession` now fires after a failed `beforeSession`, so a release hook runs on a session the turn never touched

## Out of scope

- the `instanceof Error` gate on `onError` — its own issue
- usage accounting across tool rounds — HALEngine#93
- any new hook or flag to distinguish "never allocated" from "allocated and finished": the decided answer is that hooks read the session, which the second statement pins