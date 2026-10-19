## CI reported failures on 19eaa4dfdc1d7fee67a77a045b3b6ffe47e754bd

The build for your last push is red. These checks failed: eslint

Where a failed step is named below, run only that step's command; otherwise map each name to the job that publishes it and run only that job's command.

```
### eslint (failure)

> @re-cinq/hal-engine@0.3.0 eslint
> eslint --max-warnings 0 .


src/orchestration/orchestratorHelpers.test.ts
  29:3  error  Test sums token fields when both operands are defined has no spec link — add an inline ([validated by](src/orchestration/orchestratorHelpers.test.ts#L29)) to the statement it validates in a specs/**/*.md or adrs/**/*.md markdown file (or, if this test isn't tied to a spec statement, it may not belong in the traceable suite)        re-lint/require-spec-link
  35:3  error  Test returns the defined side when one operand is undefined has no spec link — add an inline ([validated by](src/orchestration/orchestratorHelpers.test.ts#L35)) to the statement it validates in a specs/**/*.md or adrs/**/*.md markdown file (or, if this test isn't tied to a spec statement, it may not belong in the traceable suite)  re-lint/require-spec-link
  35:3  error  Test has 2 expect calls (max 1); assert one object with toEqual/toMatchObject or split the test                                                                                                                                                                                                                                              re-lint/max-expects
  41:3  error  Test returns undefined when both operands are undefined has no spec link — add an inline ([validated by](src/orchestration/orchestratorHelpers.test.ts#L41)) to the statement it validates in a specs/**/*.md or adrs/**/*.md markdown file (or, if this test isn't tied to a spec statement, it may not belong in the traceable suite)      re-lint/require-spec-link

✖ 4 problems (4 errors, 0 warnings)
```

## The previous round reported

- Done: Accumulate usage across every provider call (all three DoD facets)
- Next: acceptance green
