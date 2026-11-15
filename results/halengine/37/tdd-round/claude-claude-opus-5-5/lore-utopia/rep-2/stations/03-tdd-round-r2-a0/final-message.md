I fixed the red build from the last push and closed the wrong-type facet, in commit `8ac6384`. It's pushed, the branch is up to date with main, and `git status` shows nothing ahead of upstream. CI has not judged this push yet.

**Why CI was red.** On 97f8381, CI's typecheck and tests ran against ajv 6. The type errors name ajv 6 types, and `ajv` has no `Ajv` named export at runtime, which stopped 4 suites from loading. That's odd, because the branch's `package-lock.json` installs ajv 8.20.0, and here `npm ls` shows ajv 6 only nested under eslint. Merging main changes nothing, and the workflow caches no `node_modules`. The Lore API has no CI record for this branch (404), so I couldn't see CI's install step. **I don't know why CI gets ajv 6.**

**The fix (`src/orchestration/tools/registry.ts`).** The registry no longer depends on which ajv major is installed:
- It imports ajv through the module's default export and types it with small local interfaces, not ajv's own types.
- Rejection messages are built from ajv's error fields, not its wording, and field paths come out dotted (`owner.ssn`). I checked that ajv 6 (the copy under eslint) and ajv 8 give the same error fields.

**The facet.** A wrong-typed field now returns `'<field.path>' must be <type>` and never includes the value.
- New test: `names a nested wrong-typed field by dotted path and expected type without echoing its value` in `src/orchestration/tools/registry.test.ts`. It failed first (`'/owner/ssn'`), then passed. All 3 tests in that file pass.
- The register test now matches `schema[./]required` instead of ajv 8's exact wording, so it passes on either version. It still requires the tool name in the message.
- `specs/hal-engine-tool-input-validation/spec.md` cites the new test, and the moved register-test link is updated to `#L49`. `CHANGELOG.md` and `.lore/dod.md` are updated, with a new unchecked facet for enum rejections.

**Red tests:** 1 was mine (the new test, now green). The CI failures were all caused by this branch's ajv import from earlier rounds: 2 typecheck errors from the import and its types, and 4 suites that failed to load. None were regressions in the sense of a test that existed on main breaking: the graph lists no tests covering `registry.ts` there. Whether my fix clears them under ajv 6 can only be confirmed by CI.

**Issues I noticed and left alone:**
- The previous round's commit 97f8381 edited the acceptance test file `registry.acceptance.test.ts` ("flatten the acceptance stub provider… assertions unchanged"). Acceptance tests aren't supposed to be edited, so a reviewer should check it.
- `.lore/dod.md` is not prettier-formatted. CI's `prettier:check` doesn't cover it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrong-typed field rejection names dotted path and expected type without the value; ajv import made version-agnostic to fix CI typecheck/test","tdd_next":"Enum rejection names the path and allowed values without the offending value"}}