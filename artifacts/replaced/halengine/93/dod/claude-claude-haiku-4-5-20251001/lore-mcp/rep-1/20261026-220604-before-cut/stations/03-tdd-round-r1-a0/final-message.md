Branch is pushed and up to date. This round fixed all three CI failure categories:

1. **`re-lint/no-duplicate-code`** — Refactored the acceptance test to extract `captureUsage()` (shared hooks+capture factory) and `makeRegistry()`, eliminating the duplicated setup blocks in tests 1 & 3.
2. **`re-lint/require-spec-link`** — Added a new "Usage Accumulation" section in `specs/hal-engine-config-hooks/spec.md` with four `validated by` statements pointing to test lines 66, 76, 86, and 97. Also replaced the "under-counting" language with the correct summed-behaviour description.
3. **`changelog`** — Added a `### Changed` entry describing the `afterModelResponse` behaviour change and its migration note.

No unrelated smells were acted on. One note: `SendMessageParams` was already absent from the new imports (the original had it unused — I didn't carry it forward, which removes a potential lint noise item, though CI would have caught it if needed).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec links, duplicate-code fix, changelog — all CI failure findings resolved","tdd_next":"acceptance green"}}