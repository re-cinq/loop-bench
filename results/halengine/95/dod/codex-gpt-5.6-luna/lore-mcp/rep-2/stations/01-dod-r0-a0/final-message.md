Added and pushed commit `992db83`.

- Strategy: `direct`
- Acceptance test: `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`
- Updated spec traceability and `.lore/dod.md`
- Test command run:
  `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/onErrorNonErrorRejection.acceptance.test.ts --runInBand`
- Actual failure: `Expected: 1 / Received: 0` for `onErrorCalls`

Branch is up to date with `origin/main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}