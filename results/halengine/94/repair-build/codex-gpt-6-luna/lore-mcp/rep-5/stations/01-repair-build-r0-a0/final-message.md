Fixed both reported findings in the acceptance test: updated `PromptBuilder` to use the current config and combined the hook assertions into one expectation. Formatted, committed as `db61ea1`, and pushed. `origin/main` was already up to date, and the branch is even with its upstream.

I did not rerun typecheck or lint, as instructed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Updated the acceptance test’s PromptBuilder config and consolidated its expectations to address the reported typecheck and lint errors."}}