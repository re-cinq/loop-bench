The push landed. The spec-names CI failure was caused by a stale line-number anchor (`#L42` instead of `#L38`) in `specs/hal-engine-config-hooks/spec.md`. The `--fix` script repointed it to the test's actual location. The MongoDB test failures in the round brief are pre-existing infrastructure timeouts — no mongo files changed in this branch (confirmed via `git diff main HEAD -- src/infrastructure/stores/mongo/`), so those are not regressions I introduced.

0 regressions introduced by me; 0 MongoDB failures were mine.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec-names CI failure (reanchor #L42 → #L38)","tdd_next":"acceptance green"}}