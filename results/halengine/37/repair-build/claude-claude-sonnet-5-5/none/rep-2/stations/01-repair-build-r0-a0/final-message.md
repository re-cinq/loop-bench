I fixed the three red checks from CI's report and pushed the branch. I did not run the tests, typecheck or linter here, so CI has to confirm.

I couldn't test locally. This pod's `node_modules` has ajv 6.15, while `package.json` and the lockfile specify 8.20. Jest also failed to load the suites when I invoked it directly, because it was run without the repo's ESM setup, so I discarded that result.

- **typecheck and test:** `import {Ajv} from 'ajv'` failed both at runtime and in `tsc`. Both errors came from that one import. I switched it to `import AjvModule from 'ajv'` and `const Ajv = AjvModule.default;` in `src/orchestration/tools/registry.ts`.
- **eslint `preserve-caught-error`:** the schema-compile error in `registry.ts` now carries `{cause: error}`.
- **eslint in the acceptance test:**
  - `prefer-early-return`: in `registry.acceptance.test.ts` the `round === 2` branch is now a guard (`round !== 2`) that returns early, so the rest runs flat.
  - `max-member-chain`: the `lastMessage.content[0]?.content` chain is now a destructure (`const [firstResult] = lastMessage.content`).

Prettier left both changed files unchanged. The branch had not moved past the sha CI judged. Merging `origin/main` was a no-op, and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv import failed under NodeNext (use default export), added error cause, flattened test provider lint findings"}}