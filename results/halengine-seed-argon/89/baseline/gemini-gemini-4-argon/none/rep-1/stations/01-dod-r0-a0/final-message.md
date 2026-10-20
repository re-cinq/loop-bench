Defined the Definition of Done (`.lore/dod.md`, strategy `direct`), linked the spec statements in `specs/hal-engine-providers/spec.md`, and added two failing acceptance tests in `src/providers/vertex/vertexProvider.acceptance.test.ts`.

Failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js src/providers/vertex/vertexProvider.acceptance.test.ts`:

```text
FAIL src/providers/vertex/vertexProvider.acceptance.test.ts
  ● createVertexProvider endpoint configuration › passes apiEndpoint to VertexAI when set and omits it when absent

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 0

    @@ -1,9 +1,8 @@
      Object {
        "hasEndpointOverrideWhenAbsent": false,
        "withEndpoint": Object {
    -     "apiEndpoint": "aiplatform.eu.rep.googleapis.com",
          "googleAuthOptions": undefined,
          "location": "europe-west4",
          "project": "test-project",
        },
        "withoutEndpoint": Object {

      57 |       withoutEndpoint: withoutEndpointCall,
      58 |       hasEndpointOverrideWhenAbsent: Boolean(withoutEndpointCall?.apiEndpoint),
    > 59 |     }).toEqual({
         |        ^
      60 |       withEndpoint: {
      61 |         project: 'test-project',
      62 |         location: 'europe-west4',

      at Object.<anonymous> (src/providers/vertex/vertexProvider.acceptance.test.ts:59:8)

  ● createVertexProvider endpoint configuration › routes an EU multi-region config end to end without rewriting location or logging apiEndpoint

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 0

    @@ -20,11 +20,10 @@
              "modelId": "gemini-2.5-flash",
            },
          },
        ],
        "sdkInit": Object {
    -     "apiEndpoint": "aiplatform.eu.rep.googleapis.com",
          "googleAuthOptions": undefined,
          "location": "eu",
          "project": "test-project",
        },
      }

      100 |       chunks,
      101 |       loggedEntries,
    > 102 |     }).toEqual({
          |        ^
      103 |       sdkInit: {
      104 |         project: 'test-project',
      105 |         location: 'eu',

      at Object.<anonymous> (src/providers/vertex/vertexProvider.acceptance.test.ts:102:8)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}