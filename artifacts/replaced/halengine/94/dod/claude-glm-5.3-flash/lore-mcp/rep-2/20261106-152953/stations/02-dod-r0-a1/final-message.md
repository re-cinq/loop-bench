Everything is verified. The branch already carries this pod's deliverable (commit `8794f20`, pushed), and I have now independently confirmed the red bar rather than trusting it.

**What is on the branch** (`loop-bench/94`, clean, up to date with `origin/loop-bench/94`, based on `origin/main` tip `dd5308e` — no merge owed):

- `src/orchestration/beforeSessionThrow.acceptance.test.ts` — two acceptance tests through the real entry point `createChatOrchestrator(...).processMessage(...)`, no mocks (a hand-written provider and the real `PromptBuilder`, the repo's own idiom in `chatOrchestrator.test.ts`)
- `specs/hal-engine-config-hooks/spec.md` — the recorded-flaw bullet deleted, a new "Error path of the lifecycle" section stating the guarantee and the "turn never started" answer the ticket asked to be recorded, citing both tests; `check-spec-links` / `check-spec-anchor-names` / `check-spec-status` all report 0 findings, and the `#L37`/`#L66` anchors match the `it(` lines
- `.lore/dod.md` — strategy `direct`, quoting the ticket's central claim verbatim

**Triage: `direct`** — the seam already exists (`ChatOrchestratorOptions.hooks`); the tests call the real orchestrator today and fail on the missing behaviour.

**Red bar, reproduced now.** Ran `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/beforeSessionThrow.acceptance.test.ts` (CI's `npm test` is the same command over the whole suite). Both fail for the ticket's stated reason — `onError`/`afterSession` never fire while the rejection still reaches the caller (`outcome: "before session failed"` is present in both receiveds, proving the throw still propagates):

```
● beforeSession throwing › fires onError with the session and the thrown error, and still rejects
    - Expected  - 2
    + Received  + 2
    -   "onErrorGotErrorMessage": "before session failed",
    -   "onErrorGotSameSession": true,
    +   "onErrorGotErrorMessage": undefined,
    +   "onErrorGotSameSession": false,
      "outcome": "before session failed",
● beforeSession throwing › runs onError then afterSession on a session that never reached the provider
    "callOrder": Array [
      "beforeSession",
    -   "onError",
    -   "afterSession",
    ],
Test Suites: 1 failed, 1 total   Tests: 2 failed, 2 total
```

The production defect stands at `src/orchestration/chatOrchestrator.ts:91` — `beforeSession` is still awaited above the `try`. The formatter over the one file in CI's prettier scope (the test file) passes `--check`; the remaining facets (move the call inside the `try`, CHANGELOG entry, existing hook tests staying green) are listed in `.lore/dod.md` for the implementation round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}