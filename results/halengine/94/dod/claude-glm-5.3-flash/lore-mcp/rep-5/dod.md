# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam exists: `createChatOrchestrator` takes `hooks` and `processMessage` is the real caller path (the HTTP route in `src/transport/routes/chats.ts` uses exactly it), so an acceptance test can install a throwing `beforeSession` today and fail on observed behaviour. Red bar as of this commit: `callOrder` arrives as `["beforeSession"]` where the test expects `["beforeSession", "onError", "afterSession"]`, and `outcome` already reads `"beforeSession failed"` — the rejection reaches the caller unchanged (criterion 1 holds today); only the two hooks are missing.

## Done when these pass

- [ ] **runs onError then afterSession and still rejects the caller when beforeSession throws** — a throw from `beforeSession` reaches the same `catch` and `finally` as any other failure: the caller still gets the rejection, `onError` receives the same session object and the very error thrown, then `afterSession` runs on a session the turn has not touched (no provider call, no appended entry — the "never allocated" vs "allocated and finished" answer). Fails today, for the reason quoted above.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **existing pins for a non-throwing `beforeSession` stay green, unedited** (criterion 4) — `called before anything else`, `full lifecycle order`, `error path calls onError then afterSession` and the rest of the hook suites in this file; plus the config-level forwarding pins `fires the lifecycle hooks in documented order...` and `forwards an orchestrator hook...` in `src/config.test.ts`.
  `src/orchestration/chatOrchestrator.test.ts`, `src/config.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts` (line 91 today, just above the `try` at line 93) — the whole implementation this ticket owes; nothing else in the function changes.
- [ ] Spec: the recorded-flaw bullet is already replaced by the new guarantee in `specs/hal-engine-config-hooks/spec.md` under "When `beforeSession` throws", citing the acceptance test. If the landed wording drifts from the behaviour, fix the prose — the citation stays trailing, and the "out of scope" intro now reads "two properties".
- [ ] After the source edit, re-run `node scripts/repoint-spec-anchors.mjs` — `chatOrchestrator.ts` is cited by the two remaining recorded-semantics bullets (`#L150`, `#L148`).
- [ ] CHANGELOG: one entry under `## [Unreleased]` → `### Changed`, written for an existing consumer: `onError` and `afterSession` now run when `beforeSession` throws (previously neither ran), the rejection the caller sees is unchanged, and `afterSession` receives the session with nothing of the turn in it.
- [ ] Criterion 6 is CI's to prove: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`) and `npm run prettier:check` in `.github/workflows/ci.yml`'s `verify` job.

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue): a non-`Error` thrown from `beforeSession` still skips `onError` on this path while `afterSession` runs.
- Usage accounting across tool rounds (HALEngine#93).
- Whether `sessionStore.save` runs after a failed `beforeSession` — it does, from the same `finally`, but the ticket does not pin it, so the test does not either.