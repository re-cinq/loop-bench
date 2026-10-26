Perfect! I've completed this round of the TDD loop. Here's what I did:

## Summary

**Fixed acceptance test compilation errors:**
- Changed `baseSystemPrompt` to `identity` in the PromptBuilder configuration
- Removed invalid properties (`systemPromptSuffix`, `contextConfig`)
- Split the single test with 3 expect calls into three separate tests to satisfy linting rules

**Updated specs/hal-engine-config-hooks/spec.md:**
- Created a new "beforeSession error handling" section documenting the guarantee
- Moved beforeSession behavior from "measured semantics/out of scope" to a proper specification
- Documented that: errors reach the caller, onError fires with the error, and afterSession fires for cleanup
- Added spec links to all three acceptance tests and related tests

**Marked facet complete:**
- Updated `.lore/dod.md` to check off "Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"

The next facet is to document this change in the CHANGELOG.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession","tdd_next":"Document in the CHANGELOG what changes for an existing consumer"}}