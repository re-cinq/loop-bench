Branch is pushed and up to date. The round fixed 4 eslint errors and 1 spec-names failure from the CI report by merging the two separate `beforeSession` hook tests into a single test named "runs onError and afterSession when beforeSession throws" (matching the spec citation), using one `toMatchObject` expect, and updating the spec link from `#L40` to `#L51`.

No regressions introduced; all changes are confined to the acceptance test and spec link update. No unrelated smells addressed (the `#L40` line number in the spec was already wrong before this round — it's now corrected).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint max-expects + require-spec-link + spec-names mismatches from prior push","tdd_next":"acceptance green"}}