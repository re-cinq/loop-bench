The round is committed and pushed as `d4edc63` (`Run session hooks when setup fails`). The branch is up to date with its upstream.

The new regression test failed before the change, then passed after moving `beforeSession` inside the `try`. I ran only that test; the full acceptance test was not run. One red test was mine; zero regressions were reported. The changelog facet remains for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try and update the spec guarantee","tdd_next":"Document the consumer-facing change in CHANGELOG"}}