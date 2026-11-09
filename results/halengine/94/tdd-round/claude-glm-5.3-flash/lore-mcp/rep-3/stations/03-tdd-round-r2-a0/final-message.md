Pushed and confirmed: `## loop-bench/94...origin/loop-bench/94` with no ahead/behind marker — the commit is on its upstream, and the branch was already even with `origin/main` (no merge needed).

## Round summary

**What CI owed:** the previous push (73afc89) was red on `eslint` only — `re-lint/no-duplicate-code` flagging 17 lines (91 tokens) cloned between `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts:5-21` and `src/orchestration/chatOrchestrator.test.ts:10-27`. All three `dod.md` facets were already ticked; this round was the repair.

**What I did:**
- Extracted the shared scaffolding (`SENT_AT`, `outcomeOf`, `createSession`, `createMockProvider`) into a new `src/orchestration/chatOrchestratorTestSupport.ts`, following the repo's existing `*TestSupport.ts` convention (`providerTestSupport.ts`, `wsTestSupport.ts`, …) and added it to the `tsconfig.build.json` exclude list the same way the others are.
- Both test files now import the helpers; test bodies and every assertion are byte-identical to before — the acceptance test was not edited to pass anything, its scaffolding was deduped. `createMockProvider` kept the superset `(response, usage?)` signature so both call sites are unchanged.
- Re-anchored the 24 `#Lnn` spec links pointing into the shifted files (uniform −27 for `chatOrchestrator.test.ts`, acceptance `#L36`→`#L9`; no `scripts/spec-links/reanchor.mjs` exists here), then verified with the repo's `node scripts/check-spec-links.mjs` (0 misplaced) plus direct spot-checks of five links against the titles now sitting at those lines.
- Formatted with prettier (all three files unchanged).

**Verification here:** the only local run was `jest src/orchestration/chatOrchestrator.test.ts` — the unit suite I reorganized, not an acceptance test, not the full suite: **24/24 passed**. Lint and typecheck were not run here per pod rules; CI judges them on this push. **Red tests: 0 mine, 0 regressions** — the eslint errors were findings on the previous round's files, now cleared; nothing red remains locally.

**Unrelated smells:** none noticed this round; nothing acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI eslint verdict cleared — scripted provider helpers deduped into chatOrchestratorTestSupport.ts","tdd_next":"acceptance green"}}