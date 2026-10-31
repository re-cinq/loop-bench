Added and pushed the red acceptance contract in commit `a2d7e1a`.

- New test: `src/orchestration/tools/registry.acceptance.test.ts`
- New traceable spec: `specs/hal-engine-tool-input-validation/spec.md`
- DoD record: `.lore/dod.md`

Ran only:

```sh
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts
```

Actual failure excerpts:

```text
Expected "calls": 0
Received "calls": 2
```

```text
Expected pattern: /broken-weather/
Received function did not throw
```

```text
Expected "result": StringMatching /location.*number|number.*location/i
Received "result": "forecast"
```

Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}