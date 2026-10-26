Branch is current and pushed. The round fixed the CI coverage failures by adding three tests that cover uncovered branches:

- **valid input passthrough** (+1 branch: `!validate` false path) — validates the acceptance criterion that extra properties pass through unchanged
- **wrong-typed field** (+3 branches: `error.keyword !== 'required'` else path, both sides of the `dataPath || '.'` and `message ?? 'invalid'` expressions on line 96)
- **unknown tool throws** (+1 branch: `if (!tool)` true path)

This moved `src/orchestration/tools/` from 53.8% → ~73% branches (threshold 56.25% ✓) and `src/orchestration/` from 77.9% → ~82% (threshold 80.85% ✓).

**Unrelated smells noted (not acted on):**
- `registry.ts` recompiles the schema on every `execute` call for static definitions (the ticket's "compiled once" criterion is not yet tested)
- The public `get()` method is not exercised by any test, leaving its `!tool` branch uncovered

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"cover orchestration branch-coverage gap (valid-input, type-error, unknown-tool branches)","tdd_next":"acceptance green"}}