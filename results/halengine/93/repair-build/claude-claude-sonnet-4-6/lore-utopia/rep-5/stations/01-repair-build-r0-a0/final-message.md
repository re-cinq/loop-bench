Branch is pushed and up to date. The fixes applied:

1. **Split 2-expect test** (`re-lint/max-expects`): `'returns the defined side when one operand is undefined'` at line 35 was split into two single-expect tests — `'returns the second operand when the first is undefined'` (line 35) and `'returns the first operand when the second is undefined'` (line 40).

2. **Added spec citations** (`re-lint/require-spec-link`): Added a `## Usage accumulation helper` section to `specs/hal-engine-config-hooks/spec.md` with four bullet-point statements, each citing the corresponding `accumulateUsage` test at its exact line number (L29, L35, L40, L45).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"split 2-expect accumulateUsage test into two and added spec-link citations for all three accumulateUsage tests (re-lint/max-expects and re-lint/require-spec-link)"}}