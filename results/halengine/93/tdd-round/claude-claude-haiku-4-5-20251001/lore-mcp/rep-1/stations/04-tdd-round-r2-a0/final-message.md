Perfect. I've fixed the spec anchor citation failures that CI reported. The round-brief indicated two spec links were pointing to incorrect line numbers — I ran `npm run spec:names -- --fix` which repointed them to the correct lines, formatted the file with prettier, and pushed the change.

All facets in `.lore/dod.md` were already checked as complete from the previous round:
- ✅ Replace final-round retention with a deliberately named total-usage contract
- ✅ Sum each token field only for provider rounds that report usage
- ✅ Preserve the unchanged no-tool regression guard
- ✅ Update the hooks spec and CHANGELOG

The CI failure on spec-names validation has been resolved and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec citations","tdd_next":"acceptance green"}}