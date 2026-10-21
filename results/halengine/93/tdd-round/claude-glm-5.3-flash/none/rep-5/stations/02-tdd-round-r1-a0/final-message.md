Round complete. Everything landed:

**What this round owed** — CI's verdict on `f84c224` named three findings, plus the two stale spec wordings the dod facet recorded:
1. `chatOrchestratorUsage.acceptance.test.ts:67` had no spec link → added a hooks-spec statement citing it (`#L67`, through the real tool loop).
2. `orchestratorHelpers.test.ts:29` had 2 expects → split into two tests, one behaviour each: `sums each token field over the rounds that reported, skipping the rounds that report none` (L29) and `reports nothing for a turn where no round reported` (L40); the spec bullet split to match.
3. Missing changelog entry → added under `[Unreleased]` / `Changed`, stating that an existing `afterModelResponse` consumer's figure grows on exactly the tool-heavy turns.
4. Stale wordings → architecture spec line 350 now says the turn's usage sums the rounds that reported; the hooks spec's Measured-semantics intro no longer describes #93 as future work.

**Test run here**: the split `orchestratorHelpers.test.ts` file only — 6/6 green via the repo's jest invocation (`node --experimental-vm-modules node_modules/jest/bin/jest.js`). No acceptance test, lint, typecheck or build was run here; CI judges those. `spec:names` (592 citations resolve) and `repoint-spec-anchors --check origin/main` (0 stale) confirm the new anchors.

**dod.md**: all four facets ticked — the no-tool guard on CI's evidence (Test job passed on `f84c224`; only eslint/changelog were red), spec+CHANGELOG on this round's edits.

**Red tests**: 0 mine, 0 regressions — the verdict named lint and changelog only. Committed as `b7861a6`, pushed, branch up to date with upstream and `origin/main` is an ancestor.

Smell noticed, not acted on: `TurnUsage` is a bare alias of `UsageMetadata`, so an editor hover shows the aliased shape rather than the turn-total contract — a distinct interface would make it self-describing, but the facet was closed last round and the alias is what its acceptance test pins.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec citations, changelog entry and the max-expects test split CI named","tdd_next":"acceptance green"}}