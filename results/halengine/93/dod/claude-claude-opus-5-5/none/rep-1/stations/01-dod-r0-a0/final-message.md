I wrote two acceptance tests for #93 and both fail for the reason the ticket gives. When a turn calls tools, `afterModelResponse` only gets the usage from the last provider call. The branch is pushed, already up to date with `origin/main`, and not ahead of its upstream.

**Strategy: `direct`.** The tests call the real `createChatOrchestrator` with a scripted provider and a real `ToolRegistry`. They read what `afterModelResponse` receives over a turn with two tool rounds, where the three provider calls report 110, 220 and 440 tokens.

**Tests** (`src/orchestration/turnUsage.acceptance.test.ts`):
1. **covers every provider call of a turn driven through two tool rounds** — expects the sum, 700/70/770.
2. **counts the rounds that reported usage, and reports none when no round did** — when one round reports nothing, the other rounds still add up (500/50/550). When no round reports anything, the hook gets `undefined`.

The test for a turn with no tool calls, **receives collected response text and usage** in `src/orchestration/chatOrchestrator.test.ts`, is listed as a test that must stay green without being edited. It passes today.

Failure output:
```
● the usage afterModelResponse reports for a turn › covers every provider call of a turn driven through two tool rounds
    -   "inputTokens": 700,
    -   "outputTokens": 70,
    -   "totalTokens": 770,
    +   "inputTokens": 400,
    +   "outputTokens": 40,
    +   "totalTokens": 440,
● ... › counts the rounds that reported usage, and reports none when no round did
    -     ObjectContaining { "inputTokens": 500, "outputTokens": 50, "totalTokens": 550 }
    +     Object { "inputTokens": 400, "outputTokens": 40, "totalTokens": 440 }
Tests:       2 failed, 2 total
```
In both cases the hook received only the last round's numbers.

**Choices worth knowing:**
- **Shape of the answer left open.** The ticket asks for a choice between passing one summed `usage` and passing the sum plus a per-round breakdown. The tests use `toMatchObject` and `objectContaining` on the usage argument, so either shape passes. The decision and the reason for rejecting the other belong on the issue.
- **One test merged into another.** I first wrote "nothing reported gives `undefined`" as its own test, but it already passes today. It now lives inside test 2, so every test is red.
- **Not tested here.** The criterion that the hook's type makes the answer unambiguous can't be tested at runtime, so it is listed as a step for review. The changelog line is also left to the implementing round.

**Spec:** in `specs/hal-engine-config-hooks/spec.md`, the old line recording the under-count is replaced by a new section with two statements, each linked to its test. `check-spec-links` and `check-spec-anchor-names` both pass, and the `Status` row is untouched.

Commits: `b7b8b05` (tests, spec, `.lore/dod.md`) and `5cc680b` (formatting the DoD file).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}