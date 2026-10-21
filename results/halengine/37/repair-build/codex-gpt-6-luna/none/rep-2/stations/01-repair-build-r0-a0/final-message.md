Fixed the Ajv import, added schema validation with safe field-path diagnostics, and resolved both reported lint issues. The targeted registry suites pass: 2 suites, 5 tests. I did not run typecheck or lint, per the pod instructions.

Committed and pushed as `ba58451`; `origin/main` was already up to date, and the branch matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv was imported with the wrong export, and schema validation diagnostics and acceptance-test structure triggered the reported failures"}}