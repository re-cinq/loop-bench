I could not identify a supported fix for the CI module-resolution failure. The committed lockfile declares Ajv 8.20.0, and the installed package contains the exact `ajv/dist/ajv.js` path that CI reported missing. Lore could not retrieve further CI details for this branch, and the reported Vertex failure is truncated.

CI named two red test files added on this branch and no identifiable regression tests. I made no changes, ran no tests, and did not commit or push. The branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI cannot resolve an Ajv module present in the committed dependency and local installation; further CI diagnostics are unavailable."}}