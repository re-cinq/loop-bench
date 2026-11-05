Pushed `28ec423`: repaired Ajv loading and added enum constraint diagnostics.

One new test went red→green and passed after formatting. CI reported one identifiable pre-existing regression suite; its import failure is addressed, pending CI verification. No unrelated changes. Branch is clean and synchronized with origin/main.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair Ajv loading and name enum rejection constraints","tdd_next":"Remaining registry/tool-loop coverage and documentation"}}