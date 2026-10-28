Committed and pushed `6d8ebc3`. Static validators are reused; the Ajv import is repaired.

New test: red, then green after formatting. Acceptance tests remain for CI. The brief names two earlier ticket tests and at least one pre-existing regression; its truncated log prevents an exact count.

Next: dynamic-schema caching. Branch is current with main and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reuse static validators and repair CI-reported Ajv errors","tdd_next":"Cache dynamic schema validators by object reference"}}