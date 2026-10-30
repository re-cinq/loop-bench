Completed and pushed commit `e2b9414`.

- Added one traced test for missing required input.
- Normalized rejection paths to `/location` with stable, non-leaking text.
- Repaired both prior CI traceability findings.
- Test result: 1 new red → green; 0 regressions.
- Branch is synchronized with its upstream.
- Next facet: remaining registry/orchestrator tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"required input rejection returns a normalized property path without invoking the executor","tdd_next":"add remaining registry and orchestrator tests, traceability links, and documentation updates"}}