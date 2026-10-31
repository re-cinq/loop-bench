# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real lifecycle entry point and exposes the caller rejection plus the configured hooks. The acceptance test drives that seam with the package's mock provider.

## Done when these pass

- [ ] **reports and cleans up a rejected beforeSession before preserving its original rejection** — a failed `beforeSession` reaches `onError` and `afterSession` in order, passes each the same session/error values, skips later lifecycle work, and preserves the original caller rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing `try`/`catch`/`finally` lifecycle path.
- [ ] Preserve the original rejection after `onError` and `afterSession` finish.
- [ ] Keep the lifecycle-error guarantee and its cleanup-boundary assumption in the config-hooks spec.
- [ ] Add the consumer-facing lifecycle error change to the Unreleased changelog.

## Out of scope

- Calling `onError` for non-`Error` throws and usage accounting across tool rounds.