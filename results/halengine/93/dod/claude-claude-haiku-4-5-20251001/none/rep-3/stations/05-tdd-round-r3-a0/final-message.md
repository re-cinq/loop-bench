Branch is up to date. The two CI failures are fixed:
- **spec-names**: 9 stale spec citations repointed to actual test line numbers via `spec:names --fix`
- **eslint require-spec-link**: The two tests at lines 404 and 416 already had spec links in `hal-engine-architecture/spec.md` — they just pointed to wrong line numbers; fixing the line numbers resolves the lint errors too

No regressions introduced. All changes were mechanical spec-anchor repoints — no source behavior was touched.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix stale spec citations causing eslint/spec-names CI failures","tdd_next":"acceptance green"}}