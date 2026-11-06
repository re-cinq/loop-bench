I fixed one of CI's two eslint findings and pushed. The other is inside the acceptance test, which this round isn't allowed to edit, so eslint will stay red until the test's author changes it.

- **Fixed:** `src/transport/wsTestSupport.ts:122` (`re-lint/max-member-chain`). `stopEnginesOnceIdle` now reads `engine.wss.clients` into a local once and checks `sockets.size`, which is the same live set. `sessionResume.test.ts`, which uses this helper, passes 25/25 under Jest. No new test was written: this was a lint-only refactor, so there was no red phase.
- **Still red:** `src/transport/conversationList.acceptance.test.ts:67` (`re-lint/prefer-early-return`), in the `connected` branch of `askAfterConnect`. The test's author needs to flatten that handler. This was already recorded as an open facet in `.lore/dod.md`, and I ticked the facet I closed.
- **Red-test count:** CI's verdict names no failing tests, only these two lint findings, and both are in files this ticket added. So no regressions.
- **Pushed:** branch `loop-bench/144`. Merging `origin/main` brought nothing new, and `git status` shows the branch level with its upstream.

Things I noticed but didn't act on:
1. The prompt's example uses `npx vitest`, but this repo runs Jest. Under vitest, `sessionResume.test.ts` fails on `beforeAll is not defined` whether or not my change is applied.
2. `.lore/dod.md` and the acceptance tests use `list_sessions`/`session_list`, and answer an empty list when the store has no `listFor`. The ticket asks for `list_conversations`/`conversation_list`, and an `UNSUPPORTED` error rather than an empty list. Someone should reconcile these before review.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Clear CI's re-lint/max-member-chain finding in wsTestSupport.ts:122","tdd_next":"re-lint/prefer-early-return at conversationList.acceptance.test.ts:67 — inside the acceptance test, needs its author to flatten askAfterConnect"}}