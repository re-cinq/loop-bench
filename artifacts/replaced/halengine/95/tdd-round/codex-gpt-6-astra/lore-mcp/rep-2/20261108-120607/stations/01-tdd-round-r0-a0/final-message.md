Committed and pushed `05e6756`. One new test went red → green; refactor review required no further code changes. Branch is clean and current with main.

Red tests: 1 mine; no regressions reported, though CI status was unavailable. Acceptance tests remain for CI. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the caller rejection","tdd_next":"Pin cause and caller identity for plain-object and undefined rejections; confirm existing Error tests through CI"}}