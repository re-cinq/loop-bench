The acceptance tests have been written and pushed. Here is the failure output from the newly added tests, confirming that they fail because the input schema validation is currently absent:

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● Tool Input Validation › validates input against inputSchema, returns ToolResponse on failure, and does not invoke executor

    expect(received).toBe(expected) // Object.is equality

    Expected: 0
    Received: 1

      14 |     const result = await registry.execute('location_tool', {});
    > 15 |     expect(calls).toBe(0);
         |                   ^

  ● Tool Input Validation › rejects a wrong-typed field with a message naming the field path and expected type, without offending value

    expect(received).toMatch(expected)

    Expected pattern: /count/
    Received string:  "success"

      45 |     expect(result).toHaveProperty('result');
      46 |     const msg = (result as { result: string }).result;
    > 47 |     expect(msg).toMatch(/count/);
         |                 ^

  ● Tool Input Validation › throws at registration time for an uncompilable schema, and message names the tool

    expect(received).toThrow(expected)

    Expected pattern: /bad_schema_tool/

    Received function did not throw

      59 |       }, async () => 'success');
    > 60 |     }).toThrow(/bad_schema_tool/);
         |        ^

  ● Tool Input Validation › validates a function-valued definition against the schema current at that call, not a stale cached one

    expect(received).toBe(expected) // Object.is equality

    Expected: 1
    Received: 2

      77 |     const res2 = await registry.execute('dynamic_tool', { prop: 'text' });
    > 78 |     expect(calls).toBe(1); // Should fail validation, executor not called again
         |                   ^
```

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● chatOrchestrator validation loop › drives a stub provider through a rejected tool call followed by a corrected retry, and processMessage resolves with rejection visible

    expect(received).toMatch(expected)

    Expected pattern: /location/
    Received string:  "success"

      52 |     expect(callCount).toBe(2);
      53 |     // Provider should have seen the rejection text about the missing 'location'
    > 54 |     expect(textSeenByProviderOnRoundTwo).toMatch(/location/);
         |                                          ^
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}