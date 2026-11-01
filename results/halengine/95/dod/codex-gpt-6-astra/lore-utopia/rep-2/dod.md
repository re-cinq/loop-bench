# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `AIProvider` and lifecycle hooks. Drive its real `processMessage` entry point with rejected provider streams and record the error callback and caller outcome.

## Done when these pass

- [ ] **reports non-Error provider rejections once with their cause and preserves the caller rejection** — covers string, plain object, and `undefined`, including an own `cause` property for `undefined`, plus existing `Error` identity; verifies exactly one callback and unchanged rejection identity at the caller boundary.
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Normalize non-`Error` rejections only for `onError`, retaining the raw value as `cause`; leave the caller rejection unchanged.
- [ ] Preserve existing `Error` identity and leave existing hook tests unedited.
- [ ] Keep the linked spec guarantee and add a consumer-facing CHANGELOG entry explaining that previously omitted failures now reach `onError`.
- [ ] Pass the repository's build, tests, typecheck, ESLint, and formatting gates in CI.

## Out of scope

- Changes to `beforeSession` placement, usage accounting across tool rounds, retry policy, or failures thrown by `onError` itself.
- Error message wording for newly wrapped values.