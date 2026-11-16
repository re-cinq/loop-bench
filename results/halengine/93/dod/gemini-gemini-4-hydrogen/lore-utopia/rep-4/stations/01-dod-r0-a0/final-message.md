Red acceptance tests, spec updates, and `.lore/dod.md` for `re-cinq/HALEngine#93` have been committed (`07e2754`) and pushed to `origin/loop-bench/93` (already up to date with `origin/main`).

### Changes committed
- `src/orchestration/chatOrchestrator.acceptance.test.ts`: two failing acceptance tests under `Strategy: direct` exercising `createChatOrchestrator` with scripted multi-round providers.
- `specs/hal-engine-config-hooks/spec.md`: added `## Usage reported to afterModelResponse` with citations to both new tests and the existing unedited no-tool test (`src/orchestration/chatOrchestrator.test.ts#L236`), and removed the superseded under-counting bullet from `## Measured semantics — out of scope` (`npm run spec:names`, `npm run check:spec-links`, `npm run check:spec-status`, and `--coverage` on the spec all pass with 0 findings).
- `.lore/dod.md`: Definition of Done quoting the ticket's central claim, strategy (`direct`), test targets, implementation facets, and out-of-scope items.

### Failure output
Command run: `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator usage across tool rounds › reports the sum of every provider call when a turn runs two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 600,
    -   "outputTokens": 60,
    -   "totalTokens": 660,
    +   "inputTokens": 300,
    +   "outputTokens": 30,
    +   "totalTokens": 330,
      }

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:27:22)

  ● ChatOrchestrator usage across tool rounds › counts every reporting round when some rounds omit usage, and passes undefined when none report

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "partial": Object {
    -     "inputTokens": 12,
    -     "outputTokens": 3,
    -     "totalTokens": 15,
    +     "inputTokens": 5,
    +     "outputTokens": 1,
    +     "totalTokens": 6,
        },
        "unreported": undefined,
      }

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:56:35)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

### Findings
- Because acceptance criterion 2 requires `receives collected response text and usage` (`src/orchestration/chatOrchestrator.test.ts#L236`) to stay unedited—and it asserts deep equality of the 3rd `afterModelResponse` argument against `{inputTokens, outputTokens, totalTokens}`—the summed `UsageMetadata` must remain the 3rd argument (any optional per-round breakdown, if chosen, would need to be an additional parameter rather than wrapping the 3rd argument).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}