# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted provider, real tool registry and hook. Choose the summed `usage` argument: it preserves the direct-answer shape and serves billing and budgeting without introducing a per-call breakdown surface.

## Done when these pass

- [ ] **reports whole-turn usage across tool rounds while preserving absent usage and direct answers** — known distinct counts cover all provider calls, omitted usage, no reported usage and direct answers; hook fires once per turn.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Sum each reported provider round's input, output and total tokens, keeping undefined when nothing reports.
- [ ] Keep the existing `receives collected response text and usage` test unedited and green.
- [ ] Make the public hook signature explicitly identify whole-turn summed usage without any public `any`.
- [ ] Retain the new spec semantics, record why the per-round breakdown alternative was rejected, and add a consumer-facing CHANGELOG entry and MINOR version bump for larger recorded usage on tool turns.
- [ ] Pass CI's build, tests, typecheck, ESLint and Prettier checks; no source-text tests for prose or signature naming.

## Out of scope

- Consumer audit/billing storage, calls outside the orchestrator, provider stop-chunk usage shapes and the separately recorded non-Error rejection behaviour.