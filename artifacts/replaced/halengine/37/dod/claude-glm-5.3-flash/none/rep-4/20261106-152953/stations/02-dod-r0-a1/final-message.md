The deliverable for this ticket is already on the branch, pushed, and I have now verified every piece of it in this container rather than taking the commit message's word for it.

## What I found

This branch (`loop-bench/37`) already carries the DoD round for #37 — commit `feefe60` "test(tools): pin input validation against the declared schema" — with the working tree clean and the branch matching `origin/loop-bench/37`. Rather than re-doing it, I verified it against the ticket:

**Strategy: `direct`** (recorded in `.lore/dod.md`, quoting the ticket's central claim verbatim) — `ToolRegistry.register`/`execute` and `createChatOrchestrator(...).processMessage` are real, callable seams, so every behavioural criterion is testable today and fails only because the behaviour is absent.

**The tests exist in their own new files** and run red for the ticket's stated reason:

- `src/orchestration/tools/registry.acceptance.test.ts` — 8 tests
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — 1 tool-loop test

`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts` → **Tests: 7 failed, 2 passed, 9 total**. The 7 reds are exactly the absent behaviour the ticket reports; the 2 greens are the pins the ticket itself demands (extra property passed through unmodified `toEqual` "exactly once"; `Unknown tool:` throw "unchanged, pinned by a test").

Headline failure — the executor answers a malformed call instead of the registry rejecting it:

```
● ToolRegistry input validation › rejects a call the schema rejects before the executor runs, naming the missing property
    -   "outcome": StringMatching /required[\s\S]*location|location[\s\S]*required/,
    -   "ran": 0,
    +   "outcome": "18 degrees, cloudy",
    +   "ran": 1,
```

And the loop test — the malformed `{}` call executes and nothing is fed back to the model:

```
● ChatOrchestrator schema-rejected tool call › returns a schema rejection to the model as a tool result and lets a corrected retry finish the turn
      "executorInputs": Array [
    +     Object {},
          Object { "location": "Berlin" },
        ],
    -   "rejectionFedBack": true,
```

That is the ticket's "Why" reproduced verbatim: a call for a required `location` string answered with a confident forecast instead of telling the model it got the call wrong.

**Traceability is in place**: `specs/hal-engine-tool-input-validation/spec.md` states nine testable statements, each carrying its `([validated by ...])` link to the test line; all three spec gates pass (`check-spec-anchor-names`: 403 citations name their tests; `check-spec-links`: 0 misplaced; `check-spec-status`: 0 findings). Files are prettier-clean.

**Still owed** (tracked in `.lore/dod.md` Facets, for the implementation rounds): `ajv` into `dependencies`, the validation in `ToolRegistry.execute` with static compile-at-register / per-call resolution for function sources, the one-line doc comment pointing at the spec, the `docs/adding-a-tool.md` / `README.md` / `.specify/spec.md` / `CHANGELOG.md` edits, and the MINOR bump — CI's build, Test and lint jobs judge the non-behavioural parts this pod cannot run.

Two observations, neither a subject for these tests: the ticket's criterion names the file `registry.test.ts` while the pod contract mandates the `.acceptance.test.ts` suffix — the file lives at `src/orchestration/tools/registry.acceptance.test.ts`, so a reader following the ticket text alone would look one name over; and the new spec's `Status` row reads `Shipped`, which is the repo's own convention for full test-citation coverage (per CLAUDE.md the row tracks citation coverage, not feature completion, and `check-spec-status` passes) — but a human skimming the specs table should not read it as "implemented".

No production code was written or changed; nothing needed committing — the branch already carries and pushes the red bar I verified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}