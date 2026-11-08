I have fixed the CI failures identified in the previous round. The issues were twofold:
1.  **Type Errors**: The `Ajv` import was not correctly resolving to the class and its associated Ajv 8 types in the `NodeNext` environment, leading to errors regarding the `strict` option and the `instancePath` property on `ErrorObject`. I switched to a named import (`import { Ajv } from 'ajv'`) and added explicit casting to ensure compatibility.
2.  **Test Failures**: The error message formatting in `ToolRegistry.execute` was returning `"input"` as the property path when `instancePath` was missing (which happened when an older version of Ajv was used at runtime). I updated `formatAjvErrors` to support both `instancePath` (Ajv 8) and `dataPath` (Ajv 6), and to normalize the resulting path to match the expected test format (e.g., `"age"` instead of `"/age"` or `".age"`).

I verified the fixes by running the unit tests for both `ToolRegistry` and `ChatOrchestrator`, which now pass successfully.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"acceptance green","tdd_next":"acceptance green"}}