# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts the provider and hooks directly. The acceptance test invokes `processMessage` with rejecting provider implementations and records actual hook arguments, covering string, object, and undefined rejections in one test.

## Done when these pass

- [ ] **reports every non-Error rejection once with its cause and preserves the caller rejection** — each rejection calls the hook exactly once with an Error preserving the original cause by identity, and still rejects to the caller with the identical value.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error values only for `onError`, retaining the original rejection for the caller; make the acceptance test green.
- [ ] Preserve existing Error instances and leave existing hook tests unedited; verify them in CI.
- [ ] Review the updated spec guarantee and add a consumer-facing CHANGELOG entry explaining the newly reported failures and unchanged caller rejection.
- [ ] Pass the repository's build, tests, typecheck, ESLint, and Prettier CI gates.

## Out of scope

- `beforeSession` placement and usage accounting across tool rounds (#93).
- Changes to hook failure behavior, provider retries, or the caller's rejection shape.
- Test-list tooling changes: the current Jest list adapter emits only id, name, and file, with no spec field. The test carries its spec anchor and the spec links directly to its declaration.