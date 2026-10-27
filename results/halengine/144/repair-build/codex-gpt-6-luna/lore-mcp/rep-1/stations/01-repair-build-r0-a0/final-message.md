I corrected the conversation-list frame handling and the annotated lint issues, then committed and pushed `da0bf17`. The branch is up to date with its upstream, and `origin/main` was already merged.

The two affected test files passed: 7 tests. The full `npm run test:coverage -- --runInBand` run passed all 696 tests but exited 1 because Jest reported a late WebSocket disconnect log after tests finished. I did not run the linter, per the pod instructions.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Full coverage run reports 696 passing tests but exits 1 on a late WebSocket disconnect log after tests finish; pushed da0bf17 for CI re-evaluation."}}