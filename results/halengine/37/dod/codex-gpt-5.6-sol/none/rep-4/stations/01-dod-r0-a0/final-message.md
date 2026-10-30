Defined and pushed the `direct` acceptance contract in:

- [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/1ab4dbfa5b6d/workspace/target/src/orchestration/tools/registry.acceptance.test.ts)
- [spec.md](/var/tmp/loop-bench/runs/1ab4dbfa5b6d/workspace/target/specs/hal-engine-tool-input-validation/spec.md)
- [dod.md](/var/tmp/loop-bench/runs/1ab4dbfa5b6d/workspace/target/.lore/dod.md)

Ran only the new acceptance file. All five tests failed for the intended missing behavior:

```text
Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

Representative failures:

```text
executorInputs: [malformed inputs...]
requiredNamed: false
typeNamed: false

registration: "did not throw"
registrationNamesTool: false

calls: 11
rejectedAfterMutation.result: "ok"

dynamic calls: 2
rejected.result: "accepted"

tool-loop calls: 2
retryInput.content: "sunny"
```

Commit `0771f0d` was pushed, merged against current `origin/main` (already up to date), and the branch matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}