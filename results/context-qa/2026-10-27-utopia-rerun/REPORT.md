# Context QA: Lore vs Utopia vs no MCP

Generated 2026-10-27T19:37:03.470Z. 180 answer runs. Score: correct 1, partial 0.5, otherwise 0; an unanswerable question scores 1 when the agent abstained or said no such thing exists.

## Per arm

| Arm | Questions | Score (rep range) | Lift over none | Hallucinated | Tokens p50 / p95 | Cost / question | Wall s p50 / p95 | MCP calls | Score per $ | Score per minute |
|---|---|---|---|---|---|---|---|---|---|---|
| utopia | 60 | 0.85 (0.82–0.87) | — | 9% | 17,813 / 58,693 | $0.034 | 14.4 / 51.3 | 1.7 | 24.7 | 3.53 |

## Per kind (score, lift over none)

| Kind | utopia |
|---|---|
| code-location | 0.63 |
| decision | 0.87 |
| history | 0.98 |
| learned | 0.83 |
| unanswerable | 0.92 |
| requirement | 0.92 |
| temporal | 0.58 |
| tracker | 1.00 |

## Variance across the three asks

| Arm | Verdict agreement | Median CV of tokens | Median CV of wall time |
|---|---|---|---|
| utopia | 85% | 9% | 49% |

Judge agreement on answers judged twice: 97%.

## Paired comparisons

| First vs second | Wins / losses / ties | McNemar p | Median token difference | Median wall s difference | Verdict |
|---|---|---|---|---|---|

## Unstable questions

- otto-dec-01 (utopia): correct, partial, partial
- otto-dec-03 (utopia): correct, correct, partial
- otto-hist-01 (utopia): correct, correct, partial
- otto-req-01 (utopia): partial, correct, partial
- otto-temp-02 (utopia): correct, partial, partial
- otto-temp-03 (utopia): partial, partial, wrong
- lore-code-02 (utopia): wrong, partial, correct
- lore-dec-03 (utopia): wrong, partial, wrong
- lore-none-01 (utopia): correct, correct, partial
