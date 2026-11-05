`afterModelResponse` now receives the sum of usage across every provider call in the turn, not just the last one. The commit is pushed, the merge with `origin/main` found nothing to bring in, and the branch is level with its upstream.

I ran only the `addUsage` tests I wrote, and they pass. The two acceptance tests in `chatOrchestratorUsage.acceptance.test.ts` were not run here, so CI will say where they stand.

- **Chosen shape:** I kept one `usage` argument of type `UsageMetadata` and summed into it. That is the "accumulate and pass the sum" option from the ticket. The type itself does not change, so the "type makes the answer unambiguous" criterion is met only by a doc comment on the hook. If you want the type to say it, that is a next-round decision.
- **Rounds that report nothing:** they are skipped when summing. A turn where no round reported still passes `undefined`.
- **New test:** `addUsage` in `src/orchestration/orchestratorHelpers.test.ts` covers summing two reported rounds, keeping whichever side reported, and `undefined` when neither did.
- **Code:** the new `addUsage` helper is in `orchestratorHelpers.ts`, and `chatOrchestrator.ts` uses it in place of `lastUsage`.
- **Not checked:** the existing no-tool test `receives collected response text and usage` is untouched and was not run here. I did not run lint or typecheck, per the brief.
- **Docs:** I added a CHANGELOG entry under Changed saying tool-heavy turns now report a larger number. The hooks spec already described the summed behaviour, so I left it alone.
- **`.lore/dod.md`:** I ticked the first two facets.
- **Still open:** the third facet (the no-tool regression guard) and the fourth (spec and CHANGELOG) are unticked. They are covered in practice, but I did not tick them because I haven't confirmed them against CI's result.
- **Red tests:** none to count, since there was no CI verdict in this round's brief.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum usage across provider rounds via addUsage; CHANGELOG entry","tdd_next":"acceptance green"}}