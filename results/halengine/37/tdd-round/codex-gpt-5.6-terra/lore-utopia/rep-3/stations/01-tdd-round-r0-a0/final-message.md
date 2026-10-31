Implemented and pushed `a499301`.

- Added AJV and required-property input rejection before executor invocation.
- Added and linked a focused registry unit test; it passes.
- Red tests: 1 authored; regressions: 0.
- Next facet: wrong-type rejection with redacted values.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"missing required-property input rejection","tdd_next":"reject wrong-typed properties without leaking values"}}