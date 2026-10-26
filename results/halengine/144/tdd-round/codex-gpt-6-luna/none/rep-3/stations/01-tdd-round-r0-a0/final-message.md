Implemented and pushed the `list_sessions` validator facet in commit `f3f5a66`. The test I wrote failed first, then passed after the implementation and formatting. I ran no acceptance tests. No CI verdict or Lore trace tools were available in this session; no regressions are known.

There’s a naming mismatch to resolve in a later round: the ticket says `list_conversations`, while `.lore/dod.md` and its acceptance tests say `list_sessions`. The branch is clean and up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames and strip unknown fields","tdd_next":"Add the remaining list frame types, then thread sessionStore into the handler"}}