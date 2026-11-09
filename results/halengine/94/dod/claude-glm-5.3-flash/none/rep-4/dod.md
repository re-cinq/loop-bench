# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `ChatOrchestratorOptions.hooks` installs real hooks on the real orchestrator and `processMessage`/`processMessageStream` are the caller path, so the tests call the production entry point and fail on behaviour. No production code was written to reach it.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and the rejection still reaches the caller** — a throwing `beforeSession` reaches `onError` with the same `(session, error)` argument shape as any other orchestrator failure, `afterSession` runs after it, the rejection still propagates unchanged, and no other hook and no provider call happens
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- [ ] **gives a stream consumer the same hooks and a session the failed turn never touched** — the same guarantee through `processMessageStream`, the entry point the WebSocket transport consumes: no chunk is emitted, the provider is never reached, and `afterSession` sees a session with no entry added, which is the "how much of the turn happened" fact the spec must state
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts` (`processMessageStream`), so a throw from it reaches the existing `catch` and `finally`
- [ ] Decide the question the ticket poses — does `afterSession` want to run after a failed `beforeSession`, and what may it assume about a session the turn never started? — and record the answer in `specs/hal-engine-config-hooks/spec.md`, replacing the first recorded-flaw bullet under "Measured semantics" with the new guarantee (do not edit the `| Status |` row; the other two flaw bullets stay)
- [ ] On that rewritten bullet, attach `([validated by: <test title>](../../src/orchestration/beforeSessionFailure.acceptance.test.ts#Lnn))` for each of the two tests above; the label must equal the test name and `node scripts/check-spec-anchor-names.mjs --fix` repoints the line numbers
- [ ] CHANGELOG entry saying what changes for an existing consumer: `onError` and `afterSession` now fire on a failed `beforeSession`, so an `afterSession` that assumes the turn started needs to handle one that never did
- [ ] Existing suite stays unedited and green: `src/orchestration/chatOrchestrator.test.ts`, `src/config.test.ts`
- [ ] `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`), `npm run prettier:check` — CI's checklist, run by CI on every push

## Out of scope

- The `instanceof Error` gate on `onError` in the `catch` — its own issue; the spec records it as a separate flaw
- Usage accounting across tool rounds (HALEngine#93)
- The other two recorded-semantics bullets in `specs/hal-engine-config-hooks/spec.md`