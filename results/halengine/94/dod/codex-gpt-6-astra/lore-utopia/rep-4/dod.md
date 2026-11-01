# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — Call the real orchestrator through `processMessage` with a throwing lifecycle hook and real provider and prompt-builder instances. The provider is never reached on this path; the hook owns a real allocation set and cleanup releases it.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — Pins original rejection identity, hook order and argument identities, cleanup after partial initialization, and no subsequent user-input processing.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing error-handling boundary so the acceptance test passes without changing existing successful-turn tests.
- [ ] Honor the spec's cleanup decision: `afterSession` runs even after incomplete initialization, with no new status argument; hook owners track partial allocations.
- [ ] Add a consumer-facing CHANGELOG entry explaining that error and cleanup hooks now run after failed initialization.
- [ ] Let CI verify the existing tests, build, typechecking, lint and formatting.

## Out of scope

- Changing the `instanceof Error` gate, tool-round usage accounting, or failures thrown by error/cleanup hooks themselves.
- Test discovery tooling changes: the existing Lore list script emits only id, name and file, not a spec field; the test carries its spec anchor and the spec carries its validating link.