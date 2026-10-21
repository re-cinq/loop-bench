I have fixed the `Ajv` import issue that was causing CI failures in `src/orchestration/tools/registry.ts`. The error occurred because the project is in ESM mode, and `ajv` v8 should be imported as a default import rather than a named import in this environment.

### Changes:
- Modified `src/orchestration/tools/registry.ts`: Changed `import {Ajv} from 'ajv'` to `import Ajv from 'ajv'`.
- Verified the fix by running:
    - `src/orchestration/tools/registry.acceptance.test.ts` (All 4 tests passed)
    - `src/orchestration/tools/registry.test.ts` (All 11 tests passed)
    - `src/orchestration/chatOrchestrator.test.ts` (All 23 tests passed)
- Ran `scripts/repoint-spec-anchors.mjs` to ensure all spec links are up to date.
- Confirmed that documentation (`README.md`, `docs/adding-a-tool.md`), specs (`specs/hal-engine-tool-input-validation/spec.md`), and the changelog were already correctly updated by previous rounds.

All facets in `.lore/dod.md` were already marked as completed, and with this fix, the acceptance tests now pass as expected.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures","tdd_next":"acceptance green"}}