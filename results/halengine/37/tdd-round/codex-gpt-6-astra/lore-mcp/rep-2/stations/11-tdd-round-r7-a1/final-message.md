Blocked on CI’s reported regression: the cited commit already returns `401 Unauthorized`, and `chats.ts` matches main. Lore’s CI lookup returned “branch not found,” so I couldn’t obtain further evidence for a corrective change.

Reported reds: 0 mine, 1 regression. No files changed, no tests run, no commit pushed.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI reports a 501 response, but the cited source returns 401 and matches main; further CI details are unavailable because Lore reports branch not found."}}