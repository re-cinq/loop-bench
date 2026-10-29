I used the `direct` strategy and committed and pushed five acceptance tests in two new files, with the linked spec and [Definition of Done](/var/tmp/loop-bench/runs/2e74bc3e5ddb/workspace/target/.lore/dod.md). Only those test files were run. The branch is up to date with `origin/main` and is not ahead of its upstream.

The targeted run failed for the reported behavior:

> `Tests: 5 failed, 5 total`  
> `+"result": "forecast"` for malformed input; `+ "compiledAtRegistration": false`; `Received function did not throw` for a broken schema; and the provider received `"Sunny in Berlin"` instead of validation feedback.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}