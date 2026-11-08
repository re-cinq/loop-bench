Every facet defined in `.lore/dod.md` has already been implemented and checked off in commit `d58531f`:
- `beforeSession` is moved inside the `try` block in `chatOrchestrator.ts`.
- `specs/hal-engine-config-hooks/spec.md` is updated with the new guarantee.
- The `CHANGELOG.md` entry documents the behavior change.
- A unit test covering `runs onError and afterSession when beforeSession throws` is present in `chatOrchestrator.test.ts`.

The branch `loop-bench/94` is clean, merged with `origin/main`, and up to date with `origin/loop-bench/94`. There is no `round-brief.md` with CI failures to address, leaving nothing to write.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}