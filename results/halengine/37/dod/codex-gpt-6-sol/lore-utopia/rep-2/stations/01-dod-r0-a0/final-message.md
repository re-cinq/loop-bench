Added five acceptance tests in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/fbec9c326a55/workspace/target/src/orchestration/tools/registry.acceptance.test.ts), with [spec links](/var/tmp/loop-bench/runs/fbec9c326a55/workspace/target/specs/hal-engine-tool-input-validation/spec.md) and a [Definition of Done](/var/tmp/loop-bench/runs/fbec9c326a55/workspace/target/.lore/dod.md). No production code changed.

The named test file ran and all five tests failed on the reported behavior. The failure output includes `"rejectionSeenByProvider": "forecast"`, `"wrongType": "forecast"`, `"invalid": "forecast"`, `"staleInput": "forecast"`, and `Received function did not throw`. Jest reported `Tests: 5 failed, 5 total`.

Committed as `63cb338`, pushed, and confirmed the branch is current with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}