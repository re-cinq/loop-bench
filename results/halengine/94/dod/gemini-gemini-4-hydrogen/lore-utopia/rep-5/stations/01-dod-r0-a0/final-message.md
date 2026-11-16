Added the failing acceptance test, spec traceability link, and `.lore/dod.md` on `loop-bench/94` (`587acca`, pushed and up to date with `origin/main`):

- `src/orchestration/chatOrchestrator.acceptance.test.ts`: asserts that when `beforeSession` throws, `onError` fires with `(session, error)`, `afterSession` fires after `onError` with `session`, no later turn hooks execute, and the original rejection still reaches the caller.
- `specs/hal-engine-config-hooks/spec.md`: adds the new guarantee bullet under `## Installing hooks through config` citing `src/orchestration/chatOrchestrator.acceptance.test.ts#L9`.
- `.lore/dod.md`: records `Strategy: direct`, the failing acceptance test, the implementer facets (moving `beforeSession` inside `try`, removing the recorded-flaw bullet in `spec.md`, keeping existing tests green unedited, and adding the `CHANGELOG.md` entry), and out-of-scope items.

Failure output from `NODE_OPTIONS=--experimental-vm-modules node node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator beforeSession failure handling › runs onError then afterSession and still rejects when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 5
    + Received  + 3

      Object {
    -   "afterSessionMatches": true,
    +   "afterSessionMatches": false,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorErrorMatches": true,
    -   "onErrorSessionMatches": true,
    +   "onErrorErrorMatches": false,
    +   "onErrorSessionMatches": false,
        "rejectedIsSameInstance": true,
        "rejectedMessage": "beforeSession boom",
      }
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}