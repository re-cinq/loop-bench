# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(..., {hooks}).processMessage(session)` is the real entry point a deployer's hooks flow through, and it accepts a throwing `beforeSession` today. The test calls it and fails on observed behaviour (which hooks ran), not on structure.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws** — a throwing `beforeSession` still reaches the caller as the same rejection, `onError` fires with that same session and error object before `afterSession` fires, and both see a session the turn left untouched (no provider call, no committed entry). Fails today with `callOrder: ['beforeSession']` — exactly the claim.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

  Run it with the suite's ESM flag: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call at `src/orchestration/chatOrchestrator.ts:91` inside the `try` opened two lines below, so the throw reaches the existing `catch` (→ `onError`) and `finally` (→ `commitStreamingEntries`, `afterSession`, `saveSession`)
- [ ] The acceptance test above goes green with `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` UNEDITED — a non-throwing `beforeSession` must behave exactly as today, and those files already pin that
- [ ] CHANGELOG entry under `## [Unreleased]`, written for a consumer: on a failed `beforeSession` the engine now also runs `afterSession` (and saves the session) instead of skipping both
- [ ] Spec guarantee statement is already in place at `specs/hal-engine-config-hooks/spec.md` line 17 (added by the dod commit, replacing the recorded-flaw line); check its wording still matches what shipped. Re-run `node scripts/repoint-spec-anchors.mjs` after the source edit — moving line 91 shifts the `chatOrchestrator.ts#Lnn` anchors below it, and this spec is skipped by the script (its anchor set differs from base), so verify the two remaining `#Lnn` anchors in Measured semantics by hand
- [ ] CI green: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`), `npm run prettier:check`

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue): a `beforeSession` that throws a non-`Error` rejection still bypasses `onError` after this fix
- Usage accounting across tool rounds (HALEngine#93)
- Whether a `sessionStore` save SHOULD run on this path — moving the call makes the existing `finally` save the session after a failed `beforeSession`; nothing here pins or judges that, it is a consequence for review to look at