## Build Fixed ✓

I've fixed the red build on branch `loop-bench/94`. The issue was in the beforeSession acceptance test file which had TypeScript and ESLint errors.

### Problems Fixed:

1. **TypeScript Error** (line 30): Invalid `PromptBuilder` configuration
   - Replaced invalid properties (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`)
   - Used correct config shape: `identity` and `responseGuidelines`

2. **ESLint Error** (max-expects rule): Test had 3 expect calls exceeding the max of 1
   - Split the single test into 2 focused tests
   - Used `toMatchObject` to consolidate multiple state assertions into one expect

3. **Spec Link Errors**: Updated test line references in spec file to match new test locations

### Verification:
- ✅ `npm run typecheck` — passes with no errors
- ✅ `npm run eslint` — zero warnings  
- ✅ `npm run prettier:check` — all files properly formatted
- ✅ Tests pass (2 tests, 1 suite)
- ✅ Branch pushed to origin

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed TypeScript and ESLint errors in beforeSession acceptance tests by correcting PromptBuilder config and splitting test to comply with max-expects linter rule"}}