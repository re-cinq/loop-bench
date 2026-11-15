Added the executable Definition of Done for `re-cinq/HALEngine#95` under strategy `direct`:

- `src/orchestration/chatOrchestrator.acceptance.test.ts` — three acceptance tests verifying `onError` is called once with an `Error` wrapping the original rejection as `cause` (for a string, a plain object, and `undefined`) while re-throwing the original rejection unchanged
- `specs/hal-engine-config-hooks/spec.md` — replaced the `Measured semantics — out of scope` section with `Error hook guarantees` linked via `([validated by: ...])` citations (passing `spec:names`, `check:spec-links`, `check:spec-status`, and `repoint-spec-anchors.mjs --check origin/main`)
- `.lore/dod.md` — recorded strategy, acceptance tests, facets, and out-of-scope items

Red-bar test output (`NODE_OPTIONS="--experimental-vm-modules" npx jest --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`):

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● onError acceptance criteria for rejections that are not Error instances › calls onError once with an Error wrapping a string rejection as cause while rethrowing the original string

    expect(received).toEqual(expected) // deep equality

    - Expected  - 7
    + Received  + 1

      Object {
        "outcome": Object {
          "rejected": true,
          "value": "upstream timeout",
        },
    -   "recorded": Array [
    -     Object {
    -       "cause": "upstream timeout",
    -       "hasCause": true,
    -       "isError": true,
    -     },
    -   ],
    +   "recorded": Array [],
      }

  ● onError acceptance criteria for rejections that are not Error instances › calls onError once with an Error wrapping a plain object rejection as cause while rethrowing the original object

    expect(received).toEqual(expected) // deep equality

    - Expected  - 11
    + Received  +  2

    @@ -4,18 +4,9 @@
          "value": Object {
            "code": "ECONNRESET",
            "retryable": true,
          },
        },
    -   "recorded": Array [
    -     Object {
    -       "cause": Object {
    -         "code": "ECONNRESET",
    -         "retryable": true,
    -       },
    -       "hasCause": true,
    -       "isError": true,
    -     },
    -   ],
    -   "sameCauseRef": true,
    +   "recorded": Array [],
    +   "sameCauseRef": false,
        "sameOutcomeRef": true,
      }

  ● onError acceptance criteria for rejections that are not Error instances › calls onError once with an Error wrapping an undefined rejection as cause while rethrowing undefined

    expect(received).toEqual(expected) // deep equality

    - Expected  - 7
    + Received  + 1

      Object {
        "outcome": Object {
          "rejected": true,
          "value": undefined,
        },
    -   "recorded": Array [
    -     Object {
    -       "cause": undefined,
    -       "hasCause": true,
    -       "isError": true,
    -     },
    -   ],
    +   "recorded": Array [],
      }

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

Committed as `79b66f7` on `loop-bench/95`, pushed to `origin/loop-bench/95`, and verified up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}