The four lint errors CI named are fixed and pushed to `loop-bench/93` as `26de24f`. The branch is level with its upstream and already contains `origin/main`, so no merge was needed.

**What was broken:** `src/orchestration/orchestratorHelpers.test.ts` had three `accumulateUsage` tests with no spec link (lines 29, 35, 41), and the test at line 35 made two `expect` calls against a limit of one.

**What I changed:**
- **Test file:** split the one-undefined test into two, one per side, each with a single `expect`. Assertions are unchanged; only the split and the names are new.
- **Spec:** `specs/hal-engine-config-hooks/spec.md` gets three statements, one per behaviour, each with a trailing `validated by` citation to the test by its name. The "defined side" case is covered by a single bullet that cites both halves.

**Checks run here** (the linter was not run, per the brief):
- `npm run spec:names`: 594 citations name the test they point at, including the new ones.
- `npm run check:spec-status`: 0 findings.
- `npm run check:spec-links`: 0 misplaced citations.
- `prettier --check` on the changed test file: clean.

I did not run `eslint`, so the lint verdict is for CI to confirm on the push.

**Not available:** `lore-query-trace` returned 403 (the token lacks read scope), so I could not check prior failures on this file in the graph. The fix came from the verdict and the repo's spec-link convention in `AGENTS.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"orchestratorHelpers.test.ts lacked spec links and had a max-expects violation; cited tests from the hooks spec and split the multi-expect test"}}