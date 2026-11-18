# Which AI model should do which job

As of 2026-11-18, we measured 3185 runs by 20 AI models on 5 tickets, each run being one model doing one job: writing the tests, writing the code, or fixing a broken build. A run works when the project's checks pass on what the model delivered. Together the runs cost $3,368 at list prices. The full results are on the website: https://re-cinq.github.io/loop-bench/

Every ticket counts equally, however often it was run. Models are ranked on quality (70% how often the result works, 30% the AI reviewer score, which is not used for writing the tests), price and speed, with quality counting three times as much as each of the other two; price and speed are compared on a log scale. A model that skipped a ticket is not ranked. "Still works" means working at least three quarters as often as the most reliable model.

## Write the tests

Recommended: **gpt-6.1-sol**. It works in 44 of 55 runs (80%), about $0.15 and 6 minutes a run.

| Model | Works | Usual cost | Usual time | Cost per working result |
|---|---|---|---|---|
| gpt-6.1-sol | 44 of 55 runs (80%) | $0.15 | 6 min | $0.34 |
| gpt-6-luna | 48 of 75 runs (64%) | $0.01 | 2 min | $0.15 |
| gpt-6-sol | 40 of 55 runs (73%) | $0.43 | 7 min | $0.81 |
| gpt-5.6-luna | 46 of 75 runs (61%) | $0.04 | 3 min | $1.08 |
| claude-sonnet-5-5 | 33 of 55 runs (60%) | $0.16 | under 1 min | $0.38 |

Cheapest that still works: gpt-6-luna, $0.15 per working result (works in 64% of runs).

Fastest that still works: gpt-6-luna, about 5 minutes per working result (works in 64% of runs).

Not ranked because they skipped a ticket: claude-fable-5-1 (not run on 2 small tickets, the medium ticket or the large ticket).

## Write the code

Recommended: **claude-sonnet-5-5**. It works in 47 of 55 runs (85%), about $0.40 and 2 minutes a run.

| Model | Works | Usual cost | Usual time | AI reviewer score | Cost per working result |
|---|---|---|---|---|---|
| claude-sonnet-5-5 | 47 of 55 runs (85%) | $0.40 | 2 min | 3.9 of 5 | $0.85 |
| gpt-5.6-terra | 53 of 57 runs (93%) | $1.54 | 29 min | 3.6 of 5 | $2.11 |
| gpt-5.6-sol | 52 of 57 runs (91%) | $2.32 | 19 min | 3.6 of 5 | $3.31 |
| gpt-5.6-luna | 52 of 75 runs (69%) | $0.20 | 13 min | 3.8 of 5 | $0.47 |
| gpt-6-luna | 48 of 75 runs (64%) | $0.06 | 10 min | 3.5 of 5 | $0.15 |

Cheapest that still works: claude-sonnet-5-5, $0.85 per working result (works in 85% of runs).

Fastest that still works: claude-sonnet-5-5, about 10 minutes per working result (works in 85% of runs).

Not ranked because they skipped a ticket: glm-5.3-flash (not run on the large ticket).

## Fix a broken build

Recommended: **gemini-4-carbon**. It works in 44 of 55 runs (80%), about $0.78 and 23 minutes a run.

| Model | Works | Usual cost | Usual time | AI reviewer score | Cost per working result |
|---|---|---|---|---|---|
| gemini-4-carbon | 44 of 55 runs (80%) | $0.78 | 23 min | 3.7 of 5 | $1.70 |
| gpt-6.1-sol | 33 of 57 runs (56%) | $0.09 | 2 min | 3.7 of 5 | $0.19 |
| gemini-4-hydrogen | 33 of 55 runs (60%) | $0.22 | 2 min | 3.9 of 5 | $0.65 |
| gpt-6-astra | 37 of 57 runs (64%) | $0.51 | 2 min | 3.5 of 5 | $1.03 |
| gemini-4-argon | 42 of 66 runs (63%) | $0.63 | 5 min | 3.7 of 5 | $2.01 |

Cheapest that still works: gpt-6-astra, $1.03 per working result (works in 64% of runs).

Fastest that still works: gpt-6-astra, about 8 minutes per working result (works in 64% of runs).

## What we learned

### Does a knowledge base help?

A setup is one model on one ticket for one job. Only setups that ran with none, with Lore and with Utopia are compared, so the three are judged on the same work. Most Lore setups have only one run, so these are hints, not proof.

- For writing the tests, a knowledge base makes little difference: runs work 65% of the time with none, 65% with Lore and 64% with Utopia. That is over 85 setups, and Lore had a single run in 73 of them.
- For writing the code, a knowledge base helps: runs work 56% of the time with none, 70% with Lore and 71% with Utopia. That is over 90 setups, and Lore had a single run in 56 of them.
- For fixing a broken build, a knowledge base makes little difference: runs work 40% of the time with none, 41% with Lore and 42% with Utopia. That is over 90 setups, and Lore had a single run in 56 of them.

### How much repeats disagree

Of 614 setups run two or more times, 220 (36%) both worked and failed on different repeats, so one run is a weak guide.

### Which tickets are too hard

No model works in three quarters of runs for writing the tests on the medium ticket (best: 0%) and fixing a broken build on the medium ticket (best: 46%).

### Where the money goes

$1,102 of the $3,368 with a recorded cost (33%) went to runs that did not work.

## Limits

- The results rest on 5 tickets of one project (3 small, 1 medium, 1 large), so they may not carry over to other code.
- An AI, not a person, gives the reviewer score.
- Time is the model's own working time as its tool reports it, without the wait for the project's checks.
- 183 runs of 3185 have no recorded cost and are left out of the cost figures.
- Costs are list prices for the work done, not what a subscription charged.
