Cached dynamic schema validators by schema object reference and repaired the Ajv import and acceptance-fixture lint findings reported by CI. Commit `5b8810b` is pushed, and the branch is up to date with main and its upstream.

The focused test passed after one expected red run: **1 red test was mine, 0 were regressions**. Input validation and rejection remain for the next round. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache validators for function-valued tool definitions","tdd_next":"Validate input before invoking the executor"}}