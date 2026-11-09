Committed and pushed `1a0ddf7`. Fixed the Ajv import and reported test lint findings.

One new contract test reproduced the failure and passed after repair. No regressions were identified locally; CI remains the judge. Branch is current with main and fully pushed.

Next: cache schema validators. ProviderFactory failure still needs a complete CI error message.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair Ajv default constructor compatibility and CI-reported test lint findings","tdd_next":"Cache static and dynamic schema validators"}}