# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — Call the real orchestrator through `processMessage`, which consumes `processMessageStream`, with deployer hooks and the built-in mock provider. The test observes the original rejection, error-hook arguments, cleanup, and hook order without doubles.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — The original Error reaches the caller after onError and afterSession receive the same session; partial setup is released and later turn hooks never run.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move beforeSession into the existing error-handling boundary so the original Error reaches onError and the caller.
- [ ] Run afterSession after partial setup fails, before the caller sees the rejection.
- [ ] Keep the spec's partial-setup guarantee and add a consumer-facing CHANGELOG entry for the newly invoked hooks.
- [ ] Preserve existing success-path tests unedited and satisfy the repository CI checks.

## Out of scope

- The instanceof Error gate for non-Error rejections.
- Usage accounting across tool rounds (#93).
- New hook parameters or guarantees when error/cleanup hooks themselves throw.