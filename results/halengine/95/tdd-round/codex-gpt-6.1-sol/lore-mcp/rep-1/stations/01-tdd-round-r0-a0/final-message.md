Committed and pushed one red-green-refactor round. The new test failed once, then passed; no regressions were observed. Acceptance and existing tests await CI.

Branch is current with `main` and fully pushed. Next: handle rejection objects whose string conversion throws; changelog remains pending.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"wrap non-Error rejections for onError while preserving the caller rejection","tdd_next":"handle rejection objects whose string conversion throws"}}