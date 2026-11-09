All checks pass. The deliverable for this ticket is on the branch and pushed; here is the state and what I verified.

## What's on the branch

A single commit `4606815` — `test(orchestrator): red acceptance tests for non-Error onError` — sitting directly on `origin/main` (`684b294`), already pushed. It was committed by an earlier pass at this ticket; my work this session was to verify that deliverable end to end rather than take it on faith or duplicate it. Three files, no production code:

- **`src/orchestration/chatOrchestrator.acceptance.test.ts`** (new) — four tests driving the real entry point `createChatOrchestrator(...).processMessage(...)` with a real `AIProvider` whose `sendMessage` throws a string, a plain object, `undefined`, and an `Error`. No mocks, no source-text assertions.
- **`specs/hal-engine-config-hooks/spec.md`** — the recorded-flaw section ("owned by no issue in this epic") deleted, replaced by the new guarantee with `([validated by ...])` links. `Status` untouched. `scripts/spec-links/reanchor.mjs` doesn't exist here, so I re-anchored by hand: all four `#Lnn` links (L61, L88, L111, L127) land exactly on their `it(` lines.
- **`.lore/dod.md`** — claim quoted verbatim, strategy recorded, facets for the implementation round (drop the gate, wrap non-Errors with `cause`, CHANGELOG entry, existing suite stays green).

## Red bar — run, not assumed

`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts` → **`Tests: 3 failed, 1 passed, 4 total`**. Every failure diffs the same way, and it is the ticket's claim word for word — hook bypassed while the rejection still propagates:

```
-   "cause": "socket reset mid-stream",
-   "isError": true,
-   "onErrorCalls": 1,
+   "cause": "onError was never called",
+   "isError": false,
+   "onErrorCalls": 0,
    "rejected": true,
    "callerReason": "socket reset mid-stream",
```

The fourth test (Error rejection reaches `onError` as the same instance) passes today by design — it pins criterion 3's preservation invariant, which no existing test holds (`chatOrchestrator.test.ts:126` captures only `error.message`, which a wrapper could copy).

Also verified: the `catch` in `chatOrchestrator.ts:150` still carries the `instanceof Error` gate (nothing implemented ahead of the red bar), the existing `chatOrchestrator.test.ts` is unedited, prettier passes on all three changed files, and `git status -sb` after `git fetch origin` shows `loop-bench/95...origin/loop-bench/95` with no ahead/behind — the branch is pushed and up to date with its base.

What remains is the implementation round's work, listed as facets in `.lore/dod.md`: drop the gate, wrap non-`Error` rejections in an `Error` carrying the original as `cause`, leave the re-throw untouched, add the CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}