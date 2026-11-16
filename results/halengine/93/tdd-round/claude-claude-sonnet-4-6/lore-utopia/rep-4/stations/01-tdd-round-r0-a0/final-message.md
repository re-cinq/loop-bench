Branch is up to date and pushed. The round delivered:

- **RED**: `accumulateUsage` test added to `orchestratorHelpers.test.ts` — imported a non-existent export, failing immediately.
- **GREEN**: `accumulateUsage` added to `orchestratorHelpers.ts`; sums both sides when defined, returns the defined side when one is `undefined`, returns `undefined` when both are. All 7 helper tests green.
- **REFACTOR**: `chatOrchestrator.ts` replaces `lastUsage = outcome.usage ?? lastUsage` with `totalUsage = accumulateUsage(totalUsage, outcome.usage)` and renames the local to `totalUsage`. Spec (`specs/hal-engine-config-hooks/spec.md`) gains the second statement linking to the undefined-turn acceptance test. CHANGELOG entry added describing the behaviour change. All four DoD facets ticked.

No unrelated smells acted on (none noticed).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum usage across all provider rounds (facets 1–4)","tdd_next":"acceptance green"}}