Implemented and pushed static tool input rejection in commit `2667c4a`. The new focused test passed; CI will verify the typecheck and lint fixes and judge the acceptance tests.

The round observed one red test written here and no identified regression tests. The previous CI test job timed out without a specific failing test in the supplied log. No unrelated smells were addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid input for static tool schemas","tdd_next":"Cache and validate dynamic schemas during execution"}}