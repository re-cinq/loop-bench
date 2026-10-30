Committed and pushed the `direct` acceptance tests and [Definition of Done](/var/tmp/loop-bench/runs/f959fb87a154/workspace/target/.lore/dod.md) in `42037b1`. The named spec was absent, so I added it with links to the four new tests. The branch is up to date with `origin/main` and its upstream.

I ran only the two new test files. **All four tests fail for the ticket’s stated behavior**, including these failures:

> `"missing": false` and the executor received `Object {}`  
> `"invalidSchemaNamesTool": false`  
> `"staleMentionsCity": false`  
> `"rejectionSeen": false`

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}