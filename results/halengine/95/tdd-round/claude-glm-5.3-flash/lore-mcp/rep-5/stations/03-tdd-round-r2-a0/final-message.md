Pushed and in sync: `0285744..19aa82c HEAD -> loop-bench/95`, working tree clean, branch up to date with its upstream, and `origin/main` merges clean (already up to date).

## Round summary

**What this round owed:** the round brief's `CI reported failures` section — three eslint findings CI named on `src/orchestration/onErrorNonError.acceptance.test.ts` at 0285744a. All three are repaired in commit `19aa82c`:

- **`re-lint/no-duplicate-code` (40:67 and 97:72)** — the undefined-rejection test re-implemented the `turnOutcome` scaffold inline (7 duplicated lines). It now drives the shared helper.
- **`re-lint/max-expects` (84:3)** — that test's five expects became one projection `toEqual`, keeping every fact the five pinned: caller still receives `undefined`, hook order `['onError','afterSession']`, `Error` instance, `cause` is `undefined`, non-empty `message`. I verified the `toEqual` `undefined`-key semantics against the installed `expect` package directly (passes only when cause is undefined, fails on any defined value) since this pod must not run the acceptance suite.
- The string test now projects the same four facts it already asserted (the helper's return gained `cause`, and `toEqual` demands the exact key set); the plain-object test is untouched. **No assertion subject changed** — the diff touches only test scaffolding and the spec's anchor line numbers (L55/66/84 → L56/72/90).

**Verification here:** no repo test ran in this pod — the only test exercising this work is the acceptance test, which this pod refuses by rule; CI is its judge. I ran the formatter (prettier, clean) and the three small node link-verifiers that mechanize the required `#Lnn` re-verification: `spec:names` (605 citations name their tests), `check:spec-links` (0 misplaced), and `repoint-spec-anchors --check origin/main` (exit 0; the config-hooks spec is correctly skipped whole since its anchors are authored against the working tree — hence the hand re-point).

**Red tests:** none of the previous CI failures were failing tests — the Test job was green with all three acceptance behaviours passing; the red was eslint only. This round introduced no code change in `src/`, so no regressions are possible from it. No unrelated smells noticed beyond the findings fixed. `.lore/dod.md` gained and ticked the facet this round closed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix the three eslint findings CI named on 0285744a (duplicate scaffold and max-expects in the acceptance test)","tdd_next":"acceptance green"}}