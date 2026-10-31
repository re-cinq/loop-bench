Defined and pushed direct acceptance coverage in commit `015012c`.

- Added registry and chat-loop acceptance tests plus traced spec and `.lore/dod.md`.
- Ran only the new tests; all 5 fail for the missing validation behavior.

Actual failures include:

> Expected pattern: `/location.*required|required.*location/i`  
> Received string: `"executor ran"`

> Expected: 0  
> Received: 1

Branch is pushed and merged with current `origin/main`; working tree is clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}