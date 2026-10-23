Perfect! I've successfully fixed the RED build. Here's what was wrong and how I fixed it:

## Issues Found and Fixed

### 1. **Typecheck Error** (line 30)
The test was using non-existent `PromptBuilderConfig` properties:
- `baseSystemPrompt` → corrected to `identity`
- `systemPromptSuffix` → removed (not a PromptBuilderConfig property)
- `contextConfig` → removed (not a PromptBuilderConfig property)

### 2. **ESLint max-expects Error** (line 40)
The test had 3 separate expect calls, violating the linter rule (max 1 per test):
```typescript
// Before: 3 separate expects
await expect(...).rejects.toThrow(...);
expect(caughtError).toBe(...);
expect(afterSessionRan).toBe(true);

// After: 1 consolidated expect
expect({thrownError, caughtError, afterSessionRan}).toMatchObject({...});
```

### 3. **Spec Validation Link**
Updated the spec file to point to the correct test line (L34).

Both typecheck and eslint now pass successfully. The changes have been committed and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed typecheck error (invalid PromptBuilder config properties) and eslint error (consolidated multiple expects into single assertion)"}}