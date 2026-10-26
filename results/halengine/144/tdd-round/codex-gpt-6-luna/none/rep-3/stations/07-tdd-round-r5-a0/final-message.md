Restored `switch` dispatch in [validation.ts](/var/tmp/loop-bench/runs/565bbe0e64f9/workspace/target/src/transport/ws/validation.ts) to clear the reported lint findings. Fixed the ping barrier helper so reconnect tests retain the `pong`, and added a focused regression test with a spec citation.

The new test failed before the helper fix and passed after it. One red test was mine; the two CI reconnect failures were repaired. I did not run the acceptance suite or broader checks. Changes are committed and pushed; the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"retain ping barrier pong frames and restore lint-safe validation dispatch","tdd_next":"acceptance green"}}