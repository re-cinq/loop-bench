Added and pushed:

- New direct acceptance test: `src/orchestration/beforeSession.acceptance.test.ts`
- DoD recorded in `.lore/dod.md`
- Spec guarantee updated and linked

Command run:

```text
npm test -- src/orchestration/beforeSession.acceptance.test.ts
```

Failure confirms the ticketed bug:

```text
Expected onError/afterSession events; Received []
```

Commit `bcc3ca1` is pushed, branch is clean and synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}