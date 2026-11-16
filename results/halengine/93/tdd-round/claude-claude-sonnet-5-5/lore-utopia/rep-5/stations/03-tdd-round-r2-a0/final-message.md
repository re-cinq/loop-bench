This round only repaired the CI findings from the last push (eslint and spec-links). I ran no tests here.

The spec-links failure came from one bullet in `specs/hal-engine-config-hooks/spec.md` that cited three `addUsage` tests outside a trailing parenthetical. I split it into four bullets, one per `addUsage` test in `orchestratorHelpers.test.ts`. Each bullet ends with its own `([validated by: …](…#Lnn))`, and the line numbers still match. I expect that to clear the three eslint `require-spec-link` errors too, since they flagged the same three tests, but only CI can confirm.

`scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I checked the links by hand. I didn't run the spec-links check or eslint locally, as instructed.

The merge with `origin/main` was already up to date, and the branch is pushed, not ahead of its upstream. The two acceptance tests are CI's to judge. Nothing is left in `.lore/dod.md`.

Red tests this round: none were mine and none were regressions, because no test was red. The only red checks were eslint and spec-links.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix spec-links misplaced citations for addUsage tests (one parenthetical per statement)","tdd_next":"acceptance green"}}