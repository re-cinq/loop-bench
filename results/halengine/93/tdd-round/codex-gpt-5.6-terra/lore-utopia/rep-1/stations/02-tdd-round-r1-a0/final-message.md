Closed the documentation/release-note facet and repaired all reported CI findings: trace links, aggregate-usage documentation, changelog migration note, and the empty-interface lint issue. Committed and pushed `333dfdd`; branch is current with upstream.

No local test ran: this CI-repair/doc facet wrote no new behavioral test, and acceptance tests are reserved for CI. Red tests: 0 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.","tdd_next":"Preserve the unchanged no-tool regression guard, receives collected response text and usage"}}