# Context QA: Lore vs Utopia vs no MCP

Generated 2026-10-27T09:49:18.767Z. 360 answer runs. Score: correct 1, partial 0.5, otherwise 0; an unanswerable question scores 1 when the agent abstained or said no such thing exists.

## Per arm

| Arm | Questions | Score (rep range) | Lift over none | Hallucinated | Tokens p50 / p95 | Cost / question | Wall s p50 / p95 | MCP calls | Score per $ | Score per minute |
|---|---|---|---|---|---|---|---|---|---|---|
| none | 60 | 0.07 (0.07–0.07) | +0.00 | 0% | 2,731 / 2,804 | $0.011 | 2.6 / 8.1 | 0.0 | 6.6 | 1.73 |
| lore | 60 | 0.57 (0.53–0.61) | +0.49 | 11% | 49,421 / 187,507 | $0.080 | 16.3 / 42.8 | 3.4 | 7.1 | 2.10 |

## Per kind (score, lift over none)

| Kind | none | lore |
|---|---|---|
| code-location | 0.00 | 0.56 (+0.56) |
| decision | 0.00 | 0.93 (+0.93) |
| history | 0.00 | 0.44 (+0.44) |
| learned | 0.08 | 0.78 (+0.69) |
| unanswerable | 1.00 | 0.92 (-0.08) |
| requirement | 0.00 | 0.52 (+0.52) |
| temporal | 0.00 | 0.50 (+0.50) |
| tracker | 0.00 | 0.04 (+0.04) |

## Variance across the three asks

| Arm | Verdict agreement | Median CV of tokens | Median CV of wall time |
|---|---|---|---|
| none | 98% | 0% | 26% |
| lore | 62% | 25% | 30% |

Judge agreement on answers judged twice: 94%.

## Paired comparisons

| First vs second | Wins / losses / ties | McNemar p | Median token difference | Median wall s difference | Verdict |
|---|---|---|---|---|---|
| lore vs none | 43 / 1 / 16 | 0.000 | 56,651 | 13.5 | lore ahead |

## Unstable questions

- lore-none-02 (none): abstained, abstained, correct
- otto-code-01 (lore): partial, partial, correct
- otto-code-02 (lore): correct, correct, wrong
- otto-code-03 (lore): partial, correct, correct
- otto-hist-02 (lore): abstained, abstained, partial
- otto-learn-01 (lore): correct, partial, partial
- otto-learn-02 (lore): wrong, correct, wrong
- otto-req-03 (lore): partial, correct, partial
- otto-req-04 (lore): partial, partial, correct
- otto-temp-01 (lore): partial, correct, correct
- otto-temp-02 (lore): abstained, correct, correct
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
- lore-temp-01 (lore): wrong, wrong, abstained
- lore-temp-03 (lore): wrong, wrong, abstained
