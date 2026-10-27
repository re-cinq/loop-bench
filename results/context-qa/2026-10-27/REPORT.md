# Context QA: Lore vs Utopia vs no MCP

Generated 2026-10-27T19:37:03.181Z. 540 answer runs. Score: correct 1, partial 0.5, otherwise 0; an unanswerable question scores 1 when the agent abstained or said no such thing exists.

## Per arm

| Arm | Questions | Score (rep range) | Lift over none | Hallucinated | Tokens p50 / p95 | Cost / question | Wall s p50 / p95 | MCP calls | Score per $ | Score per minute |
|---|---|---|---|---|---|---|---|---|---|---|
| none | 60 | 0.07 (0.07–0.07) | +0.00 | 0% | 2,731 / 2,804 | $0.011 | 2.6 / 8.1 | 0.0 | 6.6 | 1.73 |
| lore | 60 | 0.57 (0.55–0.60) | +0.50 | 10% | 49,421 / 187,507 | $0.080 | 16.3 / 42.8 | 3.4 | 7.2 | 2.12 |
| utopia | 60 | 0.86 (0.84–0.88) | +0.79 | 7% | 17,794 / 59,782 | $0.036 | 24.8 / 70.9 | 1.8 | 23.8 | 2.08 |

## Per kind (score, lift over none)

| Kind | none | lore | utopia |
|---|---|---|---|
| code-location | 0.00 | 0.48 (+0.48) | 0.69 (+0.69) |
| decision | 0.00 | 0.93 (+0.93) | 0.90 (+0.90) |
| history | 0.00 | 0.54 (+0.54) | 0.96 (+0.96) |
| learned | 0.08 | 0.78 (+0.69) | 0.89 (+0.81) |
| unanswerable | 1.00 | 0.92 (-0.08) | 1.00 (+0.00) |
| requirement | 0.00 | 0.52 (+0.52) | 0.87 (+0.87) |
| temporal | 0.00 | 0.53 (+0.53) | 0.58 (+0.58) |
| tracker | 0.00 | 0.04 (+0.04) | 1.00 (+1.00) |

## Variance across the three asks

| Arm | Verdict agreement | Median CV of tokens | Median CV of wall time |
|---|---|---|---|
| none | 98% | 0% | 26% |
| lore | 62% | 25% | 30% |
| utopia | 85% | 0% | 26% |

Judge agreement on answers judged twice: 97%.

## Paired comparisons

| First vs second | Wins / losses / ties | McNemar p | Median token difference | Median wall s difference | Verdict |
|---|---|---|---|---|---|
| lore vs none | 44 / 1 / 15 | 0.000 | 56,651 | 13.5 | lore ahead |
| utopia vs none | 54 / 0 / 6 | 0.000 | 17,188 | 23.7 | utopia ahead |
| lore vs utopia | 7 / 32 / 21 | 0.000 | 28,988 | -8.4 | utopia ahead |

## Unstable questions

- lore-none-02 (none): abstained, abstained, correct
- otto-code-01 (lore): partial, partial, correct
- otto-code-03 (lore): partial, correct, correct
- otto-hist-02 (lore): abstained, abstained, partial
- otto-hist-04 (lore): partial, partial, wrong
- otto-learn-01 (lore): correct, partial, partial
- otto-learn-02 (lore): wrong, correct, wrong
- otto-req-03 (lore): partial, correct, partial
- otto-req-04 (lore): partial, partial, correct
- otto-temp-01 (lore): partial, correct, correct
- otto-temp-02 (lore): abstained, partial, partial
- otto-trk-03 (lore): partial, wrong, partial
- lore-code-01 (lore): partial, correct, wrong
- lore-code-03 (lore): abstained, abstained, correct
- lore-dec-01 (lore): correct, correct, partial
- lore-hist-04 (lore): abstained, correct, abstained
- lore-learn-03 (lore): abstained, correct, correct
- lore-none-01 (lore): abstained, partial, correct
- lore-none-02 (lore): correct, abstained, abstained
- lore-req-02 (lore): wrong, partial, wrong
- lore-req-03 (lore): partial, partial, wrong
- lore-req-05 (lore): correct, correct, partial
- lore-temp-01 (lore): correct, wrong, partial
- lore-temp-03 (lore): wrong, wrong, abstained
- otto-code-03 (utopia): partial, partial, wrong
- otto-dec-01 (utopia): partial, partial, correct
- otto-hist-04 (utopia): correct, wrong, correct
- otto-learn-02 (utopia): wrong, wrong, correct
- otto-req-01 (utopia): partial, partial, correct
- lore-code-02 (utopia): correct, correct, wrong
- lore-dec-02 (utopia): correct, correct, partial
- lore-dec-03 (utopia): correct, wrong, partial
- lore-none-02 (utopia): correct, correct, abstained
