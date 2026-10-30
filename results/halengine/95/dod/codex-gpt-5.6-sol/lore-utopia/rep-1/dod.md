# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — The orchestrator's public `processMessage` entry point accepts a provider and installed hooks, so the failure and both observer boundaries can be exercised directly without changing production code.

## Done when these pass

- [ ] **calls onError with a cause-preserving Error and rethrows each original provider rejection** — A provider rejection that is a string, plain object, or `undefined` reaches `onError` once as an `Error` whose cause is the original value, while the caller receives that original value unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize every caught non-`Error` rejection to an `Error` for `onError`, preserving the original rejection as `cause`.
- [ ] Keep the rejection rethrown to the caller unchanged.
- [ ] Preserve the existing same-instance behavior for rejections that are already `Error` objects.
- [ ] Replace the spec's measured-flaw wording with the guaranteed behavior and add the consumer-visible change to the changelog.
- [ ] Pass the repository's build, test, typecheck, ESLint, and Prettier checks in CI.

## Out of scope

- `beforeSession` escaping the orchestrator's `try` block.
- Usage accounting across tool rounds (HALEngine#93).