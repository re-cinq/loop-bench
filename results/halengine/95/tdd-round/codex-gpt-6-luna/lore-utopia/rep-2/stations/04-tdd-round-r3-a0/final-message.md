Fixed both CI findings: shared the rejection-provider/session helpers with the non-Error test, and corrected the spec links. Formatted the changed TypeScript file, committed as `024213a`, pushed, and confirmed the branch is up to date with its upstream. `origin/main` was already merged.

No tests ran: this repair round added no test, and the brief required clearing the reported CI findings before anything else. No product facet remained open in `.lore/dod.md`; acceptance green is next. Unrelated smells noticed: none. Red tests authored this round: 0; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair reported ESLint duplication and spec-name link findings","tdd_next":"acceptance green"}}