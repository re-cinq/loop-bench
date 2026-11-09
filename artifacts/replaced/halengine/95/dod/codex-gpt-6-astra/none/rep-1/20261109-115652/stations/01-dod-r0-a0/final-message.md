The provider acceptance criteria conflict with the prohibition on stubs: bundled providers either normalize failures into `Error` or cannot produce the specified rejections. Exercising strings, objects, and `undefined` requires a deliberately rejecting provider fixture.

No files changed or tests run. Please permit that fixture so the tests can exercise the real orchestrator without changing production code.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Please permit a deliberately rejecting AIProvider test fixture, or identify a real provider that emits string, plain-object, and undefined rejections; the required provider cases cannot be exercised under the current no-stubs constraint."}}