Everything is verified and landed: the anchor check passes post-format (stale: 0, unresolved: 0), the branch is pushed and even with its base (`origin/main` is an ancestor — nothing to merge), and the working tree is clean.

## Round summary

**What this round owed** (from the round brief's CI verdict on 28fe18f): 11 eslint errors, the `changelog` check, and a `test` failure whose detail was truncated in the brief.

**Fixed — the named findings, all of them:**
- **eslint duplication (7 findings):** the acceptance suite's copied helpers (`eventually`, the drain-and-stop teardown, `delegatingTo`) moved to `src/transport/wsTestSupport.ts`; the `list_sessions` expect duplicated between `messageHandler.test.ts` and the acceptance file was reshaped with its own fixtures and split expects, so no ≥50-token window remains between any pair.
- **eslint `prefer-early-return`:** `askAfterConnect`'s guard flipped — behaviour traced identical, frame handling unchanged.
- **eslint `prefer-polymorphism` + `no-vague-names` in `validation.ts`:** the switch became a `validatorsByType` lookup table; `data` renamed `listFrame`.
- **changelog:** `list_sessions`/`session_list` entry added under `## [Unreleased]` (and the now-false "nothing in the engine calls it yet" sentence in the `listFor` entry corrected).
- **the `test` step:** every suite I'm permitted to run locally passes (24 suites across the round). I measured the one gap I could name with evidence: the new validation rejection branches were covered *only* by the acceptance file (69.23% branches without it). `validation.test.ts` now covers them (94%), citing the § 4.3 constraint statement, and `repoint-spec-anchors.mjs` re-anchors everything (it repaired 25 anchors my test edits shifted; the branch-introduced spec sections I corrected by hand).

**Tests:** mine are the two new validator cases — they pass on arrival (they pin behaviour the implementation already had, closing the coverage single-point-of-failure). Red tests of mine: 0. Regressions: 0 — all pre-existing suites green locally. The acceptance suite itself is CI's to run; I traced it against the implementation twice and could not find a red assertion in it, so if the red `test` step was that file, the next brief will say why.

**Named, not acted on:** (1) the ticket and `.lore/dod.md` specify *different frames* — `list_conversations`/`conversation_list` with an opt-in `transport.history`, `UNSUPPORTED` and `StoreCannotList` versus this branch's `list_sessions`/`session_list`, always-on, empty list — the acceptance tests follow the dod, so the ticket's criteria cannot pass without a decision; recorded as an unchecked facet. (2) Ticket extras still owed: MINOR bump (still 0.5.0), `docs/getting-started.md` § Conversation list via `example/full-config.ts` + `npm run docs:fix`, GDPR/retention notes. (3) Pre-existing uncovered lines 28/34/43 in `validation.ts`. (4) `fiveMemberStore` and `delegatingTo` are two shapes of the same "required members only" store that could one day merge.

Committed as `0edc35b`, pushed, branch not ahead of upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"the red build's named findings: 11 eslint errors (test duplication, guard shape, dispatch table, vague name), the missing CHANGELOG entry, and validator coverage that hung on the acceptance suite alone","tdd_next":"settle the frame naming against the ticket (list_conversations/opt-in/UNSUPPORTED vs list_sessions/always-on), else the failure CI names next"}}