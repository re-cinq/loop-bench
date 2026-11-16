This round fixed the one CI finding. The `spec-names` check failed because the spec cited `#L40` for the test "runs onError and afterSession when beforeSession throws", and the test is at `#L32`. I ran `npm run spec:names -- --fix`, which repointed the citation in `specs/hal-engine-config-hooks/spec.md`. That was the only line it changed.

Prettier passes on the spec. I did not write or run any tests, and I did not run lint or typecheck, as instructed. The branch was already up to date with `origin/main`. It is pushed, and `git status` shows it level with its upstream. All the facets in `.lore/dod.md` were already ticked.

No tests were red from my work, and I caused no regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repoint spec citation to test line (spec-names CI finding)","tdd_next":"acceptance green"}}