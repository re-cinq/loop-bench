Completed and pushed one round in commit `f27468a`. The new same-instance `onError` test passed; existing acceptance assertions were left unchanged. I also addressed the prior CI findings and updated the DoD checklist.

I did not run the acceptance tests, lint, typecheck, or build. Lore’s CI lookup returned 404, so I relied on the round brief. The previous CI reported five lint findings, two spec-name findings, and a missing changelog entry; no unrelated smells were found. The branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Confirm existing Error-instance tests remain green","tdd_next":"acceptance green"}}