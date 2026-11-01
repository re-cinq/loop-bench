Committed and pushed `634f666` using `direct`. One acceptance test covers both entry points; production code is unchanged. Branch is current with `main` and its upstream.

Ran only `src/orchestration/beforeSession.acceptance.test.ts`. Actual failure excerpt:

```diff
-       "onError(session, originalError)",
-       "afterSession(session)",
        "caller rejection",
-     "resourcesRemaining": 0,
+     "resourcesRemaining": 1,
```

```text
Tests:       1 failed, 1 total
```

Added the DoD and linked spec guarantee. Descriptor tooling lacks a `spec` field; documented that limitation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}