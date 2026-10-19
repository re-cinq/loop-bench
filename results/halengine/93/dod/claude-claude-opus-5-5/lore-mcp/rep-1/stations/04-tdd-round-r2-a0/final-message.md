Pushed and clean. The fix: added `export function scriptedProvider(rounds: MessageChunk[][]): AIProvider` to `chatOrchestrator.ts`, which the acceptance test was already written to import. The CI failures were 0 regressions caused by me — both `typecheck` and `test` failures were from a missing export that should have been added by the previous round.

Unrelated smells noticed but not touched: the comment-style inconsistency between existing `// Fixed:` comments in test helpers and the zero-comment rule in CLAUDE.md.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"export scriptedProvider from chatOrchestrator.ts to unblock acceptance test import","tdd_next":"acceptance green"}}