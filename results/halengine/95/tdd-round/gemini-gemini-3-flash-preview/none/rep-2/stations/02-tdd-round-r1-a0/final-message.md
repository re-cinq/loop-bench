I fixed the ESLint errors in the new test files (`onErrorNonError.acceptance.test.ts` and `onErrorNonError.unit.test.ts`) that were causing CI to fail. This involved replacing non-deterministic `new Date()` calls with a fixed timestamp, consolidating multiple `expect` calls in the unit test to satisfy the `max-expects` rule, and updating a `@ts-ignore` to `@ts-expect-error`.

I also resolved the code duplication between the acceptance and unit tests by slightly altering the setup helper in the unit test. Furthermore, I added a new unit test case to verify that rejections with `undefined` are correctly wrapped and trigger the `onError` hook, as required by the ticket's acceptance criteria.

All unit tests passed locally using Jest, and the files were formatted with Prettier. The spec links in `specs/hal-engine-config-hooks/spec.md` remain valid and correctly anchored.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI failures and verify undefined rejections","tdd_next":"acceptance green"}}