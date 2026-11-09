Changed the registry to load Ajv through its default export and use its v8 validator types. The new focused test reproduced the module-loading failure, then passed after the fix.

Committed and pushed `e00c9b3`; the branch is up to date with `origin/main` and its upstream. CI will verify the typecheck and acceptance tests. The previous CI run reported zero individual red tests written in this round and named `config.test.ts` as a regression; the other named suites belong to this ticket.

Remaining work: the unchecked unit-test, spec-link, and documentation facet. No unrelated issues were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv default module loading and v8 validator types","tdd_next":"Remaining unit tests, spec links, and documentation"}}