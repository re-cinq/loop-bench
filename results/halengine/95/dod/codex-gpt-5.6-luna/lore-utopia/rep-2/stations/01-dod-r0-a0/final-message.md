Implemented and pushed commit `5e95e82`.

- Added one direct acceptance test covering string, object, `undefined`, and existing `Error` rejections.
- Updated the spec traceability link.
- Added `.lore/dod.md`.
- Acceptance test intentionally fails because `onError` receives zero calls for non-Error rejections.

Failure excerpt:

```text
Expected hookCallCount: 1
Received hookCallCount: 0
Tests: 3 failed, 1 passed, 4 total
```

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}