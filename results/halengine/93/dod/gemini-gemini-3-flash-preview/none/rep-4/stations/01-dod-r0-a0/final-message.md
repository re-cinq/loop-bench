I have defined the **Definition of Done** for ticket #93 "Report usage across every tool round, not just the last". I have written the smallest set of acceptance tests that cover the core requirement: accumulating token usage across multiple provider rounds during a single tool-augmented turn.

### Triage & Strategy
**Strategy: `direct`** — A clear seam exists in the `afterModelResponse` orchestrator hook. By using a scripted provider that returns known, different token counts across multiple rounds, the acceptance test can directly observe whether the orchestrator correctly sums these values before calling the hook.

### Acceptance Tests
I created a new test file `src/orchestration/usage-accumulation.acceptance.test.ts` with the following tests:
- **reports summed usage across multiple tool rounds** — Verifies that a turn with two tool rounds sums the usage correctly (e.g., 15 + 30 = 45 tokens).
- **reports correct usage for single round turn** — Ensures the common path of a single provider call still reports its usage correctly.
- **ignores rounds with no usage without zeroing total** — Confirms that if some rounds lack usage data, the total still includes the rounds that provided it.
- **reports undefined if no round reported usage** — Ensures that if no provider call reports usage, the final value is `undefined` rather than a zeroed object.

### Failure Output
The tests fail as expected, demonstrating that currently only the last round's usage is reported:
```
FAIL src/orchestration/usage-accumulation.acceptance.test.ts
  ● Usage accumulation (acceptance) › reports summed usage across multiple tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 30,
    -   "outputTokens": 15,
    -   "totalTokens": 45,
    +   "inputTokens": 20,
    +   "outputTokens": 10,
    +   "totalTokens": 30,
      }
```

### Traceability
- Updated `specs/hal-engine-config-hooks/spec.md` to reflect the new summed usage behavior, linked to the new acceptance test.
- Added a `Changed` entry to `CHANGELOG.md` explaining the behavior change and its impact on consumers (larger numbers for tool-heavy turns).
- Recorded the plan and tests in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}