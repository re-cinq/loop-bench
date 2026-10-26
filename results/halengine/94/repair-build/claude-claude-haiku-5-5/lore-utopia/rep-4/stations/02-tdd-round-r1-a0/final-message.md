Branch is up to date. The fix was a single line change in the spec file: the acceptance test `"runs onError and afterSession when beforeSession throws"` lives at line 32 (not line 40), so the `#L40` citation was wrong. Running `npm run spec:names` confirmed the fix.

0 regressions caused. 0 new tests written this round — this was a mechanical repair of a broken spec citation introduced by a previous round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec-names CI failure: repoint acceptance test link from #L40 to #L32","tdd_next":"acceptance green"}}