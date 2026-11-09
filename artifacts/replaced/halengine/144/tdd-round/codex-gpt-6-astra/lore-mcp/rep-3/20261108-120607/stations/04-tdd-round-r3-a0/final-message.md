Blocked by contradictory contracts: `.lore/dod.md` and the acceptance test require `session_list: []` when `listFor` is absent; ticket #144 requires `UNSUPPORTED` and explicitly forbids that fallback. The frame names also differ.

Per your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. No commit or push. New red tests: 0; regressions identified: 0.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance contract conflicts with ticket #144 on frame names and missing-listFor behavior; the intended contract must be resolved."}}