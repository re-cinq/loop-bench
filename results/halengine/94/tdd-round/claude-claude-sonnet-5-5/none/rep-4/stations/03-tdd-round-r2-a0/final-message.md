I fixed the one failing CI check, `spec-names`. The spec cited the `beforeSession` acceptance test at `#L40`, but the test is at `#L32`. I ran `npm run spec:names -- --fix`, which repointed that citation in `specs/hal-engine-config-hooks/spec.md`. Prettier passes on the spec.

I pushed the commit. `origin/main` had nothing new to merge, and the branch is not ahead of its upstream.

I ran no tests here. This round only touched a spec link, and CI judges the push. No red tests this round were mine, and none were regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repointed spec anchor for beforeSession test to #L32 (spec-names CI failure)","tdd_next":"acceptance green"}}