Added and pushed commit `80bcfdf`.

- New acceptance tests: `src/transport/ws/conversationList.acceptance.test.ts`
- Added `.lore/dod.md`
- Added protocol statements and traceability citations.
- Strategy: `direct`
- Branch is up to date with upstream.

Ran only:

```text
npm test -- --runInBand src/transport/ws/conversationList.acceptance.test.ts
```

All 3 tests fail for the missing feature, including:

```text
Expected: "conversation_list"
Received: "error"
```

and:

```text
Expected code: "UNSUPPORTED"
Received code: "INVALID_MESSAGE"
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}