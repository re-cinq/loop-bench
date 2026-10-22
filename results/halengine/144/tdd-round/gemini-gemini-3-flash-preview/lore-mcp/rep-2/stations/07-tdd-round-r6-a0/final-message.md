I fixed the CI failures reported in the previous round, specifically the `eslint` and `spec-names` errors regarding drifted spec anchors. These failures occurred because the line numbers in the specification files no longer matched the actual test declarations in `src/transport/ws/messageHandler.test.ts`.

I used the project's own repair script, `node scripts/check-spec-anchor-names.mjs --fix`, which correctly repointed 81 citations across the codebase, including the 6 specifically mentioned in the CI report. I verified the fix by running the check script again and ensuring it reported no findings. I also verified that the specification files adhere to the project's formatting standards.

Since all functional facets in `.lore/dod.md` were already marked as complete, and the CI failures were the only blockers identified in the round brief, the ticket is now ready for a final CI run to confirm the acceptance tests are green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI failures (repointed drifted spec anchors)","tdd_next":"acceptance green"}}