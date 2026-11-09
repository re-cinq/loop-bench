Blocked by the no-stubs constraint: reproducing the required provider rejections needs a rejecting `AIProvider` fixture. Built-in providers offer no configuration for these rejection values.

No files changed or tests run. Please allow that fixture so acceptance tests can exercise the real orchestrator.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Allow a fault-injection AIProvider fixture for string, object, and undefined rejections; the no-stubs rule currently prohibits reproducing the required provider failures."}}