The branch is up to date and the fix is pushed. The CI failure was a stale spec anchor: the spec cited `#L40` for the acceptance test but it's actually at `#L34`. Running `npm run spec:names -- --fix` updated the link automatically.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repoint stale spec anchor from #L40 to #L34","tdd_next":"acceptance green"}}