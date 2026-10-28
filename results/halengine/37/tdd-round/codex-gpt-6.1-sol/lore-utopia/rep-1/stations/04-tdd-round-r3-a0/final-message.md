Committed and pushed `1461236`. Dynamic schemas now validate per call with cached validators; Ajv loading also addresses CI’s reported import failure.

One new test went red → green and passed after refactoring. No pre-existing regressions identified. Acceptance checks remain CI’s responsibility.

Recorded the existing spec-anchor mismatch for a later round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate dynamic definitions and cache validators by schema object reference","tdd_next":"Verify rejection paths and privacy without leaking input values"}}