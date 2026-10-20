## CI reported failures on 48d6c74a6b0f7da5b8a9c423833b2caa7b443705

The build for your last push is red. These checks failed: eslint

Where a failed step is named below, run only that step's command; otherwise map each name to the job that publishes it and run only that job's command.

```
### eslint (failure)

> @re-cinq/hal-engine@0.3.0 eslint
> eslint --max-warnings 0 .


src/orchestration/onErrorNonError.acceptance.test.ts
  12:48  error  new Date() makes this test non-repeatable; inject the value or use fake timers  re-lint/no-nondeterministic-tests

✖ 1 problem (1 error, 0 warnings)
```

## The previous round reported

- Done: Coerce caught non-Error rejections to Error with cause preserved for hooks.onError, confirm existing Error-instance tests stay green unedited, and document the change in spec and CHANGELOG.md
- Next: acceptance green
