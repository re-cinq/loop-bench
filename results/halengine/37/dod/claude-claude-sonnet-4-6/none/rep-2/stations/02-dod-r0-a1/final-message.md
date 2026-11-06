Everything is already in order. Here's the summary:

**Strategy: `direct`** — `ToolRegistry.execute` and `register` are both public methods callable in tests today. The seam exists; no scaffolding was needed.

**Acceptance tests committed at** `2a510ce` in `src/orchestration/tools/registry.acceptance.test.ts`:

**Test 1** — `rejects a call missing a required field and never invokes the executor` — **fails for the right reason:**
```
Expected: { callCount: 0, mentionsLocation: true }
Received: { callCount: 1, mentionsLocation: false }
```
The executor is called (callCount=1) because validation doesn't exist yet.

**Test 2** — `a schema-invalid tool call does not throw so the model receives the rejection text and can retry` — **fails for the right reason:**
```
Expected: { rejectionFedBack: true, result: 'retry done' }
Received: { rejectionFedBack: false, result: 'retry done' }
```
The rejection text naming `location` is not in round-2 messages because no rejection is produced.

The spec at `specs/hal-engine-tool-input-validation/spec.md` carries both `([validated by ...])` inline parentheticals pointing to the test file. `.lore/dod.md` records strategy `direct` and lists the two tests with their paths.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}