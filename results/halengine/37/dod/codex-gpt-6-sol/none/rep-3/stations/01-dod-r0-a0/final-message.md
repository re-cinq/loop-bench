Committed and pushed five red acceptance tests using the **`direct`** strategy. They cover registry validation, schema registration and reuse, dynamic schemas, and a corrected tool call through the orchestrator. The branch is up to date with `origin/main` and its upstream.

I ran only the two new acceptance files. Jest reported **5 failed, 5 total**. The failures show the missing behavior:

> `"rejection": "forecast"` instead of a message naming `location` as required  
> `"calls": 2` instead of `0` for invalid typed and enum input  
> `"compiledAtRegistration": false`, `"errorMessage": ""`  
> `"stale": "forecast"` instead of a `postalCode` rejection  
> `"rejectionSeen": "sunny in Berlin"` instead of the rejection text

The tests and the remaining implementation facets are recorded in [.lore/dod.md](/var/tmp/loop-bench/runs/a9f0370d847c/workspace/target/.lore/dod.md).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}