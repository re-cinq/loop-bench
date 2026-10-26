Branch is pushed and up to date. Fixed the CI failures by running `spec:names --fix` which reanchored 76 stale spec citations across 7 spec files — all were off by one line due to an insertion in the previous round. The eslint `require-spec-link` failures and the `spec-names` check failures should both be resolved.

Unrelated smell observed: the `specs/hal-engine-conversation-list/spec.md` documentation facet is still open.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI: reanchor 76 stale spec citations after line shift","tdd_next":"document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}