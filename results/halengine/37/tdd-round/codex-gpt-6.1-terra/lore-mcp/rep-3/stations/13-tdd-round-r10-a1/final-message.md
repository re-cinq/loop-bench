Committed and pushed the validation repair. Explicitly forbidden properties now appear in rejection paths, the Ajv import uses the package entry point, and the CI-reported test lint issue is fixed.

The new focused test failed before the change and passed afterward. CI’s previous verdict named two non-acceptance test failures from this branch and one acceptance-test failure; it named no pre-existing regression tests. CI will judge the pushed changes.

Commit: `bbb7bfb`. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair Ajv import and test lint issues and report forbidden-property paths","tdd_next":"Confirm CI coverage after the Ajv import repair"}}