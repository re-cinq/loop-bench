I’m blocked from completing a valid red–green round. The remaining DoD facet is to confirm existing `Error` handling, and the current implementation already passes an `Error` through unchanged. Any test I can write for that behavior would start green, so it would skip the required red phase.

The previous CI verdict also flags a line in the acceptance test, which I’m not allowed to edit. I made no changes, ran no tests, and did not commit or push.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"No remaining behavior facet can be expressed as a genuinely failing test: the Error pass-through is already implemented, and the CI lint finding is in a protected acceptance test."}}