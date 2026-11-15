Done! I've fixed all three CI failures from the previous round:

1. **Replaced non-repeatable test**: Changed `new Date().toISOString()` to a fixed timestamp `'2025-02-15T12:00:00Z'`
2. **Fixed spec link line numbers**: Updated the spec file to point to the correct lines (L52→L53, L63→L64)
3. **Fixed spec-names check**: Verified all spec citations now correctly match their test lines

The changes have been committed and pushed. ESLint and spec-names checks now pass locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures","tdd_next":"acceptance green"}}