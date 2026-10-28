Pushed `a5ec4a6`: dynamic schema caching and the CI-reported Ajv import repair.

One new test went red, then green after implementation and refactoring. Prior CI reported three ticket test suites failing and one regression suite (`config.test.ts`), all blocked by the import. CI will verify the repair.

Formatted changed files; branch is current with main and fully pushed. Next: remaining unit coverage and documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache dynamic validators by schema object reference and repair Ajv import","tdd_next":"Remaining unit coverage, spec links, and documentation"}}