# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real streaming lifecycle. One test installs allocating, throwing, error-reporting and cleanup hooks with a real Bedrock provider that is never reached; no doubles are needed.

## Done when these pass

- [ ] **awaits onError and afterSession before rejecting a failed beforeSession** — preserves rejection identity, delivers the original session and error, awaits error reporting followed by cleanup, releases the partial allocation and never starts user-input processing.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move initialization into the lifecycle error/cleanup boundary and make the acceptance test green.
- [ ] Preserve the existing successful lifecycle tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` unedited.
- [ ] Implement the linked spec guarantee: cleanup may follow incomplete initialization, with allocation state owned by the deployer.
- [ ] Add a consumer-facing CHANGELOG entry explaining the newly invoked hooks on initialization failure.
- [ ] Let CI verify build, tests, typecheck, ESLint and formatting.

## Out of scope

- Non-`Error` rejection handling, failures thrown by error/cleanup hooks, and usage accounting across tool rounds (#93).
- Unlinked measured properties concerning those separate issues are not acceptance work for #94.
- Lore's current Jest descriptor adapter emits only id/name/file, not a spec field; the test carries its spec anchor and the spec carries its inline validation link without changing production or tooling code.