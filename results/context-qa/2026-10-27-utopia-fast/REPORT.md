# Context QA: Lore vs Utopia vs no MCP

Generated 2026-10-27T19:18:08.386Z. 180 answer runs. Score: correct 1, partial 0.5, otherwise 0; an unanswerable question scores 1 when the agent abstained or said no such thing exists.

## Per arm

| Arm | Questions | Score (rep range) | Lift over none | Hallucinated | Tokens p50 / p95 | Cost / question | Wall s p50 / p95 | MCP calls | Score per $ | Score per minute |
|---|---|---|---|---|---|---|---|---|---|---|
| utopia | 60 | 0.84 (0.82–0.87) | — | 9% | 17,800 / 60,602 | $0.023 | 8.8 / 30.6 | 1.7 | 37.1 | 5.71 |

## Per kind (score, lift over none)

| Kind | utopia |
|---|---|
| code-location | 0.63 |
| decision | 0.87 |
| history | 0.83 |
| learned | 0.83 |
| unanswerable | 1.00 |
| requirement | 0.82 |
| temporal | 0.81 |
| tracker | 1.00 |

## Variance across the three asks

| Arm | Verdict agreement | Median CV of tokens | Median CV of wall time |
|---|---|---|---|
| utopia | 85% | 0% | 26% |

Judge agreement on answers judged twice: 95%.

## Paired comparisons

| First vs second | Wins / losses / ties | McNemar p | Median token difference | Median wall s difference | Verdict |
|---|---|---|---|---|---|

## Unstable questions

- otto-req-01 (utopia): partial, correct, correct
- otto-req-02 (utopia): correct, partial, correct
- otto-temp-02 (utopia): correct, partial, correct
- lore-code-02 (utopia): correct, partial, correct
- lore-code-04 (utopia): partial, wrong, wrong
- lore-dec-02 (utopia): correct, partial, correct
- lore-dec-03 (utopia): wrong, partial, partial
- lore-hist-04 (utopia): wrong, correct, correct
- lore-req-01 (utopia): partial, wrong, correct
