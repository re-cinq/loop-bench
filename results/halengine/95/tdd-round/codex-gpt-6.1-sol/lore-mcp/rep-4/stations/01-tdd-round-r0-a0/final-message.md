Committed and pushed one red-green-refactor round. The new test failed as expected, then passed; 1 authored red test, 0 observed regressions. Acceptance tests remain for CI.

Updated the spec, changelog, trace metadata, and DoD. Branch is clean and current with main. Next facet: handle rejection values whose string conversion throws.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections with their original cause while preserving caller rejection","tdd_next":"Handle rejection values whose string conversion throws"}}