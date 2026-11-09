Landed. `git status -sb` shows `## loop-bench/95...origin/loop-bench/95` with no ahead/behind marker — the commit is pushed and the branch is up to date with both its upstream and `origin/main`.

## What was red

CI judged `48d6c74` and named exactly one finding:

```
src/orchestration/onErrorNonError.acceptance.test.ts
  12:48  error  new Date() makes this test non-repeatable; inject the value or use fake timers  re-lint/no-nondeterministic-tests
```

## The fix

Line 12 was the `sessionWith` helper calling `new Date().toISOString()` for the entry timestamp — a value no test asserts on. I replaced it with an injected constant, `const SENT_AT = '2026-01-01T00:00:00.000Z'`, matching the idiom the sibling `chatOrchestrator.test.ts:13` and `sessionSave.test.ts:14` already use for exactly this. The file now contains no `new Date()` call anywhere, so the rule can no longer fire on it. Per the pod constraints I did not run eslint locally; `npx prettier --write` on the changed file reported it unchanged, so formatting is clean.

## Everything else was already green

I verified the previous round's work rather than redoing it: the `instanceof Error` gate at `chatOrchestrator.ts:151` now wraps non-Errors with `cause` preserved while rethrowing the original value; `chatOrchestrator.test.ts:311` covers string, plain object **and** `undefined` rejections asserting both the `cause` seen by `onError` and the untouched value reaching the caller; the existing Error-instance tests are unedited; `specs/hal-engine-config-hooks/spec.md:19` states the new guarantee with test citations; and `CHANGELOG.md` carries the entry with a migration note. I added nothing beyond what the verdict named.

Committed as `test(orchestrator): pin session timestamp`, pushed, and `origin/main` merged in (already up to date).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint re-lint/no-nondeterministic-tests at onErrorNonError.acceptance.test.ts:12 — new Date() replaced with an injected SENT_AT constant"}}