Round complete. Summary:

**What CI owed and this round paid** — all three eslint findings on `b6d201a`, nothing else:
- `chatOrchestratorUsage.acceptance.test.ts:67` — added the missing spec statement to `specs/hal-engine-config-hooks/spec.md`, citing it with the repo's trailing-parenthetical form (`[validated by: counts reported rounds while leaving a turn with no reported usage undefined](../../src/orchestration/chatOrchestratorUsage.acceptance.test.ts#L67)`). The acceptance test itself is unedited.
- `orchestratorHelpers.test.ts:29` — split the two-expect test into `sums the rounds that report, and skips a round that reports none` (#L29) and `stays undefined when no round reports usage` (#L38), and cited both from the architecture spec's "Across rounds" section.

**Verification here**: my split test file runs green (6/6 via the repo's ESM jest invocation); scoped `eslint --max-warnings 0` over the four changed files is clean; `check-spec-anchor-names` (592 citations OK), `check:spec-links`, and `repoint-spec-anchors --check origin/main` all pass; prettier check clean. The acceptance tests were not run locally — CI's Test step already ran them green on `b6d201a`, so I ticked both "Done when these pass" boxes in `.lore/dod.md`. Branch pushed (`dc98ac0`), in sync with upstream, and `origin/main` merges clean.

**Red tests**: 0 mine, 0 regressions. **Unrelated smell noticed, not acted on**: the config-hooks spec's "Measured semantics — out of scope" section now holds a validated statement from this ticket, and its intro still reads "issue #93 defines…" in the future tense — prose staleness for a later round to settle.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec citations for both usage tests and the max-expects split in orchestratorHelpers","tdd_next":"acceptance green"}}