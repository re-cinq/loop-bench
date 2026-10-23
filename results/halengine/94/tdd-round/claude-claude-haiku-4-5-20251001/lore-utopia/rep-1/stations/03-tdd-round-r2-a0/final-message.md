Perfect! I've successfully resolved both CI failures from the previous round:

## Changes made:

1. **Fixed eslint error**: Refactored the test to use a single `expect` call with a combined object assertion, reducing from 3 separate expect calls to 1.
2. **Fixed spec-names error**: Corrected the spec citation anchor from `#L40` to `#L34` to point to the correct test statement line.

Both changes were committed and pushed. The branch is now up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"resolve CI failures","tdd_next":"acceptance green"}}