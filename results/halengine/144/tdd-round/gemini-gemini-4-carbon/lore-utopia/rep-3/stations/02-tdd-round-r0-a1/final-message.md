Completed one red-green-refactor round closing the `list_sessions` frame validation facet in `src/transport/ws/validation.ts` (`2ea6978`, pushed to `origin/loop-bench/144`):

- **Red/Regressions:** 1 red unit test was ours in `src/transport/ws/validation.test.ts` (now green); 0 regressions.
- **Unrelated notes (untouched):** `CHANGELOG.md`'s earlier `#143` bullet still notes "Nothing in the engine calls it yet", which belongs to the upcoming handler/docs facets.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and wire it in src/transport/createServer.ts"}}