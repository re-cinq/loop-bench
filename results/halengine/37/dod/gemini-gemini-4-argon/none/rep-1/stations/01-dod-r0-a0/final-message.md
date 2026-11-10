Defined the Definition of Done for `#37` under the `direct` strategy in `.lore/dod.md`, added the specification at `specs/hal-engine-tool-input-validation/spec.md`, and committed 5 red acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts`.

### Failure Output

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation › rejects input missing a required field with a ToolResponse and never invokes the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "called": 0,
    -   "namesField": true,
    +   "called": 1,
    +   "namesField": false,
      }

      33 |     const response = await registry.execute('get_weather', {});
      34 |
    > 35 |     expect({called: calls, namesField: response.result.includes('location')}).toEqual({
         |                                                                               ^
      36 |       called: 0,
      37 |       namesField: true,
      38 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:35:79)

  ● ToolRegistry input validation › rejects a wrong-typed field without echoing the offending value in the response or logs

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "called": 0,
    +   "called": 1,
        "leakedInLogs": false,
        "leakedInResult": false,
    -   "namesField": true,
    -   "namesType": true,
    +   "namesField": false,
    +   "namesType": false,
      }

      62 |       leakedInResult: response.result.includes(String(secret)),
      63 |       leakedInLogs: logged.some(line => line.includes(String(secret))),
    > 64 |     }).toEqual({
         |        ^
      65 |       called: 0,
      66 |       namesField: true,
      67 |       namesType: true,

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:64:8)

  ● ToolRegistry input validation › throws at registration time for an uncompilable schema and names the tool

    expect(received).toThrow(expected)

    Expected pattern: /broken_tool/

    Received function did not throw

      79 |     };
      80 |
    > 81 |     expect(() => registry.register(broken, async () => 'ok')).toThrow(/broken_tool/);
         |                                                               ^
      82 |   });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:81:63)

  ● ToolRegistry input validation › validates a function-valued tool definition against the schema returned on each call

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
        "firstResult": "ok",
    -   "secondNamesMissing": true,
    +   "secondNamesMissing": false,
      }

      108 |       firstResult: firstCall.result,
      109 |       secondNamesMissing: secondCallMissingSecond.result.includes('second'),
    > 110 |     }).toEqual({
          |        ^
      111 |       firstResult: 'ok',
      112 |       secondNamesMissing: true,
      113 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:110:8)

  ● ToolRegistry input validation › feeds a rejected tool call back to the provider as a tool_result so the next round can recover

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
    -   "rejectionMentionsLocation": true,
    +   "rejectionMentionsLocation": false,
        "reply": "Berlin is 20C",
      }

      154 |         : '';
      155 |
    > 156 |     expect({reply, rejectionMentionsLocation: rejectionText.includes('location')}).toEqual({
          |                                                                                    ^
      157 |       reply: 'Berlin is 20C',
      158 |       rejectionMentionsLocation: true,
      159 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:156:84)

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}