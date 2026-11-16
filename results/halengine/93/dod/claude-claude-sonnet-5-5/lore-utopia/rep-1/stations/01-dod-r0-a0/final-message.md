I wrote three acceptance tests for #93, and two of them fail today for the ticket's reason. The third passes today. The branch is pushed and not ahead of its upstream.

The strategy is `direct`: `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook is already a usable seam. The tests assume the ticket's first shape, one `usage` argument carrying the sum. If the second shape (sum plus per-round breakdown) is chosen instead, they need revisiting. `.lore/dod.md` opens with the ticket's claim quoted verbatim.

The tests are in `src/orchestration/turnUsage.acceptance.test.ts`. I ran it with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/turnUsage.acceptance.test.ts`:

- **Two tool rounds:** FAILS. The scripted rounds report 1000+10, 200+20 and 30+3 tokens. The hook should get 1230/33/1263 but gets the last round only:
  ```
  - "inputTokens": 1230,  + "inputTokens": 30,
  - "outputTokens": 33,   + "outputTokens": 3,
  - "totalTokens": 1263   + "totalTokens": 33
  ```
- **A silent round in the middle:** FAILS. It expects 1030/13/1043 and gets 30/3/33.
- **No round reports usage:** passes today (`undefined`). It is a guard for the fix, because the ticket requires that a turn where nothing reported still reports nothing.

Not done, and why:
- **Type criterion:** the ticket's "type makes the answer unambiguous" criterion isn't covered. It's compile-time, and CI's typecheck covers it.
- **Spec and CHANGELOG:** I left `specs/hal-engine-config-hooks/spec.md` and the CHANGELOG alone, because editing the under-counting line now would make the spec wrong until the fix lands. They are listed as facets in `.lore/dod.md`.
- **No-tools test:** the existing no-tools test is left unedited, as the ticket requires.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}