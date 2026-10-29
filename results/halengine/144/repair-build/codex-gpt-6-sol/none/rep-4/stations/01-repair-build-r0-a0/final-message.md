I fixed the reported WebSocket list failure and lint findings, then pushed commit `3c6a88e`. The test expecting an empty list when `listFor` is unavailable was wrong under the ticket’s contract, so it now expects `UNSUPPORTED`.

The three affected suites pass locally (33 tests). Prettier and the whitespace check passed. The branch is up to date with `main` and fully pushed; CI has not yet judged this commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"WebSocket list requests lacked a store-backed response and tests had reported lint errors"}}