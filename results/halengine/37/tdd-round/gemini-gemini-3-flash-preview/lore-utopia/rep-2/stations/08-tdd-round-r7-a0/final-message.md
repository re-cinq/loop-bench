I have fixed the type errors in `src/orchestration/tools/registry.ts` and the test failure in `src/orchestration/tools/registry.acceptance.test.ts` that were reported by CI in the previous round.

Specifically:
- Changed `import Ajv from 'ajv'` to `import { Ajv } from 'ajv'` to ensure correct resolution of the `Ajv` class and its `Options` type in the `NodeNext` environment.
- Fixed `RequiredParams` missing export by using an explicit type cast for `e.params` when the keyword is `'required'`.
- Added support for both Ajv 8's `instancePath` and Ajv 6's `dataPath` in error reporting to ensure the field name is always included in the rejection message, fixing the `mentionsField: false` failure.
- Verified all acceptance and unit tests pass locally.
- Updated `.lore/dod.md` to tick the acceptance criteria now that they are verified green.
- Formatted the changed file with Prettier.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI failures fixed, acceptance green","tdd_next":"acceptance green"}}