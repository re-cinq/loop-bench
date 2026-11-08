The acceptance tests are already committed and failing correctly. Here is the summary:

**Strategy: `direct`** — `ToolRegistry.execute` is a callable seam today. The tests call it with invalid input and assert on the returned value; they fail because no validation exists.

**Tests run:** `src/orchestration/tools/registry.acceptance.test.ts`

**Command:** `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts --no-coverage`

**Actual failure output:**

```
● ToolRegistry.execute input validation › returns a ToolResponse naming the missing required field without calling the executor

  expect(received).toEqual(expected)

  - Expected  - 1
  + Received  + 1

    Object {
  -   "resultMentionsLocation": true,
  +   "resultMentionsLocation": false,
      "callCount": 0,
    }
  
● ToolRegistry.execute input validation › rejects a wrong-typed field without exposing the submitted value

  expect(received).toEqual(expected)

  - Expected  - 1
  + Received  + 1

    Object {
      "resultExposesValue": false,
  -   "resultMentionsPath": true,
  +   "resultMentionsPath": false,
    }

Tests: 2 failed, 2 total
```

Both tests fail because `ToolRegistry.execute` currently calls the executor without validating input — `response.result` is the executor's output (`'sunny'` or `'found'`), not a validation error message, so `.includes('location')` and `.includes('userId')` both return `false`.

The spec (`specs/hal-engine-tool-input-validation/spec.md`) has all its testable statements linked to these tests. The `.lore/dod.md` and the tests were committed in `16abff7` and are already on `origin/loop-bench/37`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}