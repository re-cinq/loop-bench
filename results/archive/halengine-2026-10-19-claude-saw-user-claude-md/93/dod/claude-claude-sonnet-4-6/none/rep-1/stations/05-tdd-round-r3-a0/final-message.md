Branch is up to date and pushed. Two CI failures fixed:
- **eslint `re-lint/no-duplicate-code`**: extracted `finalTextRound` and `expectedSummedUsage` constants to eliminate the duplicated 9-line block
- **eslint `re-lint/require-spec-link` + spec-names**: ran `npm run spec:names -- --fix` which updated `#L43 → #L55` in `specs/hal-engine-config-hooks/spec.md`; the `#L61` anchor happened to land correctly at the new position

0 tests written this round (all work was fixing lint/spec-name CI failures from the previous round's push). 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed eslint no-duplicate-code and require-spec-link + spec-names anchor mismatches","tdd_next":"acceptance green"}}