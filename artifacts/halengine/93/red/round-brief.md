## CI reported failures on 315f21807e2c8944eea2aacf1dd82c2f51921397

The build for your last push is red. These checks failed: eslint

Where a failed step is named below, run only that step's command; otherwise map each name to the job that publishes it and run only that job's command.

```
### eslint (failure)

> @re-cinq/hal-engine@0.3.0 eslint
> eslint --max-warnings 0 .


specs/hal-engine-config-hooks/spec.md
  6:1  error  Status "shipped" does not match this spec's test-link coverage — 10 of 12 testable statements carry a ([validated by](test.ts#Lline)) link. Either set the status to "In Progress", or link the remaining statements to the tests that validate them  re-lint/require-status-matches-coverage

src/orchestration/afterModelResponse-usage.acceptance.test.ts
  29:5    error  13 lines (80 tokens) duplicated with src/orchestration/chatOrchestrator.test.ts:392-406                         re-lint/no-duplicate-code
  43:99   error  11 lines (76 tokens) duplicated with src/orchestration/afterModelResponse-usage.acceptance.test.ts:70-80        re-lint/no-duplicate-code
  44:24   error  Unexpected any. Specify a different type                                                                        @typescript-eslint/no-explicit-any
  53:118  error  12 lines (81 tokens) duplicated with src/orchestration/afterModelResponse-usage.acceptance.test.ts:80-91        re-lint/no-duplicate-code
  64:24   error  Comment spans 3 lines (max 1) — state the one constraint the code cannot show, or move the essay to a spec/ADR  re-lint/max-comment-lines
  70:96   error  11 lines (76 tokens) duplicated with src/orchestration/afterModelResponse-usage.acceptance.test.ts:43-53        re-lint/no-duplicate-code
  71:24   error  Unexpected any. Specify a different type                                                                        @typescript-eslint/no-explicit-any
  80:32   error  12 lines (81 tokens) duplicated with src/orchestration/afterModelResponse-usage.acceptance.test.ts:53-64        re-lint/no-duplicate-code
  98:24   error  Unexpected any. Specify a different type                                                                        @typescript-eslint/no-explicit-any

src/orchestration/chatOrchestrator.test.ts
  392:2  error  13 lines (80 tokens) duplicated with src/orchestration/afterModelResponse-usage.acceptance.test.ts:29-41  re-lint/no-duplicate-code

✖ 11 problems (11 errors, 0 warnings)
```

## The previous round reported

- Done: accumulate usage across rounds via addUsage helper
- Next: add type-level disambiguation so the hook signature conveys sum semantics (facet 1), or acceptance green if CI passes
