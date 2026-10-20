Pushed `0c422de`: wired turn-wide usage accumulation, repaired spec traceability, and updated the changelog/checklist.

One new test failed as expected, then passed after implementation and refactoring. No regression failures were identified. Acceptance tests remain CI’s responsibility.

Branch is clean, synchronized, and current with `main`. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wire the accumulator into the tool loop and preserve undefined for unreported turns","tdd_next":"Make the public total-usage contract explicit and complete MINOR release metadata"}}