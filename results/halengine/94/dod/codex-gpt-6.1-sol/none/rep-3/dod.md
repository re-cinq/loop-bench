# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` consumes the real streaming lifecycle. Real configured hooks and the built-in provider exercise this seam without test doubles.

## Done when these pass

- [ ] **reports a beforeSession failure and runs cleanup before rejecting with the original error** — preserves error identity, calls `onError` with the original session and error, then awaits cleanup before rejecting; later turn work never starts.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Bring `beforeSession` into the existing error and cleanup lifecycle so the acceptance test passes.
- [ ] Preserve the existing successful-session tests without editing them.
- [ ] Keep the spec guarantee explicit: cleanup can follow incomplete initialization and must tolerate resources that were never acquired.
- [ ] Add a consumer-facing CHANGELOG entry explaining that initialization errors now invoke error and cleanup hooks.
- [ ] Let CI verify the existing tests, build, typecheck, lint and formatting requirements.

## Out of scope

- Non-Error rejections bypassing `onError`, usage accounting across tool rounds (#93), and new hook arguments or session-start flags.
- The remaining measured semantics in the spec are separate issues, not acceptance criteria for #94.