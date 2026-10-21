Round complete. Summary:

**Facet closed:** `beforeSession` moved inside the `try` in `src/orchestration/chatOrchestrator.ts:92`, so a throw from it reaches the same `catch`/`finally` as any other turn failure — the caller still sees the rejection, while `onError` fires with the session and the thrown error and `afterSession` fires before the save. The edit is line-count-neutral and happy-path-identical, so the existing lifecycle-order and error-path tests are unaffected by construction.

**Tests run here: none.** The red bar was the acceptance test the previous round committed (962a4fc); the pod contract forbids running the acceptance tests `.lore/dod.md` lists, so I verified by reading rather than executing — CI is the judge of it, and it is still unticked in `dod.md` until that verdict lands. No existing test pins the old, leaking behaviour (I checked the error-path tests in `chatOrchestrator.test.ts` — they exercise a throwing provider, not a throwing `beforeSession`), so I expect no regressions: 0 red tests mine, 0 known regressions.

**Also closed in the same criterion:** the spec now carries the new guarantee as one cited statement under a new `When beforeSession throws` section, including the ticket's explicit decision — `afterSession` runs on that path with no flag, so a hook cannot tell "never started" from "ran and failed" and must treat "nothing to release" as ordinary. The stale "This issue changes none of them" framing moved with the two still-out-of-scope bullets, whose source anchors I re-verified by hand (`#L148`, `#L150` still land on their lines; the anchor checker skips this spec because the branch reshaped it). CHANGELOG gained a `Changed` entry with a migration note for existing consumers.

**Out-of-scope smells noticed, acted on none:** the `instanceof Error` gate on `onError` (own issue, per ticket) and `afterModelResponse` receiving per-round rather than summed usage (HALEngine#93) — both already recorded in the spec's out-of-scope section.

Committed as 684b898, pushed, and `origin/main` merged (already up to date); `git status` reports the branch even with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"move beforeSession inside the try so onError and afterSession run when it throws (spec + CHANGELOG recorded)","tdd_next":"acceptance green"}}