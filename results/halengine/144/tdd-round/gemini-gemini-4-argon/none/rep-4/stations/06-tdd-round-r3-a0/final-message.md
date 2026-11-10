Fixed the CI failures on `src/transport/ws/validation.ts` by replacing the `Record` lookup table with a `Map<string, (message: Record<string, unknown>) => ValidationResult>`. This resolves the `TS2322` return type error (which also caused `npm run build` inside `src/infrastructure/stores/mongo/optionalPeers.test.ts` to fail) and the `camelcase` ESLint errors on the `user_message` and `list_sessions` keys.

Red tests that were ours: 0. Regressions fixed: 1 (`src/infrastructure/stores/mongo/optionalPeers.test.ts`, caused by the `TS2322` compile error in `src/transport/ws/validation.ts`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Resolve TS2322 typecheck and camelcase eslint failures in src/transport/ws/validation.ts","tdd_next":"acceptance green"}}