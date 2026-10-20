## CI reported failures on c3cd08a9719fc2b94390d5b6e91bcbe417f649a3

The build for your last push is red. These checks failed: typecheck, eslint

Where a failed step is named below, run only that step's command; otherwise map each name to the job that publishes it and run only that job's command.

```
### typecheck (failure)

> @re-cinq/hal-engine@0.3.0 typecheck
> tsc --noEmit

src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts(30,3): error TS2353: Object literal may only specify known properties, and 'baseSystemPrompt' does not exist in type 'PromptBuilderConfig'.

### eslint (failure)

> @re-cinq/hal-engine@0.3.0 eslint
> eslint --max-warnings 0 .


src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts
  40:3  error  Test has 3 expect calls (max 1); assert one object with toEqual/toMatchObject or split the test  re-lint/max-expects

✖ 1 problem (1 error, 0 warnings)
```

## The previous round reported

- Done: Move beforeSession inside the try block in chatOrchestrator.ts, update specs/hal-engine-config-hooks/spec.md, and document in CHANGELOG.md
- Next: acceptance green
