# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: hooks install through `createHalEngine({...orchestrator: {hooks}})` and `engine.orchestrator.processMessage(session)` runs the full path a deployer runs, so the acceptance test calls the real entry point and fails today on the missing `onError`/`afterSession` calls, not on a missing module.

## Done when these pass

- [ ] **still rejects the caller, and onError and afterSession both fire for it** — a `beforeSession` that throws still rejects the caller with that error, `onError` receives the session and the same error object (the shape any other orchestrator failure hands it), and `afterSession` runs after it against a session the turn never started (no entries beyond the user's own)
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

  Run it with `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts`. Do not judge by the exit code of `scripts/lore-run-test.mjs`: it adds `--coverage`, and this repo's coverage ratchet fails every single-file run even when the test passes — read the `Tests:` line instead.

## Facets

- [x] Red acceptance test through `createHalEngine`, hooks installed via `orchestrator.hooks` (committed red; it fails on `order` being `['beforeSession']` instead of `['beforeSession', 'onError', 'afterSession']`)
- [x] Spec: the new guarantee stated as two cited statements at the end of "Installing hooks through config" in `specs/hal-engine-config-hooks/spec.md`, and the recorded-flaw bullet deleted from "Measured semantics — out of scope" (intro count three → two). The `afterSession` question the ticket asks to decide is answered there: it fires, and a hook may assume the turn never started. `Status` row untouched.
- [ ] Move the `beforeSession` await at the top of `processMessageStream` in `src/orchestration/chatOrchestrator.ts` inside the `try`, so its throw reaches the existing `catch`/`finally` — one line, nothing else in the method moves
- [ ] CHANGELOG: a `### Fixed` entry under `## [Unreleased]` saying what changes for an existing consumer — `onError` and `afterSession` now also run when `beforeSession` throws, so an `afterSession` that releases what `beforeSession` allocated finally runs on exactly the path where the allocation failed, and an `onError` observer finally hears about it

## Out of scope

- The `instanceof Error` gate on `onError` — its own issue; the acceptance test throws an `Error`, so it can never pass because of that gate
- Usage accounting across tool rounds — HALEngine#93
- The non-throwing `beforeSession` path must behave exactly as today; it is pinned by existing tests that stay unedited — `fires the lifecycle hooks in documented order for a session that completes without error` in `src/config.test.ts` and the hook suites in `src/orchestration/chatOrchestrator.test.ts`