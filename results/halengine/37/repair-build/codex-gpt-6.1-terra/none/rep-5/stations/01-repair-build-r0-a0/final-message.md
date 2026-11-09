Fixed the reported Ajv import and lint findings, then committed and pushed them as `231643f`. The branch is up to date with `origin/main` and its upstream.

I formatted the two changed files and ran `git diff --check`. I did not run the test suite: the existing local Ajv installation is version 6, while the branch declares version 8. CI needs to verify the pushed fix.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Formatted changed files and checked the diff; tests were not run because the local Ajv installation does not match the declared dependency, so CI verification is pending."}}