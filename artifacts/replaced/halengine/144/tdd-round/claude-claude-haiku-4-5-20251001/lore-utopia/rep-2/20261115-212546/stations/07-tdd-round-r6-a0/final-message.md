## Summary

**Fixed:** Regression where invalid `user_message` validation was not sending error frames  
**Impact:** All 54 messageHandler tests now pass (previously 3 were failing)

The issue was that when a `user_message` failed validation (empty, whitespace-only, or over-length content), the code was skipping directly to `stream_end` without sending the `error INVALID_MESSAGE` frame. I fixed this by adding validation failure handling in `answerUserMessage` to send the error frame before returning.

The fix ensures clients receive the complete error response sequence: error frame followed by stream_end, matching the protocol expectations defined in the acceptance criteria.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"regression fix: send error frame for invalid user_message","tdd_next":"acceptance green"}}