The work is committed and pushed; the branch is in sync with its upstream and merges cleanly into `origin/main` (no drift — base is main's HEAD).

## Summary

**Ticket:** re-cinq/HALEngine#94 — Run `onError` and `afterSession` when `beforeSession` throws.

**Triage: `direct`.** The seam already exists: `createChatOrchestrator(...).processMessage(session)` is the real entry point, and installing hook functions through `options.hooks` observes the failure path directly. The test calls it today and fails on the missing behaviour.

**Acceptance test** (new file, `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts:20`): installs a throwing `beforeSession` plus recording `onError`/`afterSession`, drives a real provider through `processMessage`, and asserts in one observation: the caller's rejection message is unchanged, `callOrder` is `['beforeSession', 'onError', 'afterSession']`, `onError` received the session and the thrown error, and the provider was never reached. The spec's new guarantee (§ "A failed beforeSession", replacing the recorded-flaw bullet from #83, with the decided answer that `afterSession` cannot distinguish "never started" from "failed mid-turn") cites it, and the CHANGELOG `### Fixed` entry is drafted.

**Red bar — command run:** `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` (CI runs it in the **Verify** job, "Test (with coverage floor)" step). Actual failure:

```
● ChatOrchestrator beforeSession failure › runs onError and afterSession when beforeSession throws, and still rejects the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 2

      Object {
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorErrorMessage": "session setup failed",
    -   "onErrorSessionId": "hooked-session",
    +   "onErrorErrorMessage": undefined,
    +   "onErrorSessionId": undefined,
        "outcome": "session setup failed",
        "providerReached": false,
      }
```

Red for exactly the ticket's stated claim: the rejection already reaches the caller (`outcome` matches today) and the provider is never reached, but `onError` never fires and `afterSession` never runs — the `catch`/`finally` the throw escapes.

**For the implementing pod** (`.lore/dod.md`): move the `beforeSession` await inside the `try` — the whole production change — keeping `chatOrchestrator.test.ts` and `config.test.ts` green and unedited; the spec replacement and CHANGELOG draft are already in this commit.

**Findings (not tested, out of scope):** once the fix lands, the `finally` also runs `commitStreamingEntries` + `saveSession` on this path, so a failed `beforeSession` now persists the session — consistent with "same as any other failure", worth a line in the PR description. The two remaining `chatOrchestrator.ts#Lnn` source anchors in "Measured semantics" may shift by a line and are repaired with `node scripts/repoint-spec-anchors.mjs`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}