Fixed both CI findings in the acceptance test and pushed commit `955f42b`. The branch is up to date with `origin/main` and its upstream.

I ran Prettier on the changed file and `git diff --check`. Per the requested pod restrictions, I did not run typecheck or ESLint; CI must verify the push.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Fixed and pushed both reported findings; typecheck and ESLint await CI verification."}}