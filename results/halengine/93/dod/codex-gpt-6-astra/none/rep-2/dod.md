# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real round loop, tool registry, and lifecycle hook. The ticket explicitly calls for a scripted provider with known counts; the tests supply that provider through the existing interface without mocking engine code.

## Done when these pass

- [ ] **reports the sum of every provider call across two tool rounds** — one hook report includes all three provider calls and two executed tools.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **counts reported rounds around missing usage and reports nothing for an unmetered turn** — missing first, middle, or final usage never erases reported counts, and a subsequent unmetered turn reports undefined.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Sum all three usage fields across provider rounds, preserving undefined when no round reports usage and resetting totals per turn.
- [ ] Preserve the existing unedited `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` for direct answers.
- [ ] Expose the sum semantics through a named turn-total type and parameter in the public hook signature, with no any; retain the single usage argument as decided in the spec.
- [ ] Add a MINOR version bump and CHANGELOG entry explaining the larger totals existing consumers will record; the spec now defines the intended aggregate contract and records why a breakdown was rejected.
- [ ] Pass CI's build, test, typecheck, ESLint, and formatting gates.

## Out of scope

- Consumer billing/audit storage, accounting outside orchestrator provider calls, and stop-chunk usage shapes.
- The spec's unrelated non-Error rejection behaviour.
- Source-text tests for type names or release prose: those facets are reviewed in the implementation diff and CI.
- Changes to the Lore descriptor runner: it currently emits only id/name/file; spec anchors are stamped in test comments and linked from the spec, but the runner has no spec-field extraction support.