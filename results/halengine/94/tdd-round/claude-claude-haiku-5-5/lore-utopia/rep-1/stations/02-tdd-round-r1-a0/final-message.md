The CI findings I could fix are fixed and pushed, but the acceptance test itself is wrong, so this round is blocked and closes no facet.

**What I fixed (commit `c62e149`, pushed; branch is in sync with upstream, `origin/main` merge was a no-op):**
- The previous round's new unit test in `chatOrchestrator.test.ts` added 20 lines above the existing orchestrator tests. Their `validated by` links in `specs/hal-engine-architecture/spec.md` pointed at stale lines. That caused the 12 `spec-names` findings and the 3 `require-spec-link` lint errors. I repointed them by test name with `node scripts/check-spec-anchor-names.mjs --fix`, and `check-spec-anchor-names` and `check-spec-links` now pass.
- `specs/hal-engine-tool-input-validation/spec.md` had one stale link, fixed the same way.
- I ran Prettier on the spec and it reflowed unrelated blank lines. The repo's `prettier:check` doesn't cover markdown, so I reverted that and kept only the anchor edits.

**What is blocked: the acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`.**
- **Typecheck:** it passes `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig` to `PromptBuilder`. `PromptBuilderConfig` has `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`, so the test does not compile.
- **ESLint:** it has 3 `expect` calls against a `max 1` rule (`re-lint/max-expects`).

I can't edit the acceptance test, so the typecheck and lint failures stay red until someone fixes that file.

**Red-test count:** one red test that I did not write, the acceptance test, which is red by design and has the defects above. Zero red tests that I wrote. Three lint and twelve spec-name findings were regressions I caused by shifting line numbers; they are fixed.

**Not done:**
- No tests were run in this pod, and I did not run lint or typecheck, per the brief.
- No facet is closed. `.lore/dod.md` is unchanged.
- Still open: the spec update (replace the recorded-flaw line with the new `beforeSession` guarantee, and state what a hook can assume about the turn) and the CHANGELOG entry. The `afterSession`-after-throw behaviour also has no unit test of its own yet.
- The brief mentions `scripts/spec-links/reanchor.mjs`, which does not exist in this repo. I used `check-spec-anchor-names.mjs --fix` instead.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is wrong: it passes non-existent PromptBuilderConfig fields (baseSystemPrompt, systemPromptSuffix, contextConfig) and has 3 expects against max-expects 1; it must be fixed by its owner before CI can go green"}}