Perfect! I've defined DONE for ticket #37 with comprehensive acceptance tests. Here's what I've delivered:

## Definition of Done Complete

**Strategy: `direct`** — The `ToolRegistry.execute` method already exists as a seam. The acceptance tests call it directly and verify validation behavior.

### Test File Created
- `src/orchestration/tools/registry.acceptance.test.ts` - 12 tests covering:
  - Missing required field validation
  - Extra properties pass-through (no coercion)
  - Type validation with field names (no values)
  - Enum constraint validation
  - Unknown tool still throws (unchanged)
  - Valid input passes through
  - Static schema compilation (once per registration)
  - Function-valued schema per-call validation
  - Identifying data privacy (no values in errors)
  - Schema compilation validation at register time

### Test Status
**6 tests FAIL for the right reasons** (validation logic not yet implemented):

```
● ToolRegistry.execute input validation › missing required fields › rejects missing required field
  Expected substring: "location"
  Received string:    "ok"

● ToolRegistry.execute input validation › type validation › rejects wrong-typed field
  Expected substring: "name"
  Received string:    "ok"

● ToolRegistry.execute input validation › enum validation › rejects non-enum value
  Expected substring: "units"
  Received string:    "ok"

● ToolRegistry.execute input validation › identifying data privacy › does not include property values
  Expected substring: "ssn"
  Received string:    "ok"

● ToolRegistry.execute input validation › identifying data privacy › does not include values in rejection
  Expected substring: "userId"
  Received string:    "ok"

● ToolRegistry.execute input validation › schema registration validation › throws at registration
  Expected: true
  Received: false
```

**6 tests PASS** (behaviors that work without validation, like passing valid input through).

### Documentation
- `.lore/dod.md` - Complete Definition of Done with central claim, strategy, test list, facets, and scope boundaries

### Commits
- Committed: `test(tools): acceptance tests for ToolRegistry input validation`
- Pushed to `origin/loop-bench/37`

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}