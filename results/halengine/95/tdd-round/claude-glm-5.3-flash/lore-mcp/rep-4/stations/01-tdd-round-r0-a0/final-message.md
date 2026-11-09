Pushed and confirmed: `loop-bench/95` is up to date with its upstream, and `origin/main` (684b294) is already an ancestor of the branch, so no merge or conflict work was needed.

## Round summary

**Facet closed:** the coercion — `hooks.onError` now fires for *every* rejection inside the turn. The `catch` in `src/orchestration/chatOrchestrator.ts:149` dropped its `error instanceof Error` gate and passes the rejection through a new `asError` helper: an `Error` passes through as the same instance, a thrown string becomes the `message` directly, anything else gets `non-error rejection: <json>` — in both wrap cases the original rejection is preserved as `cause`, and the `throw error` rethrow is untouched, so the caller's contract is unchanged.

**RED→GREEN:** I wrote one test — `calls onError with an Error that carries the thrown object as cause when the stream rejects with a plain object` (`src/orchestration/chatOrchestrator.test.ts:311`) — pinning the one property nothing else pinned: `cause` identity (`seenError?.cause === reason`). It failed for exactly the reason the dod predicted (`callOrder: ['afterSession']`, `isError: false`), then went green with the fix; 27/27 in the file, including the three pinned error-path tests that facet 2 requires unedited. The only edit to their file is widening the shared `createErrorProvider` helper's parameter `Error` → `unknown` so a test can hand it a non-`Error` rejection; those three test bodies are untouched. No refactor was needed beyond what landed — the `new Error(msg, {cause})` idiom already exists at `tools/registry.ts:56`.

**Also delivered:** CHANGELOG `## [Unreleased] → Fixed` entry with a migration note for existing consumers (the repo's `check-changelog.sh` gate requires it since `src/` changed); the `specs/hal-engine-config-hooks/spec.md` statement now states the `cause` guarantee and cites my test; `node scripts/check-spec-anchor-names.mjs --fix` repointed 17 `#Lnn` citations my insertion shifted (this repo's equivalent of `reanchor.mjs`), and both spec checkers report clean.

**Not run here, by design:** the acceptance tests in `src/orchestration/onErrorNonError.acceptance.test.ts` — CI is their judge. Format-only from CI's checklist (`prettier` reported both changed `.ts` files unchanged); no lint, typecheck, or build in this pod.

**Red tests:** 1 mine (now green). Regressions: 0. **Future improvements (not acted on):** `saveSession` and `consultPolicy` each re-derive `error instanceof Error ? … : …` for logging — a third coercion site could reuse a shared formatter, but they are logging concerns, not the hook seam.

**Next facet:** pin the `undefined` rejection (ticket criterion 2's third value) — appended as an unchecked facet in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections so onError always fires, with cause preserved (+ CHANGELOG entry, existing error-path tests confirmed green)","tdd_next":"pin the undefined rejection in chatOrchestrator.test.ts, then acceptance green"}}