Committed and pushed the named `TotalTurnUsage` hook contract, and fixed the spec link reported by CI. The branch is up to date with `main` and its upstream.

The focused Jest test passes, but it was **already green before the type change** because Jest did not check the type-only import; CI’s typecheck still needs to verify that contract. Red tests: 0 written here, 0 regressions. No unrelated issues were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Name aggregate hook usage in the public type","tdd_next":"Preserve the unchanged no-tool regression guard"}}