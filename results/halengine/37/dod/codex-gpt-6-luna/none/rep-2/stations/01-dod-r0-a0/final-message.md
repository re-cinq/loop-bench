Added a direct acceptance test for missing required `location` input and documented it in `.lore/dod.md` and the new validation spec. The spec citation points to the test declaration.

The focused test fails for the ticket’s stated reason:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation › rejects missing required tool input before calling the executor [specs/hal-engine-tool-input-validation#1]

    Object {
    -   "calls": 0,
    -   "result": StringContaining "location",
    +   "calls": 1,
    +   "result": "forecast",
      }
```

Committed as `45e72ed` and pushed. `origin/main` was already merged, and the branch is clean and up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}