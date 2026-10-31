Implemented and pushed `e71f33c`.

- Added Ajv and minor version bump to 0.4.0.
- Static schemas now compile at registration and name the tool on failure.
- Added a linked unit test; it passes.
- CI brief had no reported failures: 1 red test was mine, 0 regressions.
- Next facet: cache compiled function-source schemas and validate at execute time.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv to dependencies and bump the package version MINOR","tdd_next":"Compile static schemas once and cache function-source validators by schema object reference"}}