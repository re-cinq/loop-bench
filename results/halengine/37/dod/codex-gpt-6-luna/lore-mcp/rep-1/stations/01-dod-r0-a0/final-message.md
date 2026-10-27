Added and pushed the `direct` DoD in commit `3d5d193`. The named acceptance test fails because the executor ran for `{}` and returned `"forecast"`:

> Expected pattern: `/location.*required/i`  
> Received string: `"forecast"`

`origin/main` was already merged, and the branch is up to date with its upstream. Lore’s test-list command reported “No test-command manifest declared for this repo”; I ran the named Jest file directly.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}