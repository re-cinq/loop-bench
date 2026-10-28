Added and pushed the `direct` acceptance test in commit `c9e8037`. It exercises `processMessage()` and fails because the throwing `beforeSession` skips both failure hooks. Updated the spec’s guarantee and recorded the cleanup assumption in the DoD.

The test output included:

```text
Object {
  "afterSessionArg": undefined,
  "calls": Array [],
  "onErrorArgs": undefined,
  "rejection": [Error: beforeSession failed],
}
```

The branch is clean and matches its upstream; `origin/main` was already merged. The spec anchor script reported no unresolved links, though it skipped reanchoring this spec because its anchor set differs from `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}