Everything is verified and landed. Summary of the state and what I confirmed this session:

**Triage: `direct`** — the seam already exists (`createChatOrchestrator(...).processMessage` is the caller path; the `instanceof Error` gate sits at `src/orchestration/chatOrchestrator.ts:150`), so the acceptance test drives the real orchestrator with a real `AIProvider` generator that throws — no doubles.

**The deliverable** is one acceptance test in its own file, `src/orchestration/chatOrchestrator.acceptance.test.ts`, covering all three acceptance-criteria rows (string, plain object, `undefined`, plus the already-an-`Error` row as the same instance) in a single table-driven turn. `.lore/dod.md` quotes the ticket's central claim verbatim, records the strategy, and leaves the implementation facets (the `catch` edit, the caller-boundary identity, the CHANGELOG entry, the existing suite staying unedited and green) unticked for the next round. The spec's recorded-flaw bullet is now the guarantee under "Error reporting to hooks", citing the test; the repo has no `scripts/spec-links/reanchor.mjs`, so I re-verified the link by hand (`#L43` is the `it` line, link text matches the test title, `node scripts/check-spec-links.mjs specs/hal-engine-config-hooks/spec.md` → `misplaced: 0`, exit 0).

**Red bar, quoted from the run** (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`):

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● onError for a rejection that is not an Error › calls onError for every rejection, wrapping a non-Error as the cause, and still rejects the caller with the original value

        "object": Object {
          "callerGotTheOriginalRejection": true,
    -     "causeIsTheOriginalRejection": true,
    -     "onErrorCallCount": 1,
    -     "onErrorSawAnError": true,
    +     "causeIsTheOriginalRejection": false,
    +     "onErrorCallCount": 0,
    +     "onErrorSawAnError": false,
        },
```

`onErrorCallCount: 0` with `callerGotTheOriginalRejection: true` is the claim verbatim — the hook is bypassed while the rejection still propagates. The `error` row's assertions are all green, so the fix must not disturb the already-an-`Error` path.

**Delivery**: I found one deviation from the formatter rule on re-inspection — `.lore/dod.md` was not prettier-clean (outside CI's `prettier:check` glob, but it is a file this pod wrote) — fixed it and committed `chore(orchestrator): prettier the dod file`. Both commits are pushed; `git status -sb` reports `loop-bench/95...origin/loop-bench/95` in sync, and `origin/main...HEAD` is `0 2` — the branch sits on main's current tip (`684b294`) and merges cleanly, so CI will run. No lint, typecheck or build was run here; those are CI's to judge.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}