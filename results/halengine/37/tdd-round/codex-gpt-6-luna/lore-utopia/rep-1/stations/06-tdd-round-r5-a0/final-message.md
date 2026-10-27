Added focused coverage for dynamic schemas and fixed the reported lint issue by consolidating assertions. The test passed; the branch is pushed and up to date at `fbcc07c`. No regressions were reported in the brief; the initial red was from a test setup assumption, which I corrected.

The remaining docs, acceptance tests, and other unit-test facets are still for the next round. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"dynamic schema validation and validator reuse coverage","tdd_next":"remaining unit tests and documentation facets"}}