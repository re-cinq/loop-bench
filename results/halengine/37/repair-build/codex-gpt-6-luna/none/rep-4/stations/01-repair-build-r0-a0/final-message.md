Fixed the AJV import, added schema validation before tool execution, cached function sourced schemas by schema object, and resolved the reported lint issues. The registry acceptance test passed (4 tests). I did not run the linter or typecheck, as instructed.

Committed and pushed `1241a47`; `origin/main` was already merged, and the branch is up to date with its upstream. CI has not yet judged this push, so I can’t confirm the build is green.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"The focused registry acceptance test passed, but CI has not yet judged the pushed commit; lint and typecheck were not run per instruction."}}