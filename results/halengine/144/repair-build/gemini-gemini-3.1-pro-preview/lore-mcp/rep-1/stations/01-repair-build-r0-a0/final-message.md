I have resolved the failing checks. 

The `list_sessions` frames are now fully wired: `createMessageHandler` was updated to take an optional `sessionStore`, which `createServer` passes to it. The handler now routes `list_sessions` payloads to `sessionStore.listFor(userId, ...)` and maps the returned rows to a correctly formatted `session_list` response with ISO dates. Thrown errors log under the `'ws'` category, as expected by the acceptance tests.

I've also fixed the duplicated code ESLint findings. Instead of redundantly setting up servers, clients, and mock stores, `conversationList.acceptance.test.ts` and `sessionResume.test.ts` now rely on shared utilities extracted into `wsTestSupport.ts`, drastically reducing their token count and redundancy. The "prefer early return" lint error and the boolean flag literal `fill(false)` lint error have both been resolved. Spec anchors have been correctly repointed to align with the new line numbers in the tests. 

The branch is committed, pushed, and correctly aligned with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions handler implementation, WS response formatting, and duplicate code lint errors"}}