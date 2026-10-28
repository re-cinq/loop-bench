Committed and pushed `df87e47`. Moved `beforeSession` inside `try`; updated documentation and traceability.

One new test went red, then green. No regressions reported; acceptance remains for CI. Branch is current with main and fully pushed.

Unchanged concerns: non-Error failures bypass `onError`; usage accounting omits earlier tool rounds.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside try and document failed-start cleanup","tdd_next":"acceptance green"}}