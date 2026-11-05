I fixed the four eslint errors from CI. I didn't run the linter, as instructed, so the next CI run is the real check. The branch hadn't moved since CI judged it, and the push landed: it's not ahead of its upstream.

- **Spec links:** the three `accumulateUsage` tests had no spec link. I added a statement to `specs/hal-engine-config-hooks/spec.md`, right after the existing usage lines, that links all four resulting tests to the field-by-field combining rule.
- **Two expects:** I split the "returns the defined side" test in `src/orchestration/orchestratorHelpers.test.ts` into two tests, one per operand order. Each test has one `expect`, and the assertions are unchanged.

I ran prettier over the test file before committing. The merge of `origin/main` produced nothing that needed a second push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"accumulateUsage tests lacked spec links and one had 2 expects; added spec statement with validated-by links and split the test"}}