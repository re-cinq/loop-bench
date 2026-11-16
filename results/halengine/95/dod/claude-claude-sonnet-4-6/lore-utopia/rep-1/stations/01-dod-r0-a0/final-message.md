Branch is pushed and up to date. Here's a summary of what was delivered:

---

**Strategy: `direct`** — the seam already exists (`createChatOrchestrator`'s `catch` block + `onError` hook), so the acceptance tests call `processMessage` directly against providers that reject with non-Error values.

**Three red acceptance tests** in `src/orchestration/chatOrchestrator.acceptance.test.ts`:

1. Provider rejects with a **string** → `onError` called once with an `Error` whose `cause` is the string; caller gets the original string
2. Provider rejects with a **plain object** → same guarantee
3. Provider rejects with **`undefined`** → same guarantee

**Actual failure output (all three):**
```
Expected: 1
Received: 0
```
`onErrorCallCount` stays 0 because `chatOrchestrator.ts:150` guards `onError` with `error instanceof Error`, which is `false` for all three non-Error rejection types — exactly the bug the ticket reports.

**Also committed:**
- Three new spec statements in `specs/hal-engine-config-hooks/spec.md` with `validated-by` citations at the correct `it(` line numbers (L32, L53, L73)
- `.lore/dod.md` recording the strategy, the three test checkboxes, and the facets the implementation pod needs to close

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}