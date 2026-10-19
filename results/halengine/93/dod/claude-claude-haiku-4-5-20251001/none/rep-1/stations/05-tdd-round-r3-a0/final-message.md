Branch is pushed and up to date. The two CI failures are fixed:

- **eslint** `require-spec-link` on 3 tests: `works without any hooks configured` (was at wrong line #L386→#L410), `stops after one round when nothing asked for a tool` (#L440→#L451), and `resolves processMessage...` (#L550→#L561) — all now point to the correct lines.
- **spec-names** stale anchors: 12 total across `specs/hal-engine-architecture/spec.md` and `specs/hal-engine-tool-input-validation/spec.md`, all repointed by `repoint-spec-anchors.mjs`.

0 regressions introduced. 0 new tests written (this was a pure anchor-repair round — the `mechanical` strategy applied: exact edits to fix the named CI findings, no new test invented).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint require-spec-link and spec-names CI failures by repointing 13 stale spec anchors","tdd_next":"acceptance green"}}