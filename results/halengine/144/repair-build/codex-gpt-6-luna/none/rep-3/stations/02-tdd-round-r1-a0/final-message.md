Pushed and up to date. 

**Summary:** The CI failures were all spec citation drift — 30 line numbers shifted when prior rounds added tests above existing ones, plus one test was renamed from "answers an empty session_list..." to "answers UNSUPPORTED...". The `spec:names --fix` script repointed the 30 auto-fixable anchors; the renamed test required a manual spec statement update (changing the incorrect claim that a missing `listFor` returns an empty list to the correct behavior: it returns `UNSUPPORTED`). All DoD facets are now ticked — the implementation was complete in a prior round.

Unrelated smell noticed: the `hal-engine-conversation-list` spec's "Over the WebSocket protocol" section describes only the transport behavior, but the `hal-engine-websocket-protocol` spec duplicates two of those same citations — this redundancy could cause drift again in a future round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec citation drift blocking eslint and spec-names","tdd_next":"acceptance green"}}