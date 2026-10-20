_First clean reading, 2026-10-20 01:30: ticket #93, the dod station varied, no Lore, **one run per cell**. The first attempt at this wave (archived in `results/archive/`) ran Claude with the author's personal instructions loaded; its numbers are not comparable and are not used here._

- **One run per cell says little about rounds and cost.** The same cells, rerun clean, moved a lot: the `short` prompt went from 2 tdd rounds to 7, gpt-6-sol from 1 to 5, Haiku 5.5 from 2 to 6. A loop's rounds depend as much on what a given Sonnet round happens to break as on the dod. Rankings by rounds or loop cost wait for the repeats.
- **Every dod passes the deterministic check except the production baseline's.** 17 of 18 cells wrote acceptance tests that fail on the base commit and pass once the merged pull request's code is applied. The production model, Gemini 3.1 Pro on the shipped prompt, did not: its tests read the usage total from a place the merged fix never fills, so with the team's code applied they receive nothing. The loop still went green, by building the dod's design instead of the team's. That is one run, so it is a lead to check in the repeats, not a verdict.
- **The dod step itself is cheap for almost every model.** Alone it cost $0.01 (gpt-6-luna) to about $1.70 (Fable 5.1); Gemini 3.1 Pro, the production choice, cost about $0.65. What a loop costs is mostly the tdd rounds after it.
- **Fastest and cheapest loops:** gpt-5.6-terra ($2.06, 10 minutes, green after one round), gpt-6-luna ($2.16) and Sonnet 5.5 ($2.76, 15 minutes, judge 5 / 5 / 4). The production loop was the most expensive at $9.66 and an hour.
- **Judge scores sit in a narrow band.** Nearly every cell scored 4 or 5 for correctness and completeness; only gpt-5.6-sol fell to 3 / 3 / 3. On this small ticket the judge separates models less than cost and rounds do.
- **Prompt variants:** neither `short` nor `no-traceability` beat the shipped prompt in this run ($8.30 and $9.37 against $9.66, with 7 and 4 rounds). The earlier reading that `short` halves the rounds did not survive the clean rerun.
- **Effort was not equal** (column Effort): each CLI ran its default, high for the Gemini 3 models, Fable 5.1 and Sonnet 4.6, medium or low for the rest.

**Running overnight without Claude:** the tdd-round and repair-build comparisons for the ten Gemini and Codex models, with and without Lore, three runs each (120 loops), from clean starting branches: gpt-5.6-terra's dod and the first red build of the Gemini 4 Argon loop. Claude cells, the with-Lore dod wave and the dod repeats resume when Claude is back.

**Production defects found along the way:** re-cinq/lore#2834 (the tdd-round prompt makes Lore tools mandatory; two Codex models refused to work without them) and re-cinq/ai-agent-subsystem#241 (skills reach Claude pods only).

**tdd-round and repair-build, Gemini models** (ticket #93, three runs per cell, with and without Lore; tdd-round starts from gpt-5.6-terra's clean dod, repair-build from the first red build of the clean Gemini 4 Argon loop):

- **All three Gemini models finish the implementation every time.** 18 of 18 tdd-round loops reached a green build, in 0 to 4 extra rounds.
- **Gemini 4 Argon writes the best code; Gemini 3 Flash is the cheap option.** Argon: judge 5 / 5 / 4-5 in every run, $2.22 to $2.94 a loop. Flash: 4.7-5 / 5 / 4, $0.80 to $1.26. Gemini 3.1 Pro: 3.7-4.3 / 4.7 / 3.7 at $1.68 to $2.60, below both. For scale, production's Sonnet 4.6 took the same terra dod to green for about $1.70 in the clean wave 1 (one run).
- **Repairs are cheap and mostly succeed.** A Gemini repair costs $0.20 to $1.22 and takes 2.5 to 3.6 minutes; 17 of 18 repairs left the build green. The one that did not was Gemini 3.1 Pro, the production repair model, without Lore.
- **Lore makes no consistent difference here.** With Lore, Flash's tdd rounds got cheaper ($0.80 against $1.26) and Argon's too ($2.22 against $2.94), but Gemini 3.1 Pro's got dearer ($2.60 against $1.68), and Flash's repairs cost six times more with Lore ($1.22 against $0.20). With three runs per cell and spreads of $0.40 to $1.10, none of these differences is clear of the noise.

**Codex models: pending.** The ChatGPT account hit its usage limit at about 02:30, so 67 Codex loops failed in seconds; they were discarded and rerun from 04:05, when the limit reset.
