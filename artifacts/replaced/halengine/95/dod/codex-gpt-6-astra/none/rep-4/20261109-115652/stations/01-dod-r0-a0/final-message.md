The provider criteria conflict with the no-stubs rule: built-in providers normalize failures to `Error`. Testing string, object, and `undefined` rejections requires a custom rejecting `AIProvider` fixture.

No files changed or tests run. Please permit that fixture so the acceptance tests can cover the stated behavior.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Please permit a custom rejecting AIProvider test fixture: the required non-Error provider rejections cannot be exercised through built-in providers, which normalize failures to Error, under the no-stubs constraint."}}