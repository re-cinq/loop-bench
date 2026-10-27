Implemented and pushed one TDD round:

- Added authenticated `list_conversations` handling and validation.
- Added protocol types and `UNSUPPORTED`.
- Added focused regression test; it passes.
- Updated protocol spec and `.lore/dod.md`.
- Branch is synced with upstream.

No red tests were yours; no regressions observed. Existing CI lint/changelog findings remain for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"authenticated list_conversations handler dispatch","tdd_next":"thread history options through createServer/configuration and address CI findings"}}