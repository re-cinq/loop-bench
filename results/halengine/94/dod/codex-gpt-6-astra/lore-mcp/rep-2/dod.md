# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real streaming lifecycle with consumer-installed hooks. One test uses a real Bedrock provider (never reached on failed setup), a real abortable resource, and no doubles to pin rejection identity, callback arguments, awaited order, and cleanup.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — The original Error reaches onError with the same session, afterSession releases the resource before the caller observes rejection, and later turn hooks never run.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move beforeSession into the existing try so its Error reaches the existing catch and finally; make the acceptance test green.
- [ ] Preserve existing non-throwing lifecycle tests unedited; CI verifies regressions and the full required build, test, typecheck, lint, and formatting gates.
- [ ] Retain the spec decision that afterSession runs after partial setup with no new started flag, and add a consumer-facing CHANGELOG entry explaining the new error and cleanup callbacks.

## Out of scope

- Changing the instanceof Error gate, usage accounting across tool rounds (#93), or semantics when onError or afterSession itself throws.
- Unrelated unlinked measured semantics in the spec are explicitly outside #94.
- Extending the Lore test-list adapter: it currently emits only id, name, and file, with no spec field; the test carries its spec stamp and the statement carries its named validation link.