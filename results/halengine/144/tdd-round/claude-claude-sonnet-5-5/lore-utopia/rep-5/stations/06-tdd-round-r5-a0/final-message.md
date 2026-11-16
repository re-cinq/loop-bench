This round fixed CI's two red checks, eslint and spec-names. It ran no tests here, because the acceptance tests are CI's to run. The `spec-names` check passes locally. I did not run eslint, as instructed.

- **Spec links:** the citations to `conversationList.acceptance.test.ts` pointed one line too early (L92, L133 and L162 where the tests are at L93, L134 and L163). I re-anchored them in both specs. That cleared the `spec-names` mismatches and the `require-spec-link` findings, which came from the same stale links.
- **Early return:** I flattened the `if` in the `askAfterConnect` helper in `conversationList.acceptance.test.ts`. This edits the acceptance test file, but only that helper, not any test or assertion.

The push landed, `origin/main` was already merged, and the branch is not ahead of its upstream. Of CI's findings, none were regressions. All were in the files this ticket wrote.

I noticed one thing and left it alone. The ticket calls the frames `list_conversations` and `conversation_list`, but the code and specs use `list_sessions` and `session_list`. The previous round flagged this too.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI verdict: re-anchor spec citations to acceptance tests, flatten helper early return","tdd_next":"confirm CI green; then reconcile list_sessions/session_list naming with the ticket's list_conversations/conversation_list"}}