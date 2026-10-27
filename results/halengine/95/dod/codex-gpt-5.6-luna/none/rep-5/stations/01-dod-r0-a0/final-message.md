Added and pushed commit `d55baaa` with:

- Direct acceptance test for string, object, and `undefined` rejections.
- Updated spec traceability.
- `.lore/dod.md` with `direct` strategy.
- Existing Error tests left unedited.

Acceptance test failed for the intended reason:

> Expected length: 1  
> Received length: 0  
> Received array: []

Branch is merged with `origin/main` and synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}