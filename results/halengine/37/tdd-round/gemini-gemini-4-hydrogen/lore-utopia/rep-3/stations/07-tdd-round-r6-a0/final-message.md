Fixed the CI test failure on `ac7e7ca` (1 red test in `src/orchestration/tools/registry.test.ts` written in the prior round, 0 regressions):

- `src/orchestration/tools/registry.ts`: Updated `formatTypeError` to normalize `params.type` via `String(expected).split(',').join(' | ')`, handling both `ajv@6` comma-separated union strings (`"string,number"`) and `ajv@8` arrays.
- `src/orchestration/tools/registry.test.ts`: Updated the `minLengthFallback` assertion to match both `ajv@8` (`must NOT have fewer than 3 characters`) and `ajv@6` (`should NOT be shorter than 3 characters`).
- `specs/hal-engine-tool-input-validation/spec.md` & `.lore/dod.md`: Updated the shifted line anchor (`#L294`) and ticked the new compatibility facet.
- Verified with `prettier --write`, `repoint-spec-anchors.mjs --check origin/main`, `check-spec-anchor-names.mjs`, `check-spec-links.mjs`, and `src/orchestration/tools/registry.test.ts` (8/8 passing), then committed (`4b2010c`) and pushed to `origin/loop-bench/37` (already up to date with `origin/main`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle ajv@6 comma-separated union params.type in formatTypeError and accept both ajv@6 and ajv@8 minLength fallback wording in registry.test.ts","tdd_next":"acceptance green"}}