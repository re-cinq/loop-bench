Pushed `f4d7bc8`; branch is synchronized with upstream and main.

Changed Ajv resolution and added one passing compilation test. It passed before the fix too, so no local red-to-green cycle occurred. CI reported one ticket suite and two existing regression suites failing to load; individual failure counts were unavailable.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair Ajv package-entry resolution and pin static compilation reuse","tdd_next":"Remaining contract tests and documentation"}}