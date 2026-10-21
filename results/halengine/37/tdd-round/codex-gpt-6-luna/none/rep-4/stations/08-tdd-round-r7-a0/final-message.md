I’m blocked before editing. The required `lore-query-trace` and `lore_get_ci_failures` calls aren’t available as tools or local commands, and the CI brief’s logger trace doesn’t identify the failed test. I can’t safely distinguish that regression from the next test facet without the required coverage data and CI verdict.

No files were changed; no test ran.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Required Lore trace and full CI failure details are unavailable in this environment."}}