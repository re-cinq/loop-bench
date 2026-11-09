Pushed commit `557453d` and confirmed the branch is up to date with its upstream and `origin/main`.

The changes fix Ajv loading, apply schema validation before execution, and address the reported lint findings. `npm test -- --runInBand` still has one failing acceptance test locally: the installed Ajv is 6.15.0, while the branch declares Ajv 8, and their error-path fields differ. CI must verify the fix with the declared dependency.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"npm test -- --runInBand: one test remains red with locally installed Ajv 6 instead of declared Ajv 8; pushed for CI verification"}}