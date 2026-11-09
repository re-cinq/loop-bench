Pushed and confirmed landed: `## loop-bench/37...origin/loop-bench/37` (no ahead/behind), and `merge-base HEAD origin/main == origin/main == 8c3318e` — no drift, nothing to merge.

## Round summary

**What this round owed:** the round brief named `typecheck` and `test` failures on `7c74c5a` (HEAD). The previous round had declared an earlier identical brief stale; this round re-verified that claim independently instead of taking it on faith — and it holds, with stronger evidence now:

- **Live PR state** (fetched this round): PR #84 — this branch's PR — is **merged with every check green**. Verify runs `npm ci --ignore-scripts` from the committed lock, then typecheck, the coverage-floored test suite, and build.
- **The findings cannot reproduce from a clean install:** this tree's lock resolves `ajv@8.20.0` top-level; ajv `6.15.0` exists only nested under `node_modules/eslint/`, unreachable from `src/`. ajv 8's `dist/ajv.d.ts` declares `export declare class Ajv`, so the named import at `registry.ts:1` is constructable — TS2693 at `registry.ts(60,30)` requires ajv 6's `export =` typings, i.e. the stale hoisted workspace. The brief's ~7.21% orchestration coverage is the same signature (registry tests crashing at import drag the directory's coverage).
- **The branch is deleted on GitHub**, which is why `lore_get_ci_failures` answers "branch not found" and why the stale brief can never be superseded by a newer run.

**What this round changed:** no code — re-fixing phantom findings on a merged-green tree is churn. It ticked the four acceptance boxes in `.lore/dod.md` (CI judged them green via the merged PR; they were left unticked by the last round) and recorded the verification for the next reader. Committed as `7aa3cb5`, pushed, branch up to date with base and not ahead of upstream.

**Tests run this round:** none — no test was written this round, and the pod forbids running the acceptance tests (CI's merged-green Verify is the judge). No red tests of mine, no regressions.

**Unrelated smells noticed, not acted on:** `7c74c5a`'s subject says "docs" but it also patched `registry.ts` and `package-lock.json` (misleading commit type); the dod.md Facets section carries a duplicated sub-bullet (lines 30 and 32 are identical).

The ticket is complete: every facet closed, acceptance green per CI, PR #84 merged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"acceptance boxes ticked after merged-green CI on PR #84; stale brief findings confirmed phantom","tdd_next":"acceptance green"}}