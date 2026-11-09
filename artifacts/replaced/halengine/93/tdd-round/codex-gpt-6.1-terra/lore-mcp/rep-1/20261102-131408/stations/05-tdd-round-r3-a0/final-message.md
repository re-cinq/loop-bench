Committed and pushed the CI lint repair as `90032e4`. The existing no-tool regression guard is unchanged from main, and its facet is marked complete. The branch is up to date with its upstream and `origin/main`.

No tests ran locally: this repair changed an existing test fixture, and the round’s restrictions permit running only a newly written test. The prior CI verdict reported two lint findings in branch-authored tests and zero regression test failures. Trace coverage queries were unavailable because Lore returned HTTP 403.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Remove duplicated usage test setup and preserve the unchanged no-tool guard","tdd_next":"acceptance green"}}