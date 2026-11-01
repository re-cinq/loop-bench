# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The real orchestrator exposes both collected and streaming message entry points and accepts deployer hooks. One test exercises both using the shipped local provider, real session values, and hooks that allocate, report, and release a resource; no test doubles are needed.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — Both entry points await error reporting and cleanup with the original arguments, release partial allocations, skip user-input processing, and reject with the identical error.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move session initialization into the existing error-handling boundary and make the acceptance test green.
- [ ] Preserve existing successful-session tests unedited; CI verifies the regression suite and required build, type, lint, and formatting checks.
- [ ] Keep the spec's partial-initialization cleanup guarantee and add a consumer-facing CHANGELOG entry describing the new error and cleanup callbacks.

## Out of scope

- Non-`Error` throws bypassing `onError`, usage accounting across tool rounds, and failures thrown by error or cleanup hooks.
- New lifecycle status arguments: deployers track acquired resources themselves.
- The test-command adapter currently emits only id, name, and file, with no spec metadata support; the test carries its spec anchor in a comment and the spec carries the named validation link.