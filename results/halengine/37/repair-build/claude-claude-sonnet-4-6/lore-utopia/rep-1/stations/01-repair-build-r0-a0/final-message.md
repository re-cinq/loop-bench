Branch pushed and up to date. Here's a summary of what was fixed:

1. **typecheck + test (`SyntaxError`)**: `import {Ajv} from 'ajv'` → `import Ajv from 'ajv'` — AJV v6 uses a default export, not a named export.

2. **Missing input validation in `execute`**: Added pre-call schema validation — static tools use the validator compiled at `register` time; function-valued tools use a per-call WeakMap cache keyed by schema object. Invalid input returns a `ToolResponse` naming the failing fields (using AJV v6's `dataPath`) without leaking the offending value.

3. **eslint `preserve-caught-error`**: Added `{cause: error}` to the `compileSchema` throw.

4. **eslint `prefer-early-return` + `max-member-chain`**: Flipped the `if (round === 2)` guard to `if (round !== 2)` with early return, and split `lastMessage.content[0]?.content` into two lines via an intermediate `firstContent` variable.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv default import, missing execute-time input validation, preserve-caught-error cause, prefer-early-return and max-member-chain lint violations"}}