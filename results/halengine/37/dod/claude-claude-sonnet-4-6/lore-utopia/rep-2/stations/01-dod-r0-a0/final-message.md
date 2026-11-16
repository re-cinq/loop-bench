Branch is clean and pushed. Here's a summary of the work:

**Strategy: `direct`** — `ToolRegistry.execute` is the seam. The tests call it directly and fail because validation doesn't exist yet.

**4 acceptance tests** in `src/orchestration/tools/registry.acceptance.test.ts`, all failing for the right reason:

1. **Missing required field returns a ToolResponse naming the field, never calls the executor** — calls `execute('weather', {})` on a tool requiring `location`; fails because `response.result` is `"sunny"` (executor ran) instead of a rejection naming `location`

2. **Wrong-typed field is rejected without echoing its value** — calls with `{amount: 'very-secret-string-9847263'}` where a number is required; fails because `response.result` is `"converted"` instead of a rejection naming `amount`

3. **Register throws at registration time for an uncompilable schema, naming the tool** — passes `{$ref: '#/$defs/DoesNotExist'}` to `register`; fails because `register` currently never throws

4. **A schema-rejected tool call is returned to the provider for correction without ending the conversation** — drives the orchestrator through a bad call (`{}`) then a good call (`{location: 'Berlin'}`); fails because no rejection text is ever sent to the provider (the executor runs for both calls)

**Failure output:**
```
Tests: 4 failed, 4 total
● missing required field: Expected /location/ but received "sunny"
● wrong-typed field: Expected /amount/ but received "converted"
● register throws: Received function did not throw
● orchestrator test: expect(rejectionResult).toBeDefined() — Received: undefined
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}