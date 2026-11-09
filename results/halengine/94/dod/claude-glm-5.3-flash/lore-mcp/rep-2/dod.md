# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(...).processMessage(session)` is the real entry point, and the hooks are plain functions a test installs and records. The acceptance tests call it today and fail on behaviour (neither hook fires), not on a missing module.

The tests live in `src/orchestration/chatOrchestrator.acceptance.test.ts` and were run in this pod with
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts` —
two red, one green. The green one is green **by design**: it pins criterion 1 ("unchanged from today") so the
implementing round cannot satisfy the ticket by swallowing the rejection while wiring up the hooks. CI runs the whole
file on every push as the "Test (with coverage floor)" step (`npm run test:coverage`) of the `Verify` job in
`.github/workflows/ci.yml`.

The spec edit owed by the ticket is already in this commit: `specs/hal-engine-config-hooks/spec.md` replaces the
recorded-flaw line with a new "A throw from beforeSession" section citing these tests, and states the answer to the
question the ticket says to decide — `afterSession` runs even after a failed `beforeSession`, and a cleanup hook can
assume nothing about how much of the turn happened. The spec's `| Status |` row was not touched. This repo has no
`scripts/spec-links/reanchor.mjs`; its tool is `scripts/repoint-spec-anchors.mjs`, which skips whole any spec whose
anchor set differs from the base ref (this one now does), so the three new `#Lnn` anchors were hand-verified onto
their `it(` declaration lines.

## Done when these pass

- [ ] **still rejects the caller with the same error** — criterion 1: a throwing `beforeSession` still rejects the caller with the error thrown; green today, must stay green through the fix
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reaches onError with the session and error any other orchestrator failure carries** — criterion 2: `onError` fires for the throw, handed the same session and error as any other failure; red today
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **runs afterSession after onError, handing back the session exactly as beforeSession was handed it** — criterion 3: `afterSession` fires after `onError`, same session object, entries untouched, no model round run; red today
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] criterion 4 stays satisfied: the non-throwing `beforeSession` behaviour pinned by the existing, unedited tests remains green — `chatOrchestrator.test.ts` "called before anything else" and "calls all hooks in correct order", `config.test.ts` "fires the lifecycle hooks in documented order for a session that completes without error"

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts` (currently line 91, above the `try` on line 93); the existing `catch`/`finally` already do everything the tests ask
- [ ] Confirm the `finally` now reaching a failed `beforeSession` is wanted on that path: `commitStreamingEntries` and `saveSession` run for the first time on it (no-op for an untouched session, but part of the guarantee)
- [ ] CHANGELOG entry saying what changes for an existing consumer: `onError` and `afterSession` now fire for a `beforeSession` throw, and `afterSession` runs against a session the turn never started

## Out of scope

- The `instanceof Error` gate on `onError` in the `catch` (its own issue)
- Usage accounting across tool rounds — `lastUsage` passed to `afterModelResponse` (HALEngine#93)
- `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint`, `npm run prettier:check` — CI's `Verify` job is the judge; this pod ran only the acceptance file and Prettier