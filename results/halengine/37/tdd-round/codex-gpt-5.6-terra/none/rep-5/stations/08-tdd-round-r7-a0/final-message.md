Fixed Ajv option typing and added static-schema cache coverage with a spec citation. Pushed `d4cf45b`; branch is merged with `origin/main` and up to date.

Focused assertion passed; its wrapper exits nonzero because a single selected Jest test cannot satisfy repository-wide coverage floors. No acceptance tests, typecheck, lint, or full suite run. CI regressions: 0; red tests authored this round: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Static inputSchema compilation cache test and Ajv options typecheck repair","tdd_next":"Add the remaining registry/orchestrator tests and documentation updates"}}