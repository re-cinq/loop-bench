# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage(session)` exercises the real streaming implementation and its hooks. One acceptance test uses a real Bedrock provider (never reached on this failure path), a real prompt builder, and application hooks without doubles.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — Preserves rejection identity, awaits error reporting with the same session and error, then awaits cleanup of partial allocations before the caller resumes; input processing never starts.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move session initialization into the existing error and cleanup boundary so the acceptance test passes.
- [ ] Preserve existing successful-session tests unedited; CI runs the regression suite.
- [ ] Honor the spec's cleanup contract: initialization may be partial, and hooks track their own allocations; add the consumer-facing CHANGELOG entry when implementing the change.

## Out of scope

- Non-Error rejection handling, failures in error/cleanup hooks, usage accounting across tool rounds (#93), and new hook arguments.
- Test discovery tooling changes: `.lore/test-commands.yml` uses `scripts/lore-list-tests.mjs`, which currently emits only id/name/file, without a spec field; the acceptance test carries its spec anchor and the spec links back to its declaration.