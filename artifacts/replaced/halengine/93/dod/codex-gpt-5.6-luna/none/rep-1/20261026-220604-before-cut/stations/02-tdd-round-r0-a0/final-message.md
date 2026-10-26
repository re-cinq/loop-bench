Branch is pushed and up to date.

**Summary of this round:**
- **Red**: Added 3 failing unit tests for `accumulateUsage` in `orchestratorHelpers.test.ts`
- **Green**: Implemented `accumulateUsage` in `orchestratorHelpers.ts` (sums fields when both rounds report, preserves one side when the other is absent, returns undefined when neither reports); wired it into `chatOrchestrator.ts` replacing `lastUsage = outcome.usage ?? lastUsage`
- **Refactor**: No structural changes needed; prettier applied trailing comma
- Spec citations added in `specs/hal-engine-config-hooks/spec.md`; facet ticked in `.lore/dod.md`

The acceptance tests in `usageAggregation.acceptance.test.ts` should also turn green as a side effect of the same implementation. The next round's facets are: preserve no-tool behavior (should already be passing based on the 24 chatOrchestrator tests), public type clarity, and spec/changelog update.

Unrelated smell noticed: the chatOrchestrator.ts `Bounded by the budget gate below` comment on line 110 is multi-line prose — would normally violate `re-lint/max-comment-lines`, but it's a single-line `//` comment so it's fine. No action taken.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate each provider call's reported usage into the hook's single total","tdd_next":"Preserve the existing no-tool behavior pinned by `receives collected response text and usage`"}}