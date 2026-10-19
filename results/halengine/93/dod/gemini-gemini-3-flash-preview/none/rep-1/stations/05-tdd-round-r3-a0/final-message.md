Pushed and up to date. The round fixed all three CI failures from the previous build:

1. **typecheck/test**: Added `import {ToolRegistry} from './tools/index.js';` to `chatOrchestrator.test.ts` — `ToolRegistry` was used at line 529 but never imported.
2. **eslint (spec-link)**: Updated spec links for the two tests at L404/L416 (the old #L428/#L440 were outside those tests' line spans, so the rule considered them unlinked).
3. **spec-names**: Ran `check-spec-anchor-names.mjs --fix` which repointed 7 stale citations across `hal-engine-architecture/spec.md` and `hal-engine-tool-input-validation/spec.md` — all 9 citations now name the exact line where their test is declared.

Unrelated smell noticed: the architecture spec has many other spec links that are close to the boundary of their test spans due to line-number drift — they pass today only by coincidence (a spec link for one test happens to fall inside an adjacent test's span). These are not a CI failure now but may cause silent mislinkage.

0 regressions introduced; 0 new tests written (this was a repair-only round against existing CI failures).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all four CI failure kinds from the previous push (typecheck, eslint, test, spec-names)","tdd_next":"acceptance green"}}