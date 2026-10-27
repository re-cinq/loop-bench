Completed one red–green–refactor round for required-property rejection. The new registry test failed before the implementation and passed after it. **Red tests: 1 yours, 0 regressions**; CI had no verdict available for the branch.

Committed and pushed `f04a5d7`; merged `origin/main` (already up to date) and confirmed the branch is synced. The next facet is compiling and caching schemas. I did not run the acceptance suite, typecheck, lint, or build.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reject required-property input before tool execution","tdd_next":"compile static schemas at registration and cache dynamic schemas"}}