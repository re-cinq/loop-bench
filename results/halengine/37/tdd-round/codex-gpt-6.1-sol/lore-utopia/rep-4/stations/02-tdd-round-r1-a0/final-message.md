Committed and pushed `1884e73`. One red-green-refactor round completed; both tests in the targeted unit file pass. CI’s import and fixture lint findings were repaired. Branch is current with main and fully pushed.

Red counts: 1 new test; CI previously reported 1 pre-existing regression suite (`config.test.ts`). Acceptance tests were not run.

Next: validator retention and schema caching. No unrelated smells changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Return schema validation failures before executor invocation and repair reported CI findings","tdd_next":"Retain static validators and cache dynamic validators by schema object reference"}}