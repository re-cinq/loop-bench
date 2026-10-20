I have completed the TDD round for ticket #95.

- **Research:** I analyzed `chatOrchestrator.ts` and identified that the `onError` hook was gated behind an `error instanceof Error` check, which caused non-Error rejections (like strings or plain objects) to bypass the hook.
- **Red:** I created `src/orchestration/onErrorNonError.test.ts` and wrote three failing test cases that threw a string, a plain object, and `undefined` respectively, asserting that `onError` should be called with a coerced `Error`.
- **Green:** I modified the `catch` block in `chatOrchestrator.ts` to coerce any caught rejection into an `Error` object (preserving the original as the `cause`) before calling `onError`. All new tests and the 26 existing tests in `chatOrchestrator.test.ts` passed.
- **Refactor & Traceability:** I updated `specs/hal-engine-config-hooks/spec.md` with validation links to the new tests and corrected existing acceptance test links. I also added a `CHANGELOG.md` entry and updated `.lore/dod.md`. Files were formatted with Prettier and spec links were verified with the reanchor script.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce caught non-Error rejection to an Error in src/orchestration/chatOrchestrator.ts","tdd_next":"acceptance green"}}