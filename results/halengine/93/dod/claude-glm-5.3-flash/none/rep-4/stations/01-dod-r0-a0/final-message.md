Done. The branch `loop-bench/93` carries commit `09c542e`, pushed, up to date with its upstream, and merges cleanly into current `origin/main`.

## Triage: `direct`

The seam already exists — `createChatOrchestrator` takes a scripted provider and an installed `afterModelResponse` hook, the exact pattern `chatOrchestrator.test.ts`'s tool-loop block uses. Each test drives a real turn through the real entry point and fails today on behaviour.

**The claim, verbatim** (quoted in `.lore/dod.md`): *"…what the hook receives is the usage of the final provider call alone."*

## Acceptance tests — `src/orchestration/chatOrchestrator.acceptance.test.ts`

Ran with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts` → **2 failed, 1 passed**:

**Red — two-round tool turn, known different counts** (criterion 1), fails today on exactly the claimed behaviour:
```
● afterModelResponse usage across tool rounds › reports usage summed across every provider call of a two-round tool turn
    - Expected  - 3
    + Received  + 3
      Array [
        Object {
    -     "inputTokens": 110,
    -     "outputTokens": 45,
    -     "totalTokens": 155,
    +     "inputTokens": 10,
    +     "outputTokens": 5,
    +     "totalTokens": 15,
```
The hook received the final provider call's usage alone — the ticket's claim, reproduced.

**Red — silent middle round** (criterion 3, first half): received `{8, 2, 10}` instead of the `{108, 42, 150}` total; also guards the new arithmetic against `NaN`.

**Green guard — nothing reported still reports nothing** (criterion 3, second half): passes today by design, as the ticket pins that path as unmoved; it blocks a naive accumulator seeded with `{0,0,0}` from passing the two red tests. Flagged as a guard, not a red bar, in the dod.

**Criterion 2** (no-tool turn unmoved) is pinned by the existing unedited test — `chatOrchestrator.test.ts` › `afterModelResponse` › *receives collected response text and usage* — which I ran green today (**24 passed**), named in the dod, and cited from the spec rather than duplicated.

## Also in the commit

- `specs/hal-engine-config-hooks/spec.md` — the recorded under-counting line is replaced by a **§ Usage reporting** section stating the new behaviour, citing all three acceptance tests plus the existing no-tool pin (`#L236`). Citation names verified to match the `it(` strings exactly; required anyway, since `re-lint/require-spec-link` fails an uncited new test at build.
- `.lore/dod.md` — triage, red/green profile, and the shape contract: the third argument stays the bare summed `UsageMetadata`; a per-round breakdown may be added *alongside* it, never in place of it (that would break the unedited existing test).

## Left for the implementation round (facets in the dod)

- The sum itself in the round loop (skip rounds reporting none, seed nothing).
- Criterion 4 has no honest behavioural test — it is a property of the signature, so the dod asks the type or its one-line JSDoc to say "summed across the turn"; no `any`.
- The `CHANGELOG.md` `[Unreleased]` **Changed** line (what an existing consumer will now record — MINOR bump territory), and criterion 6's build/typecheck/eslint/prettier, which are CI's to prove.

**Finding on the way** (neighbouring, not in scope): `extractUsage` keeps only the stop chunk's usage, so a provider reporting usage on a non-terminal chunk would still be dropped — the ticket correctly scopes that out, but it is worth knowing when a provider is added.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}