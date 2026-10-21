Round complete. Summary:

**Facet closed:** the last open dod facet — flipped `specs/hal-engine-tool-input-validation/spec.md` `| Status |` to `Shipped` (the eslint gate `re-lint/require-status-matches-coverage` was red on it, with all 8/8 statements already cited) — together with every finding in the CI verdict:

1. **`Ajv` named import (typecheck TS2693 + two suites failing to load):** ajv's CJS entry does `module.exports = exports = Ajv` — a reassignment that older cjs-module-lexer versions (node 22, what CI runs) refuse to attribute named exports to, while node 25 here tolerates it; that's why it reproduced nowhere locally. Switched to a default import with member access (`ajvModule.Ajv`), which both typechecks under NodeNext (a plain default alias hits TS2351 — verified, then fixed) and needs no named export at runtime.
2. **`instancePath` on `ErrorObject` (TS2339 ×2):** the error-path read moved behind a one-line structural accessor (`describeSchemaError`) that accepts both v6's `dataPath` and v8's `instancePath`, preserving the exact message shape and the no-values redaction contract.
3. **Coverage collapse in the `test` step** was a consequence of (1) — the suites couldn't load; nothing further owed.

**Tests this round:** no new test was written — the red bar was CI's verdict, and these changes are import-mechanics and type-surface that force no behaviour change (validation behaviour is already pinned by `registry.test.ts` and the acceptance suite). Verified locally: `tsc --noEmit` green, `registry.test.ts` + `chatOrchestrator.test.ts` green (29/29). The acceptance suite remains CI's to run.

**Red tests:** 0 regressions; the 2 suite-load failures were mine from the previous round's import style and are fixed. The brief also named `chats.test.ts` "refuses to read a chat" (expected 401, got 501) — I could not reproduce it (27/27 pass at HEAD) and the branch touches no transport file, so I did not blind-fix it; if CI names it again, the next round gets it with the real log tail.

**Smells noticed, not acted on:** ajv's CJS entry is hostile to ESM named imports generally — a jest `moduleNameMapper` or bundling an ESM build would remove this class of failure entirely; and `chats.test.ts`'s deny-by-default expectations depend on middleware behaviour worth a characterization pass if the 501 resurfaces.

Committed `113c37b`, pushed; branch is in sync with its upstream and `origin/main` (merge was a no-op).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec status flipped to Shipped plus CI's named findings: ajv default import (two suites failed to load, TS2693) and the ErrorObject path read behind a structural accessor (TS2339 x2)","tdd_next":"acceptance green"}}