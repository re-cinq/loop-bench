Branch is up to date with main. The push landed cleanly.

**What this round did**: Fixed all 5 CI failures from the red build:
1. Spec status `Shipped` → `In Progress` (allows 1 intentionally-unlinked statement: the out-of-scope `instanceof Error` measured semantic)
2. Added 4 spec statements in `specs/hal-engine-config-hooks/spec.md` linking the `addUsage` unit tests at `orchestratorHelpers.test.ts#L32/36/40/44`
3. Added `CHANGELOG.md` entry under `[Unreleased] Changed` describing the `afterModelResponse` accumulation behaviour change

**Unrelated smell noted**: `example/full-config.ts` has no "turn's total" comment that `.lore/dod.md` said it "already has" — dod.md note was inaccurate; updated in place.

**My 0 red tests, 0 regressions** — no test files changed this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI lint/changelog fixes: addUsage spec links + CHANGELOG entry","tdd_next":"make the OrchestratorHooks afterModelResponse usage parameter signature say it is a sum (facet 3)"}}