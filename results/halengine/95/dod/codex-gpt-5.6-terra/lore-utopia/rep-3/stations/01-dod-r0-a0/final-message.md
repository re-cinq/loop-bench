Added and pushed commit `6f76f63`.

The isolated acceptance test fails for the stated defect:

```text
Expected hookCalls: 1
Received hookCalls: 0
```

This occurs for string, plain-object, and `undefined` rejections, while caller propagation remains unchanged. The focused runner also reports expected coverage-threshold failures because it runs one file only.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}