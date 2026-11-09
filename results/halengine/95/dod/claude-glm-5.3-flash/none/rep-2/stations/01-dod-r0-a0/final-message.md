Branch pushed, main merged (no-op, already up to date), and `git status` shows the branch is even with its upstream.

## What I did

**Triage: `direct`** — the seam already exists. `createChatOrchestrator` is the real entry point and a provider that rejects with an arbitrary value is plain test setup (the same inline-provider pattern the existing suite hand-rolls), so the acceptance test calls the orchestrator and fails on behaviour.

**New file: `src/orchestration/chatOrchestrator.acceptance.test.ts`** — two tests:

1. **Red** — `calls onError with an Error whose cause is the rejection, for a string, an object and undefined`: loops over a string, a plain object and `undefined`, asserting `onError` fires exactly once with an `Error` whose `cause` is that value, while the caller receives the original rejection unchanged.
2. **Green guard** — `passes a rejection that is already an Error to onError as the same instance`. This one cannot be red today: the Error path is already correct, which is precisely the asymmetry the ticket fixes. I verified by grep that no existing test pins instance identity (they pin message and propagation only), and the ticket's criterion 3 says "as the same instance, not a wrapper" — so the property is pinned here rather than nowhere. It is flagged as such in `.lore/dod.md`.

**Spec** (`specs/hal-engine-config-hooks/spec.md`): the "Measured semantics — out of scope" section is replaced by the new guarantee, citing both tests. This edit could not wait for the implementation round — `re-lint/require-spec-link` (error level, `**/*.test.ts`) fails the build on any uncited new test file, so the statement must exist on this commit.

**Spec checks I ran** (cheap node scripts, not eslint/tsc): `check-spec-anchor-names` (11 citations name their tests), `check-spec-links` (0 misplaced), `repoint-spec-anchors --check origin/main` (0 stale; my spec is taken as authored against the working tree, the documented branch-edits-a-spec case), `check-spec-status` (0 findings). `prettier --check` passes on the test file. Existing `chatOrchestrator.test.ts` passes unedited (26 tests) — I ran it before my edits; nothing I changed touches it.

## Quoted failure output

```
● ChatOrchestrator onError › calls onError with an Error whose cause is the rejection, for a string, an object and undefined
  - Expected  - 3
  + Received  + 3
    "callerReceivedIsTheRejection": true,
  -   "causeIsTheRejection": true,
  -   "deliveredIsError": true,
  -   "onErrorCalls": 1,
  +   "causeIsTheRejection": undefined,
  +   "deliveredIsError": false,
  +   "onErrorCalls": 0,
```

`onErrorCalls: 0` while `callerReceivedIsTheRejection: true` — the failure is the ticket's claim verbatim: onError bypassed entirely while the rejection still propagates.

Not run here (CI's job, per pod limits): `eslint`, `tsc --noEmit`, the full suite. CI's `Verify` job runs them on the push, plus its "Changelog entry" step, which will hold the PR open until the implementation round adds the owed `## [Unreleased]` entry (listed as an owed facet in `.lore/dod.md`).

Committed as `b498881` and pushed to `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}