# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The public orchestrator hook seam can reject with real values into the same catch block as provider failures, without a provider double. One acceptance test exercises string, object, undefined and Error rejections through both public message entry points.

## Done when these pass

- [ ] **reports every rejection as an Error while preserving the caller rejection** — Calls onError exactly once, wraps non-Errors preserving cause identity, preserves existing Error identity, and rethrows the unchanged original.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize caught non-Error values for onError only, retaining the original rethrow and existing Error instance; keep existing Error-provider tests unedited.
- [ ] Keep the linked spec guarantee and add a consumer-facing CHANGELOG entry explaining newly reported failures and cause access.
- [ ] Pass CI build, tests, typecheck, eslint and prettier checks.

## Out of scope

- Changes to beforeSession placement, usage accounting, provider adapters, or failures thrown by onError itself.