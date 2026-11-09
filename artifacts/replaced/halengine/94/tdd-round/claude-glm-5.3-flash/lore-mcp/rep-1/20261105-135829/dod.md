# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The chat orchestrator acts as a seam, allowing us to install hooks through configuration and observe their execution when `beforeSession` throws.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws** — pins that a thrown error in `beforeSession` propagates to the caller while invoking both `onError` and `afterSession` hooks.
      `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

## Facets

- [x] Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`.
- [x] Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee for `beforeSession`. Done: the guarantee now lives in its own "When `beforeSession` throws" section (three bullets — caller rejection + both hooks, `onError`'s argument shape and the provider-never-reached assumption, and the recorded Decision that `afterSession` stays unconditional with no never-started signal), the "Measured semantics — out of scope" intro now covers only the two properties still owned by no issue, and the drifted `chatOrchestrator.test.ts#L194` citation was repointed to `#L220`.
- [x] Document in the CHANGELOG what changes for an existing consumer. Done: entry under `[Unreleased] → Changed` with a migration note.
- [x] Repair the collateral the fix commit left: 22 spec anchors it staled by inserting 26 lines above them in `chatOrchestrator.test.ts` (CI's `repoint-spec-anchors --check origin/main` gate and the changelog gate were both red on the last push), and cite the unit test it added (`onError sees the session and the thrown error when beforeSession throws`) from the spec — `re-lint/require-spec-link` fails on it once the anchors are repointed, since its old coverage was the stale `#L118`/`#L128` anchors aimed at other tests.

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)