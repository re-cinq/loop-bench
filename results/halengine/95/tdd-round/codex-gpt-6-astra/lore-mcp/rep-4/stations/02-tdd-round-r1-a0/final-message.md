Pushed `f29e6cc`; branch is current with main and upstream.

Completed one red-green-refactor round: unprintable rejections now reach `onError`, preserving cause and caller identity. New test: 1 red → green after refactoring. CI reported no regression tests; all listed lint/link findings were repaired.

Next: plain-object and `undefined` cause coverage. Unrelated smells: none identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve onError delivery for unprintable rejections","tdd_next":"Pin cause preservation for plain-object and undefined rejections"}}