## CI reported failures on 5cd4e6710184e4c23ab8d932710998781bdd6208

The build for your last push is red. These checks failed: eslint, test

Where a failed step is named below, run only that step's command; otherwise map each name to the job that publishes it and run only that job's command.

```
### eslint (failure)

> @re-cinq/hal-engine@0.5.0 eslint
> eslint --max-warnings 0 .


src/transport/conversationList.acceptance.test.ts
  23:109  error  7 lines (58 tokens) duplicated with src/transport/sessionResume.test.ts:51-58                                                                      re-lint/no-duplicate-code
  33:105  error  10 lines (73 tokens) duplicated with src/transport/sessionResume.test.ts:63-73                                                                     re-lint/no-duplicate-code
  67:7    error  The happy path is wrapped in this if while 2 statement(s) dangle after it — flip to `if (!(…))` guarding the tail and let the happy path run flat  re-lint/prefer-early-return
  80:29   error  13 lines (86 tokens) duplicated with src/transport/sessionResume.test.ts:167-179                                                                   re-lint/no-duplicate-code

src/transport/sessionResume.test.ts
   51:28  error  7 lines (58 tokens) duplicated with src/transport/conversationList.acceptance.test.ts:23-29   re-lint/no-duplicate-code
   63:13  error  10 lines (73 tokens) duplicated with src/transport/conversationList.acceptance.test.ts:33-42  re-lint/no-duplicate-code
  167:15  error  13 lines (86 tokens) duplicated with src/transport/conversationList.acceptance.test.ts:80-92  re-lint/no-duplicate-code

src/transport/ws/validation.test.ts
  58:31  error  Boolean literal argument selects a behaviour; call a dedicated function instead  re-lint/no-flag-params

✖ 8 problems (8 errors, 0 warnings)

### test (failure)

[31m[1m^[22m[39m
     [90m 117 |[39m       seen[33m:[39m [{userId[33m:[39m [32m'u1'[39m[33m,[39m options[33m:[39m {limit[33m:[39m [35m10[39m[33m,[39m before}}][33m,[39m
     [90m 118 |[39m       frames[33m:[39m [
     [90m 119 |[39m         {[0m

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:116:28)

  ● listing conversations over the WebSocket protocol › answers an empty session_list when the store has no listFor, and SERVER_ERROR with a ws error log when listFor throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 23
    + Received  +  3

      Object {
    -   "failed": Array [
    -     Object {
    -       "code": "SERVER_ERROR",
    -       "type": "error",
    -     },
    -   ],
    -   "logged": Array [
    -     Object {
    -       "category": "ws",
    -       "fields": ObjectContaining {
    -         "error": "database
...(truncated)
```

## The previous round reported

- Done: Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to src/types/messages.ts and src/index.ts, and validate list_sessions frames in src/transport/ws/validation.ts
- Next: Thread sessionStore into createMessageHandler and handle list_sessions in src/transport/ws/messageHandler.ts
