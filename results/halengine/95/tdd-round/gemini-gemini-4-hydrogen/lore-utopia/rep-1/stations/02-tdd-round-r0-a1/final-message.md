Added the `CHANGELOG.md` entry under `## [Unreleased]` (`### Fixed`) describing the `onError` behaviour change and migration note for existing consumers, and ticked the corresponding facet in `.lore/dod.md`. Both files were formatted with Prettier, committed (`5945d5b`), and pushed to `origin/loop-bench/95`; `origin/main` is already up to date and the working tree is clean.

This round ran no tests here (no new test was written this round since only `CHANGELOG.md` and `.lore/dod.md` changed; 0 red tests authored, 0 regressions observed locally).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add a CHANGELOG.md entry under ## [Unreleased] describing the behaviour change for existing consumers","tdd_next":"acceptance green"}}