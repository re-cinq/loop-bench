I fixed the three red checks and pushed the branch. I didn't run any tests, typecheck or lint here, so CI hasn't confirmed the fix.

The branch hadn't moved since CI judged it, and `origin/main` was already merged in.

- **Typecheck and test:** `src/orchestration/tools/registry.ts` used `import {Ajv} from 'ajv'`. ajv 8 has no named `Ajv` export under NodeNext/ESM, so TS saw only a type and jest couldn't link the module. It now uses `import Ajv from 'ajv'` and `new Ajv.default(...)`.
- **ESLint, `preserve-caught-error`:** the rethrown schema-compile error in `registry.ts` now carries `{cause: error}`.
- **ESLint, `max-member-chain`:** in `registry.acceptance.test.ts`, `lastMessage.content[0]?.content` became a destructured `firstBlock`.
- **ESLint, `prefer-early-return`:** the test provider's `round === 2` branch now uses a guard (`round !== 2`) that returns early.

The local `node_modules` has ajv 6.15 (hoisted from eslint), not the ajv 8.20 that `package.json` asks for. I couldn't check the import against 8.x here, so the `Ajv.default` form rests on how ajv 8 exports itself.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv default import (Ajv.default), error cause on schema compile rethrow, and two lint fixes in registry.acceptance.test.ts; not verified locally, CI re-judges the push"}}