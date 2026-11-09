# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real lifecycle with the shipped mock provider and real hooks. One acceptance test observes error identity, hook arguments, order, and release of a partially allocated resource.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — setup failure reports the original error and session, runs cleanup before rejection, and never starts user-input or model processing.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move setup into the existing error and cleanup boundary so the acceptance test passes.
- [ ] Preserve existing success-path tests without editing them.
- [ ] Retain the spec decision that cleanup tolerates partial setup using hook-owned state; add a consumer-facing CHANGELOG entry.
- [ ] Pass the repository CI checks, including build, tests, typecheck, ESLint, and formatting.

## Out of scope

- Non-Error rejections and the onError instanceof Error gate.
- Usage accounting across tool rounds (#93).
- New hook arguments or a session-started flag; hooks can track their own allocation state.