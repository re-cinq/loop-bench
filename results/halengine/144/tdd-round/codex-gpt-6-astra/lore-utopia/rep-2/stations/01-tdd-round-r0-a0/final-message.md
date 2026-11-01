Pushed `55ac41e`: unpaged `list_sessions` validation strips supplied `userId`.

One new test went red, then green; no regressions observed. Acceptance tests were not run; CI history was unavailable. Branch is clean, synced, and current with main. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accept unpaged list_sessions requests and strip supplied userId","tdd_next":"Validate list_sessions pagination limits and cursors"}}