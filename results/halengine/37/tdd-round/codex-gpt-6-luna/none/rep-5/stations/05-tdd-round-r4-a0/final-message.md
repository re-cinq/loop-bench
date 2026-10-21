Committed and pushed `27c4688` (`Test wrong-typed tool input rejection`). The wrong-type test passes. I also fixed the reported lint issue, and `spec:names -- --fix` repointed three stale spec links.

The branch is up to date with `origin/main` and has no unpushed commits. The next facet is the remaining registry and orchestrator tests, documentation, and changelog.

The previous CI report still shows a failure in `providerFactory.test.ts`; its details were truncated in the brief, and I did not rerun it because this round could run only the test I wrote. This round’s test passed; the report has one unresolved regression failure.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrong-typed tool input rejection test","tdd_next":"Complete remaining registry and orchestrator tests, documentation, and changelog work"}}