I have completed the round by addressing all CI findings and improving the robustness of the tool input validation logic.

### Summary of Changes
- **Fixed TypeScript Error:** Resolved the error where the `strict` property was not recognized in `Ajv` options by importing the `Options` type and applying an explicit cast.
- **Fixed ESLint Warning:** Removed the `any` cast from the validation error processing logic, using the typed `ErrorObject` properties directly.
- **Improved Validation Messages:** Updated the field extraction logic in `ToolRegistry.execute` to be more defensive, correctly handling `instancePath`, `missingProperty`, and `propertyName` to ensure the failing field is always identified in the rejection message.
- **Verified Success:** Confirmed that `ToolRegistry` unit tests pass locally. A reproduction script confirmed that validation failures correctly name the field and expected type without leaking the offending values in results or logs.
- **Documentation & Standards:** Verified that `README.md`, `CHANGELOG.md`, and the project specifications are up to date and correctly linked to the tests.

I also investigated the `VertexAI` test failure mentioned in the brief and found it to be a pre-existing warning/deprecation issue that does not prevent tests from passing in this environment.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI findings and improve validation robustness","tdd_next":"acceptance green"}}