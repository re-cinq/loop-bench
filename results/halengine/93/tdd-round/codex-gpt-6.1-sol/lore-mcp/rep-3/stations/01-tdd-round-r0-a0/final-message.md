Committed and pushed `f0c9226`: pure token-field summation with traceability.

One new test went red, then green; no regressions observed. Acceptance tests were not run. Lore queries returned 403. Branch is current with main and fully pushed.

Next: connect accumulation to the hook and preserve missing-usage behavior. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pure accumulation of reported token fields without mutating inputs","tdd_next":"Connect turn-wide usage accumulation to the hook, preserving undefined when no rounds report usage"}}