Perfect! All checks pass. Let me create a final summary of what was fixed:

## Summary

I successfully fixed the RED build for ticket #94. The issues were:

### 1. **TypeScript Error** (line 30)
**Problem**: `baseSystemPrompt` property doesn't exist in `PromptBuilderConfig`
**Fix**: Updated the PromptBuilder instantiation to use correct property names:
- Changed `baseSystemPrompt: 'You are HAL.'` → `identity: 'You are HAL.'`
- Changed `systemPromptSuffix: 'Be precise.'` → `responseGuidelines: 'Be precise.'`
- Removed non-existent `contextConfig` object

### 2. **ESLint max-expects Error** (line 40)
**Problem**: Test had 3 expect calls but max is 1
**Fix**: 
- Split the single test into two separate tests
- Combined the two `expect` calls into a single assertion using `toEqual` on an object
- The second test now catches the promise rejection gracefully before checking hook invocations

### 3. **Spec Link Updates**
Updated the spec file links to point to the correct line numbers (36 and 53) for the new test structure.

### Verification
All checks now pass:
- ✅ `npm run typecheck` — No type errors
- ✅ `npm test` — Both tests pass
- ✅ `npm run eslint` — No linting errors
- ✅ `npm run prettier:check` — Code is properly formatted

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed PromptBuilder config (wrong properties) and test assertions (max-expects rule violation)"}}