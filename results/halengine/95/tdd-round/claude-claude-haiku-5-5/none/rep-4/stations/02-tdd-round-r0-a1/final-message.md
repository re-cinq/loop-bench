The last open facet is closed, and the branch is pushed and up to date with its upstream.

**This round was a documentation round, not a red-green one.** The remaining facet was the CHANGELOG entry, which is prose rather than behaviour, so I wrote no new test. The code facets (the `toError` wrap in `chatOrchestrator.ts` and the existing-test check) and the spec line were already done in earlier commits (`64143f7`, `010c2d7`).

What changed in this round (commit `3891c43`):
- `CHANGELOG.md`: a new bullet under `## [Unreleased]` → `### Fixed`. It says `onError` now fires for every rejection, that the hook gets an `Error` (same instance if already one, otherwise wrapped with the original as `cause`), that the caller still gets the original rejection, and includes a migration note that failure counters may rise after upgrading.
- `.lore/dod.md`: ticked the CHANGELOG facet.
- Ran `prettier --write` on both files; both were already formatted.

Other checks:
- `origin/main` had 0 new commits, so no merge was needed.
- I did not run the acceptance tests, the Jest suite, lint, or typecheck in this pod, per the brief. CI is the judge of this push.
- No round brief existed, so there was no CI verdict to act on. Red tests this round: 0 written by me, 0 regressions known.
- I noticed no unrelated smells to report.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CHANGELOG entry under [Unreleased] describing the onError behaviour change for existing consumers","tdd_next":"acceptance green"}}