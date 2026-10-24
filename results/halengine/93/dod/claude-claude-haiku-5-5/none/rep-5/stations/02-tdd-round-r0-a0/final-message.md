Branch is pushed and up to date. Here's what this round did:

- Added `sumUsage` to `orchestratorHelpers.ts` — combines two `UsageMetadata | undefined` values by element-wise addition, treating `undefined` as identity
- Replaced `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` with `lastUsage = sumUsage(lastUsage, outcome.usage)`, so every round contributes to the total
- Added 4 unit tests for `sumUsage` in `orchestratorHelpers.test.ts` (all green; 24 existing chatOrchestrator tests untouched)
- Updated `specs/hal-engine-config-hooks/spec.md` to replace the under-counting bullet with the new summed-usage behaviour, cited against the new test
- Added a CHANGELOG entry under `[Unreleased] > Changed` describing the behaviour change for existing consumers
- Ticked all 5 DoD facets

No regressions; 0 red tests mine, 0 regressions.

Unrelated smell noticed but not acted on: the `chatOrchestrator.ts` code-link in the spec (`[chatOrchestrator.ts#L148]`) drifted by +1 due to the new import line — it was already a non-test prose link, not checked by `spec:names`, and the statement it lived in has been replaced entirely.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum usage across tool rounds in chatOrchestrator","tdd_next":"acceptance green"}}