Fixed both CI findings in `chatOrchestrator.beforeSession.acceptance.test.ts`: updated the `PromptBuilder` config and combined the three assertions into one while preserving the rejection and hook checks.

Formatted the changed file, committed as `5407ba3`, and pushed. `origin/main` was already merged, and the branch is clean and even with its upstream. I did not rerun typecheck or lint; CI reported the exact issues and the ticket instructions prohibit running those checks in this pod.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Corrected the acceptance test's PromptBuilder config and consolidated its assertions to satisfy typecheck and eslint."}}