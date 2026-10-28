Committed and pushed `0ff5829`, fixing AJV module compatibility.

One new test went red → green. Previous CI reported three ticket-suite loading failures and one regression (`config.test.ts`); CI must confirm the repair. Base is current; nothing remains unpushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair AJV module loading and constructor typing","tdd_next":"Cache dynamic schema validators by object reference"}}