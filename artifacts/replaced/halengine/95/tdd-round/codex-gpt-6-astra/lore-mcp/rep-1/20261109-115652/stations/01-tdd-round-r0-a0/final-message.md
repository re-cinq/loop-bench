Committed and pushed `280986e`. Added rejection normalization, spec traceability, and a completed facet.

One new test passes after formatting. Initial red: one new suite failed on the missing module; zero regressions observed. CI verdict was unavailable. Acceptance tests were not run.

Next: wire normalization into `onError`. No unrelated smells identified. Branch is current with main and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize hook rejections while preserving Error identity and original cause","tdd_next":"Wire normalization into onError for every rejection"}}