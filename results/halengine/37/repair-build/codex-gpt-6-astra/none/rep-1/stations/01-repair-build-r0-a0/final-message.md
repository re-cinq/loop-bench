Pushed `e3ffe09`: fixed the Ajv import and all reported lint findings. Formatted both files; branch is clean and current with `origin/main`.

Registry test passes. Acceptance suite loads but has three failures: `execute` doesn’t invoke validation. No lint, typecheck, or build run.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Scoped registry test passed; scoped registry.acceptance.test.ts has three failures because execute does not validate input"}}