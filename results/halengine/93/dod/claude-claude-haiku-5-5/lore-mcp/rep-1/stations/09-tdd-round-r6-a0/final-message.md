Pushed. All acceptance tests pass locally (3/3 green). The CI fix: `launchTimeout` was hard-coded at 60,000ms while the `beforeAll` budget (`BINARY_DOWNLOAD_MS`) was already 120,000ms — CI workers hit the shorter limit and failed. Now both use the same 120,000ms constant.

No unrelated smells noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"increase mongod launchTimeout to match BINARY_DOWNLOAD_MS to fix CI timeout","tdd_next":"acceptance green"}}