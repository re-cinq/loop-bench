Both findings are fixed, committed as `de4ebef`, pushed, and the branch is in sync with `origin/main` (already up to date).

## What this round did

The previous round's work was functionally complete — all three dod facets ticked, implementation and CHANGELOG in place — but the push was red on two findings in the acceptance test it added. Both were owed before anything else:

1. **typecheck** `chatOrchestrator.beforeSession.acceptance.test.ts:30` — the test built `PromptBuilder` with `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig`, none of which exist on `PromptBuilderConfig` (`{identity, domainContext?, responseGuidelines?, toolPreamble?}`). Now built the way the rest of the suite does: `new PromptBuilder({identity: 'You are HAL.'})`, matching `src/orchestration/chatOrchestrator.test.ts:51`.
2. **eslint** `re-lint/max-expects` at `:40` — three `expect` calls against a max of 1. The rejection, the `onError` argument and the `afterSession` flag are now asserted as one object with `toEqual`, so a failure shows the whole diff at once (the rule's stated intent). Catching the rejection manually rather than via `rejects.toThrow` keeps the assertion that the same error object reaches the caller — acceptance criterion 1 — inside the single assertion.

Because the test body moved, I re-anchored the spec's `([validated by ...])` link on `specs/hal-engine-config-hooks/spec.md:26` from `#L40` to `#L32` by hand (no `scripts/spec-links/reanchor.mjs` in this repo). The repo's `re-lint/require-spec-link` and `no-dead-md-links` rules both stay satisfied: the link's line falls inside the test's new span.

## Verification

**This round ran no tests here.** The pod's guard refused the file by name — it is the acceptance test `.lore/dod.md` lists, and that is CI's to run. The fix stands on reading the `PromptBuilderConfig` and `max-expects` rule sources directly, and on CI's verdict for this push.

**Red tests:** none were test failures — both findings were lint/typecheck defects in this ticket's own new test. **Regressions to pre-existing tests: 0.**

## Smells noticed, not acted on

- `specs/hal-engine-config-hooks/spec.md:22-24` still heads the section "Measured semantics — out of scope" and says "This issue changes none of them", but its first bullet is now the implemented guarantee this ticket's acceptance test cites. The framing is stale for that bullet; restructuring the section is spec work beyond the two named findings.
- The `onError` `instanceof Error` gate remains out of scope per the ticket (its own issue), as does usage accounting (HALEngine#93).

Every dod facet is ticked; the only thing between this branch and done is CI's verdict on the repaired test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"close CI's typecheck and eslint findings on the beforeSession acceptance test","tdd_next":"acceptance green"}}