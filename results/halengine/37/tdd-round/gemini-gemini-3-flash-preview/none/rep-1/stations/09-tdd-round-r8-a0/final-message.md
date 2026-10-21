I've fixed all CI failures reported in the previous round:
1.  **Typecheck:** Corrected the `Ajv` import in `src/orchestration/tools/registry.ts` by using `import Ajv from 'ajv'`, which resolves the constructor properly in an ESM context with `NodeNext` module resolution.
2.  **ESLint:**
    -   In `src/orchestration/tools/registry.ts`, replaced `any` with a more specific type in the validation error path.
    -   In `src/orchestration/tools/registry.test.ts`, refactored the dynamic schema test to move variable declarations closer to their use and simplified the Jest spy member chain to stay within the 2-hop limit.
3.  **Test Failure:** Mocked the `@google-cloud/vertexai` module in `src/providers/providerFactory.test.ts`. The real constructor was failing in CI (likely due to missing credentials/environment validation) because it was present in `devDependencies`. The mock ensures the shape-check test passes without attempting to instantiate a real Vertex AI client.

I verified the fixes by running the modified tests locally with `node --experimental-vm-modules node_modules/jest/bin/jest.js`, and both `src/orchestration/tools/registry.test.ts` and `src/providers/providerFactory.test.ts` passed. I also formatted the files and ran the spec-link re-anchoring script.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI failures (typecheck, eslint, test)","tdd_next":"acceptance green"}}