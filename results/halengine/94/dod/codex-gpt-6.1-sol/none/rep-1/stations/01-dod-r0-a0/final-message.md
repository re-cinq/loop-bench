The orchestrator has a direct seam for this test. I’ll test both public entry points for the same failure: the original error reaches the caller, `onError` receives that session and error, and `afterSession` runs before rejection without later turn hooks running.

I’ll also record that cleanup can follow a partially completed `beforeSession`, so deployers must track any resources they acquired. The other two measured flaws are explicitly out of scope.
