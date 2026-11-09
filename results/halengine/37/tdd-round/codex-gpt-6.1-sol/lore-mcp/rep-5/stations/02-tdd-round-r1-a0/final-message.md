Committed and pushed `5aa4c1f`; branch is current with main and upstream.

One new test went red → green for missing-required-input rejection. Ajv import and fixture lint findings repaired. One pre-existing provider-test failure remains undiagnosed because CI omitted its exception message. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject missing required input before executor invocation","tdd_next":"Diagnose provider CI failure, then pin validator caching"}}