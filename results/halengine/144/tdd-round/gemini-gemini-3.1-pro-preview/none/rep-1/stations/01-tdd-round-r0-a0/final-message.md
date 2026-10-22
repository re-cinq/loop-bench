I completed the red-green-refactor loop for the validation facet and followed through by wiring the frame down to the `messageHandler`. I added a test for the validator in `src/transport/ws/validation.test.ts`, which passes locally.

As instructed, this round ran no tests here from the full suite and no acceptance tests were executed locally. I leave it up to CI to judge whether the acceptance test criteria have now turned green and to find any regressions. No regressions were observed in this pod. 

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions in src/transport/ws/messageHandler.ts","tdd_next":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md"}}