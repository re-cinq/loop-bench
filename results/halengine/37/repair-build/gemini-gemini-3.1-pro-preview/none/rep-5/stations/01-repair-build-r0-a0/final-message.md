I've fixed all the reported CI failures.

*   **Typecheck & Test (`SyntaxError: The requested module 'ajv' does not provide an export named 'Ajv'`):** I've updated the `ajv` import in `src/orchestration/tools/registry.ts` from `import {Ajv} from 'ajv'` to a default import `import Ajv from 'ajv'`. This correctly pulls in the constructor as a value, solving both the TypeScript compilation error and the runtime ESM linkage error.
*   **ESLint (`preserve-caught-error`):** Attached `cause: error` to the thrown `Error` inside `compileSchema` in `src/orchestration/tools/registry.ts`.
*   **ESLint (`prefer-early-return` & `max-member-chain`):** In `src/orchestration/tools/registry.acceptance.test.ts`, I inverted the `round === 2` check to return early for other rounds, letting the happy path flow flat. I also separated the member access (`lastMessage.content[0]?.content`) into distinct statements to respect the maximum member chain length.

Formatted, committed, pushed to `origin HEAD` and ensured the branch is up to date with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed ajv import to use default export and fixed eslint warnings"}}