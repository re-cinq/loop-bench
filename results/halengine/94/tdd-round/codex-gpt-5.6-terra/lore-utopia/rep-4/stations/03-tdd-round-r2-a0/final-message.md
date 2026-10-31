Repaired both CI traceability findings and pushed `5522549`:

- Named the existing unit test and acceptance test in the spec’s validation links.
- Formatted the changed spec file.
- No tests were run locally: this was a metadata-only CI repair, and acceptance tests are CI-only.
- Prior CI reported 0 red behavioral tests and 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI traceability links for beforeSession hook behavior","tdd_next":"acceptance green"}}