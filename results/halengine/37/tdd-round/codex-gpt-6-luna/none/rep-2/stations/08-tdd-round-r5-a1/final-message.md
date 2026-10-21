Completed one red–green–refactor round for the constraint scope: the new test first failed on `minLength`, then passed after registry validation was limited to required fields, types, and enums. I also removed the duplicate logging test flagged by CI; the acceptance test still covers rejection logs.

The focused test passed. Formatting ran, the changes were committed and pushed as `db873de`, and the branch is up to date with `origin/main`. I could not query the lore graph because `lore-query-trace` is unavailable in this pod.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Ignore JSON Schema constraints beyond required, types, and enums during tool input validation","tdd_next":"Complete remaining input-validation facets and CI findings"}}