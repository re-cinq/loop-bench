Stopping here: this ticket is several tickets, so I wrote no new tests and committed nothing.

The branch already has commit `3c49554` (pushed, up to date with `origin/loop-bench/37`) with two acceptance tests and spec links for the central claim. I ran them and they fail for the right reason:

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry.execute input validation › answers a call missing a required property with a rejection naming it, and never runs the executor
    Expected substring: "location"
    Received string:    "forecast"
  ● ToolRegistry.execute input validation › answers a wrong-typed property with its path and expected type, without echoing the offending value
    Expected substring: "location"
    Received string:    "forecast"
Tests:       2 failed, 2 total
```

Those two do not make the ticket done. `specs/hal-engine-tool-input-validation/spec.md` has seven more un-linked testable statements: rejection resolves rather than throws, extra properties pass through unmodified, schema-only enforcement with no coercion or defaults, register-time compile and throw naming the tool, per-call resolution of function-valued definitions, unchanged `Unknown tool` throw, and no values in logs or rejection text. The ticket adds the chat-loop retry test and the compile-once test on top. That is more than the five-test limit, so the ticket needs splitting rather than more tests.

The existing `.lore/dod.md` lists those remaining items as facets but its "Done when" section only covers the two tests. I left the branch as it is.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Split: the ticket bundles several separable behaviours (rejection at execute, which the two existing red tests cover; register-time schema compile and throw; per-call resolution of function-valued schemas; extra-property passthrough and unknown-tool pin; redaction of values in logs and rejection text; chat-loop retry recovery), and the spec's seven un-linked statements exceed the five-test limit. Docs, CHANGELOG, PR-body and build/lint gates are not acceptance tests."}}