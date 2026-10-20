Defined the Definition of Done for `#95` using the `direct` strategy in `.lore/dod.md`, linked the new guarantee in `specs/hal-engine-config-hooks/spec.md`, and added two red acceptance tests in `src/orchestration/onErrorNonError.acceptance.test.ts`.

Failure output from `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/onErrorNonError.acceptance.test.ts`:

```text
FAIL src/orchestration/onErrorNonError.acceptance.test.ts
  ● ChatOrchestrator onError on non-Error rejections › calls onError with an Error carrying the thrown string and runs afterSession while rethrowing

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 2

      Object {
        "callOrder": Array [
    -     "onError",
          "afterSession",
        ],
    -   "isError": true,
    -   "message": "string boom",
    +   "isError": false,
    +   "message": undefined,
        "outcome": Object {
          "reason": "string boom",
          "rejected": true,
        },
      }

  ● ChatOrchestrator onError on non-Error rejections › calls onError with an Error carrying a readable message when the stream rejects with a plain object

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 2

    @@ -1,12 +1,11 @@
      Object {
        "callOrder": Array [
    -     "onError",
          "afterSession",
        ],
    -   "hasMessage": true,
    -   "isError": true,
    +   "hasMessage": false,
    +   "isError": false,
        "outcome": Object {
          "reason": Object {
            "code": 503,
            "detail": "upstream down",
          },

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}