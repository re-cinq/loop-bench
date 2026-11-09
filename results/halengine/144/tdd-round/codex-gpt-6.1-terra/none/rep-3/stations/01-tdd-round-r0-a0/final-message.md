Implemented and pushed the `list_sessions` validation facet. The focused Jest test failed before the change and passed afterward; it covers pagination validation and removal of client-supplied fields. The branch is up to date with `origin/main` and its upstream.

The round had **one red test of mine** and no observed regressions. The Lore CI and coverage-graph tools were unavailable, so I could not verify the previous CI verdict or query existing coverage. The repository’s test-list script also does not emit a `spec` field; the test carries an anchor comment and a spec citation.

The ticket and branch acceptance brief specify different frame names and unsupported-store behavior; that discrepancy remains for the ticket owner or CI to resolve.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions pagination and strip unknown fields","tdd_next":"complete and export session list frame types"}}