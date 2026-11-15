Round delivered and pushed: `85839ac` on `loop-bench/144`, in sync with its upstream. The branch was already up to date with `origin/main`, so the merge produced nothing.

**What I did**
- **Red:** added unit tests in `src/transport/ws/validation.test.ts` for a `list_sessions` `limit`. A valid limit should be forwarded, and `'ten'`, `-1` and `1.5` should be refused. Four of them failed as expected.
- **Green:** `validation.ts` now validates `list_sessions` with a `validateListSessionsMessage` helper that forwards a non-negative integer `limit`. `ListSessionsMessage` in `messages.ts` gained an optional `limit`.
- **CI findings from the last red build:**
  - `spec-names`: ran `npm run spec:names:fix`, which repointed four stale citations. The check now passes, and `check:spec-links` reports 0 misplaced.
  - `changelog`: added an `[Unreleased]` entry in `CHANGELOG.md`.
  - `require-spec-link` on the acceptance test: the citation is repointed by the same fix, so the link now resolves to the test's current line.
- **Formatting:** ran prettier over the changed source, test and spec files.
- **dod.md:** ticked the `limit` sub-facet and split the `before` part into its own unchecked facet.

**Not done this round**
- **Remaining `eslint` findings** on `src/transport/conversationList.acceptance.test.ts` (duplicated lines, `prefer-early-return`) and on `src/transport/sessionResume.test.ts` (duplicated lines). Clearing them means restructuring the acceptance test or an existing test file. I did not touch the acceptance test, and I left the existing test alone. These need a decision on the next round.
- **The `test` job is still red by design.** The acceptance tests cover handler behaviour that does not exist yet.
- **The `before` validation and `userId` stripping** are the next facet.
- **The `changelog` entry** describes a frame that gets no reply yet. That is accurate for now but should be reworded once the handler lands.

**Tests**
- I ran only `src/transport/ws/validation.test.ts`, my own test: 8 of 8 pass.
- I did not run any of the acceptance tests listed in `.lore/dod.md`, the formatter-only checks, lint, or the typechecker. CI owns those.

**Red tests in CI:** I could not read the full CI verdict (the Lore API rejected the branch name and the commit SHA), so I only know the list from the round brief. The acceptance tests are red because the handler is not written yet. I did not add a regression. Of the red tests I can see, none are pre-existing tests that this branch broke, but I have not verified that against the verdict.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reject malformed list_sessions limit and forward limit","tdd_next":"reject malformed before cursor and forward before"}}