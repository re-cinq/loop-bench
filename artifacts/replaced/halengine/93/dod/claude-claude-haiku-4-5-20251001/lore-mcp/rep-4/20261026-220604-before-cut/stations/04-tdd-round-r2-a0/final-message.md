The dod.md shows facet 2 (type signature) is still open. This round fixed CI failures without closing a new facet. The dod.md accurately reflects current state — no update needed.

**Smells noticed but not acted on:**
- Line 25 of `specs/hal-engine-config-hooks/spec.md` describes the `catch`/`onError instanceof Error` behavior but has no validated-by test link — it has a code reference only. A dedicated unit test for this edge case would be needed to mark the spec "Shipped".

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix all CI eslint and spec-links failures (misplaced spec link, unused vars, status mismatch)","tdd_next":"Add or update type signature for afterModelResponse to make the accumulated sum unambiguous"}}