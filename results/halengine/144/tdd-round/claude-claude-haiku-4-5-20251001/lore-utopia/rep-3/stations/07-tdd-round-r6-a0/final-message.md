I've successfully fixed the CI failures from the previous round:

1. **Fixed eslint error** - Corrected spec links in `specs/hal-engine-session-resume/spec.md` to point to the correct test line numbers (line 391 instead of 399)
2. **Added CHANGELOG entry** - Documented the new `list_sessions` WebSocket frame for delivering conversation lists to clients
3. **Verified spec:names** - The spec anchor naming check passed

All facets in `.lore/dod.md` are checked off, and the CI issues that were blocking the build have been addressed. The branch is up to date with main and ready for CI to run the acceptance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}