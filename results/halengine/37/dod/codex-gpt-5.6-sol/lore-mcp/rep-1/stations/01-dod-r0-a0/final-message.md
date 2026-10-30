Defined and pushed four red acceptance tests using the `direct` strategy.

Files added:

- `src/orchestration/tools/registry.acceptance.test.ts`
- `specs/hal-engine-tool-input-validation/spec.md`
- `.lore/dod.md`

Test command:

```text
npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts --runInBand
```

Actual result:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

The failures show:

- Invalid inputs invoked the executor three times instead of zero.
- Dynamic schemas were ignored.
- Broken static schemas did not fail registration and valid schemas were not compiled there.
- The malformed orchestrator call reached the executor and no validation rejection was returned to the provider.

Committed as `4a851d2` and pushed. The branch is current with `origin/main` and has `0 0` upstream divergence.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}