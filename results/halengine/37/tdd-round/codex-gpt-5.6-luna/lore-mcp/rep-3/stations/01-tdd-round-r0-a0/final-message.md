Implemented and pushed one TDD round.

- Added required-property validation using Ajv.
- Added focused unit test and spec trace link.
- Updated DoD checklist.
- Test: 1 passed; 1 authored red test, 0 regressions.
- Branch merged with `origin/main` and is synchronized.
- Next facet: reject wrong-typed properties without leaking values.
- `npm install` reported existing audit vulnerabilities; not addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"required-property rejection returns a ToolResponse and skips the executor","tdd_next":"wrong-typed property rejection without leaking values"}}