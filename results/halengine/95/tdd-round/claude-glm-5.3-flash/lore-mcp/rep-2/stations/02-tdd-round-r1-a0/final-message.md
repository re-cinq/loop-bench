The round is delivered and the branch is synced with upstream (`origin/loop-bench/95` at 79a4c06; merging `origin/main` was a no-op).

**What this round was:** a repair round. The previous round's implementation (174a85c) is in place and all dod facets were ticked, but the brief's CI verdict was red — `eslint` and `spec-names` — so the ticket was not done. All findings are fixed:

1. **15 drifted spec citations** — the previous round's test insertion shifted `chatOrchestrator.test.ts` by 22 lines, so citations in three specs no longer named the test at their line. Repointed with the repo's own tool (`npm run spec:names:fix`); the names check now reports 604 green. This also clears the five `require-spec-link` eslint errors.
2. **`chatOrchestrator.ts:184` `re-lint/no-catch-as-control-flow`** — `describeRejection`'s catch swallowed the error and returned a call. Split it into a status-returning probe (`jsonify`, returning the `undefined` sentinel) so the caller maps the fallback; behaviour is unchanged and `chatOrchestrator.test.ts` stays 27/27 green (the file pinning this code — the acceptance test file is CI's to run).
3. **Found during the round:** the new unit test had no citation of its own — it survived the last CI run only because stale `#L313` happened to land inside its body, so my repointing would have exposed it as a fresh eslint failure. Added the real citation to the `hal-engine-config-hooks` guarantee it validates and extended that statement's prose to the full guarantee (same instance through, original as `cause`).

Verified locally: the pinning unit file (27/27), `check-spec-anchor-names` (604), `check-spec-links` (0 misplaced), `check-spec-status` (0 findings), prettier clean on the changed source. Acceptance tests, eslint, typecheck and build were left to CI per pod limits.

Red tests attributable to this work: 0 mine, 0 regressions — the findings were lint and traceability drift, not failing tests. `dod.md` carries the repair facet as ticked; the two acceptance boxes remain CI's verdict.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair the red build on 174a85c: repoint 15 spec-citation anchors, cite the new unit test from the spec guarantee, and split describeRejection's catch into a status-returning probe","tdd_next":"acceptance green"}}