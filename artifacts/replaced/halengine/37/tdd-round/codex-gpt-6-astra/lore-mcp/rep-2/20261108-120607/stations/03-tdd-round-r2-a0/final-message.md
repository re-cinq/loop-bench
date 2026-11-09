Pushed `23f8471`: named Ajv constructor, linked construction test, updated checklist and changelog. Branch is synchronized; main needed no merge.

Focused test passes, but also passed before the fix—no local red reproduction. CI’s excerpt identifies one ticket-test failure and at least one regression. Refactor review required no further changes.

Next: validator reuse and dynamic-schema caching. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv constructor import","tdd_next":"Reuse static validators and cache dynamic schemas"}}