I moved the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`. I ran no tests this round, so CI's verdict is the first check on it. The change is committed and pushed. The branch is up to date with `origin/main` and not ahead of its upstream.

- **Test:** I wrote no new test. The acceptance test `chatOrchestrator.beforeSession.acceptance.test.ts` already defines this facet, and I didn't run it.
- **Why the throw now reaches `onError` and `afterSession`:** it reaches the same `catch` and `finally` as any other failure in the turn. The rejection to the caller is unchanged.
- **Spec:** the recorded-flaw line was already replaced in `specs/hal-engine-config-hooks/spec.md`. It says `afterSession` fires and that no tools ran and the turn was aborted before provider interaction. I only fixed the section intro, which still said the issue "changes none of them".
- **CHANGELOG:** a new entry says what changes for an existing consumer. `afterSession` can no longer assume `beforeSession` completed.
- **Checklist:** I ticked all three facets in `.lore/dod.md`. The acceptance box stays unticked until CI shows it green.
- **Red tests:** there were none to attribute this round. CI hasn't reported yet, so I can't say how many failures will be mine and how many regressions.
- **Refactor:** none was warranted for a two-line move.
- **Unrelated smell:** the `instanceof Error` gate on `onError` at `chatOrchestrator.ts:150` is out of scope for this ticket. I left it alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block (plus spec intro fix and CHANGELOG entry)","tdd_next":"acceptance green"}}