Completed one red-green-refactor round. The new test failed because a rejection for an explicitly forbidden extra property omitted its path; it now passes and confirms the value stays out of the message. I updated the spec link and facet checklist, then committed and pushed the change. The branch is current with `main` and its upstream.

One red test was mine; the brief identified no specific regression test. CI’s prior test failure remains unresolved in its truncated report. No unrelated smells were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Name explicitly forbidden extra properties in validation errors without exposing values","tdd_next":"remaining unit tests and documentation updates"}}