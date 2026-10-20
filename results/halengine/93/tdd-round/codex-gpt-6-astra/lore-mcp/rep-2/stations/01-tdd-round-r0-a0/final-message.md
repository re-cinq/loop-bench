Committed and pushed `48696a0`; branch is clean and current with main.

One new test went red, then green. Accumulation handles missing usage. Next: wire it into the hook and clarify the public type.

Regressions: unknown—CI/coverage queries returned HTTP 403. Acceptance tests were not run. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pure usage accumulation across reported rounds and gaps","tdd_next":"Wire accumulator into the orchestrator and expose an explicit total-usage contract"}}