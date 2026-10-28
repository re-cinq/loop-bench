Implemented and pushed commit `976f347` with the additive conversation-list types and `list_conversations` validation. The test I wrote failed before implementation and passed after the refactor. I also fixed the three lint findings from the prior CI report. The branch is up to date with its upstream.

I ran no acceptance tests. **Red tests:** 1 written by me; **regressions:** 0 identified. The prior CI brief truncated the test failure details, and Lore could not retrieve that branch’s CI results.

Next round: wire the conversation-list handler and history opt-in/error behavior, then finish the config and documentation requirements.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add conversation-list wire types and validate list_conversations frames","tdd_next":"Wire the new names into the handler and implement history opt-in/error behavior"}}