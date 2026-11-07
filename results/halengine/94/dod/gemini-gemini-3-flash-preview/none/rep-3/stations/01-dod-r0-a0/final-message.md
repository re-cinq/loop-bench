I have defined the **Definition of Done** for ticket #94 and delivered the red bar with a new acceptance test.

The acceptance test verifies that `onError` and `afterSession` are triggered when the `beforeSession` hook throws, which is the core requirement of the ticket. I have also updated the specification to reflect this new guarantee and defined what an `afterSession` hook can assume about the session state if `beforeSession` fails. The `CHANGELOG.md` has been updated to inform consumers of this behavioral change.

### Acceptance Test Failure Output

```
FAIL src/orchestration/beforeSession-failure.acceptance.test.ts
  ● beforeSession failure › runs onError and afterSession when beforeSession throws (specs/hal-engine-config-hooks/spec.md#6)

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      58 |
      59 |     expect(rejection?.message).toBe('beforeSession failed');
    > 60 |     expect(onErrorCalled).toBe(true);
         |                           ^
      61 |     expect(afterSessionCalled).toBe(true);
      62 |     expect(caughtError?.message).toBe('beforeSession failed');
      63 |   });

      at Object.<anonymous> (src/orchestration/beforeSession-failure.acceptance.test.ts:60:27)
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}