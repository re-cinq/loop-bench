Fixed the visible CI findings: removed the unused binding and deep member chain, and corrected four session-resume spec links. Formatted the edits, committed as `6d42e2b`, pushed, and confirmed the branch is up to date with its upstream. `origin/main` was already merged.

No tests were run or written this round. The round brief was truncated before the `test` and `spec-names` findings, and Lore could not retrieve them, so I can’t determine whether those failures were regressions. The acceptance tests remain for CI to judge. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the visible CI lint and session-resume trace-link findings","tdd_next":"acceptance green"}}