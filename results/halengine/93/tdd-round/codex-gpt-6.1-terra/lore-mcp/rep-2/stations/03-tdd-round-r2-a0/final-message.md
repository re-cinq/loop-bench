Committed and pushed the CI repair in `7d36f2a`. The two usage tests now share their orchestration setup, and the existing no-tool guard remains unchanged. The branch is up to date with both `origin/main` and its upstream.

No tests were run locally: this round repaired CI’s lint findings, and the instructions restricted local runs to a newly written test. CI reported **0 red tests and 0 test regressions**; it will verify the repair after the push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve the unchanged no-tool regression guard and repair duplicate test setup","tdd_next":"acceptance green"}}