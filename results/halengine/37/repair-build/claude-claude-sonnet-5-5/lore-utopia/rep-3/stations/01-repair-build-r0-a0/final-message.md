I fixed all four findings and pushed the branch. I haven't run any of it, because the installed `ajv` in this pod is 6.15 while `package.json` asks for ^8.20. The branch merges cleanly with `origin/main` and isn't ahead of its upstream. CI has to judge the push.

- **typecheck and test (`ajv` import):** `import {Ajv} from 'ajv'` fails because 8.x doesn't export `Ajv` by name. That caused both the TS2693 error and the `does not provide an export named 'Ajv'` failures in every suite that loads the registry. I switched `registry.ts` to the default import and cast it to the constructor type. That cast is the part CI's typecheck needs to confirm.
- **`preserve-caught-error` (`registry.ts:106`):** the rethrown error now carries `{cause: error}`.
- **`prefer-early-return` and `max-member-chain` (`registry.acceptance.test.ts`):** I flipped the `round === 2` branch into a guard on `round !== 2` that returns early, so the happy path runs flat. I also destructure `lastMessage.content` before reading `.content`, which removes the three-hop chain.

I formatted the two changed files with prettier. I didn't run eslint or tsc, as instructed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv default import (no named Ajv export in 8.x), added error cause, and fixed two lint findings in registry.acceptance.test.ts; not run locally, CI to judge"}}