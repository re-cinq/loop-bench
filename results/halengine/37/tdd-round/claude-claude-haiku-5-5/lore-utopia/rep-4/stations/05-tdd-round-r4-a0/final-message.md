Round 5 is pushed to `loop-bench/37` at `c7106b5`, and origin/main is already merged in, so no further push was needed.

**What I did**
- **CI findings (eslint, red on dd7ab3c):** both were in `registry.acceptance.test.ts`. I fixed them without changing any assertion:
  - Line 141 `prefer-early-return`: the round-2 branch is now a guard, `if (round !== 2) { … return; }`, with the happy path flat after it.
  - Line 143 `max-member-chain`: `lastMessage.content[0]?.content` is now `const [firstResult] = lastMessage.content;` and `firstResult?.content`.
  - This edits an acceptance test file, which `.lore/dod.md` says is the test author's to change. I did it because the CI brief asks for these findings to be fixed this visit. Flagging it so you can overrule.
- **Version bump facet:** `package.json` and `package-lock.json` (both spots) moved from 0.3.0 to 0.4.0. I left the CHANGELOG `## [Unreleased]` heading alone, since `check-version.sh` only requires the rename at tag time.
- **dod.md:** ticked the version-bump facet and the lint facet. The duplicate-code item with `registry.test.ts` stays open; CI did not flag it.
- Ran `prettier --write` on the changed files (both unchanged) and committed.

**Tests and regressions**
- No tests ran in this pod. I wrote no new test this round: the version bump has no behaviour to test, and the CI fix is lint-only. So this round did not run the tdd-loop red/green phases.
- Red tests I wrote this round: 0. Regressions this round: 0 known. CI's verdict on the new push decides the rest.

**Unrelated smells, not touched**
- The duplicate-code finding between `registry.acceptance.test.ts` and `registry.test.ts`.
- The CHANGELOG `[Unreleased]` heading will need renaming at release.

**Still open for the next round:** unit tests in `registry.test.ts` and `chatOrchestrator.test.ts`, the remaining spec links, and the docs (`README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `example/weather-tool.ts`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"bump package version MINOR 0.3.0 -> 0.4.0 (plus CI lint fixes in acceptance test)","tdd_next":"unit tests in registry.test.ts and chatOrchestrator.test.ts, spec links, and docs updates"}}