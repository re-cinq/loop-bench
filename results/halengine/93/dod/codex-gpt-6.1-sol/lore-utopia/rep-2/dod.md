# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator().processMessage` already exercises real tool execution and `afterModelResponse`. A scripted provider supplies distinct usage values through the real stream protocol; choose summed usage in the existing argument to preserve the direct-answer contract, rejecting a mandatory breakdown as unnecessary API surface.

## Done when these pass

- [ ] **reports turn usage across every provider call, preserving missing usage and direct turns** — two executed tool rounds plus the final answer contribute all three token fields; partial and entirely absent usage are safe, the hook fires once, and direct answers remain unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate all reported usage across provider calls rather than retaining only the latest report.
- [ ] Preserve absent usage as undefined when no call reports it, and preserve the existing unedited `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts`.
- [ ] Make the public hook's usage type unambiguously represent a turn total without public `any`.
- [ ] Retain the spec's new summed-usage contract and add a CHANGELOG entry explaining that tool-heavy turns now report larger totals; treat this as a MINOR change.
- [ ] Pass the repository's build, tests, typecheck, ESLint and Prettier CI gates.

## Out of scope

- Consumer audit or billing storage, accounting outside orchestrator provider calls, and changes to provider stop-chunk usage.
- Error-hook behaviour for thrown non-Error values, recorded separately in the linked spec.
- A required per-round breakdown: callers receive the turn sum in the existing usage argument.
- Source-text tests for type names, documentation or changelog prose; those remain implementation review and CI obligations.