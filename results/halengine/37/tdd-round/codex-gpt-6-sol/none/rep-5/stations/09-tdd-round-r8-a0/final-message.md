Committed and pushed one round. The new test failed on a bracket-quoted field path containing `]`, then passed after the parser fix and refactor. I also repaired all four CI-reported `max-expects` findings. The registry test file passes: 9 tests. One red test was mine; zero were regressions. The branch is up to date with `main` and its upstream.

The remaining facet is the additional tests and documentation updates in `.lore/dod.md`. I found no unrelated smells to report.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair four CI max-expects findings and preserve bracket-quoted legacy field paths","tdd_next":"Add remaining unit tests, spec links, and tool documentation updates"}}