All three CI failures are fixed:

1. **typecheck**: Changed `import {Ajv} from 'ajv'` to `import Ajv from 'ajv'` — ajv is a CJS module; its ESM-compatible form exposes the constructor only as the default export, not as a named `Ajv` export.

2. **eslint `preserve-caught-error`**: Added `{cause: error}` to the `throw new Error(...)` in `compileSchema` so the original error is preserved on the thrown error.

3. **eslint `prefer-early-return` + `max-member-chain`**: Restructured the `round === 2` block in the acceptance test to guard the non-round-2 path early (flipping the condition), and split `lastMessage.content[0]?.content` into two separate assignments to stay within the 2-hop member chain limit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Changed ajv import to default, added error cause to compileSchema throw, restructured acceptance test for early-return and member-chain lint rules"}}