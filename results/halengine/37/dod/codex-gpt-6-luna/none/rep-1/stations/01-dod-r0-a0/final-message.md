Committed and pushed `3692ebf` (`test(tools): define input validation acceptance`). The branch is up to date with `origin/main`, and `git status` shows it is not ahead of its upstream.

The focused acceptance run had 2 failures and 1 pass. Missing `location` was accepted and the executor returned `"forecast"`; a second call using a changed schema was also accepted. The extra-property pass-through test passed.

> Expected substring: `"location"`  
> Received string: `"forecast"`

> Expected substring: `"second"`  
> Received string: `"accepted"`

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}