Committed and pushed `3452297`. This round added one test for including the session id in list failure logs; it failed, then passed after the handler change. I also documented the WebSocket list frames and repaired the reported TypeScript cast and stale spec links. The branch is up to date and fully pushed.

Red tests: 1 written this round, now green; 0 regressions reported. CI has not judged this push yet.

The ticket and `.lore/dod.md` describe different frame names and behavior when `listFor` is absent; this round followed the checklist’s acceptance bar.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"document list_sessions and session_list in both specs","tdd_next":"acceptance green"}}