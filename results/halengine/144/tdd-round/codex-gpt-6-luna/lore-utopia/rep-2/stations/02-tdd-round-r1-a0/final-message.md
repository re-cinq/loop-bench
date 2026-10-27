Added the public session list frame types and exports, the compile fixture, and its spec citation. Also fixed the validation type error reported by CI. Commit `f3f396b` is pushed; the branch is up to date with `main` and its upstream.

The fixture passed, but Jest’s isolated TypeScript transform does not typecheck, so it did not produce a red phase. The prior CI report also lists ESLint, test, spec-name, and changelog failures; Lore could not retrieve their full details for this branch. Red tests authored this round: 0. Confirmed regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"add and export public session list message types","tdd_next":"thread sessionStore into createMessageHandler"}}