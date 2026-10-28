Added one acceptance test that exercises string, plain object, and `undefined` provider rejections through `createChatOrchestrator`, and checks that existing `Error` instances retain their identity. Updated the spec and added `.lore/dod.md`.

The named test fails for the reported behavior:

> `expect(received).toHaveLength(expected)`  
> Expected length: 1  
> Received length: 0  
> Received array: `[]`

Committed and pushed as `ff98b84`. The branch is up to date with its upstream, and `origin/main` was already merged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}