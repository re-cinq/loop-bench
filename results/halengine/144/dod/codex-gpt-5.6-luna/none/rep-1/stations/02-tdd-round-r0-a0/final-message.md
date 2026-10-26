Branch is pushed and up to date.

**Round summary:**
- **Facet closed:** Add the additive message and wire types plus validation for list requests and conversation summaries. Added `ConversationCursor`, `ListConversationsMessage`, `ConversationSummary`, `ConversationListMessage` to `messages.ts`; implemented the `list_conversations` validation case in `validation.ts` with `limit` (integer 1–200) and composite `before`-cursor checks.
- **Facet next:** Dispatch enabled list requests outside the per-session turn lock using the authenticated socket user and store paging options.
- **Out-of-scope smells noted:** None observed in changed files.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add additive message types and validation for list_conversations","tdd_next":"Dispatch enabled list requests outside the per-session turn lock using ws.userId and store paging options"}}