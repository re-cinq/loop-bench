# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real lifecycle with installed hooks and the shipped in-process provider. One failing initialization test covers rejection identity, error reporting, cleanup order and the absence of later turn hooks.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — The original error reaches the caller after onError and afterSession receive the same session; cleanup must tolerate partial initialization.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move beforeSession into the existing lifecycle error boundary so the acceptance test passes.
- [ ] Keep existing successful-session tests unedited and green.
- [ ] Retain the spec guarantee that cleanup may follow partial initialization; add a consumer-facing CHANGELOG entry for the changed failure path.
- [ ] Pass the repository CI checks, including build, tests, typecheck, eslint and formatting.

## Out of scope

- Non-Error rejection reporting and usage accounting across tool rounds.
- Failures thrown by onError or afterSession themselves.
- The other two measured semantics in the linked spec are explicitly outside this ticket.
- The current Lore list adapter emits only id, name and file; the test carries its spec anchor as a comment, but extending the adapter to emit spec metadata is separate tooling work.