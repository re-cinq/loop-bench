# Which model runs each implementation-loop station best

**For people choosing the model behind one of Lore's agents.** Results of `trpc` as of 2026-10-20 15:28 UTC: 17 loops over 6 cells on trpc/trpc, prompts from lore `aa562bb4`.

## Why we measured

The implementation loop's stations (`dod`, `tdd-round`, `repair-build`) each run on a model nobody chose by measurement. This bench replays merged tickets from their base commit with each harness and model, with and without the Lore MCP server, and repeats every cell so a lucky run shows as spread rather than as a rank.

## Results

Each row is one cell: one station varied against the production baseline, every other station at baseline. Each ticket carries its complexity: small (the merged change touched 1 production file, under 20 lines), medium (a few files, ~100 lines) or large (many files across modules). Rows are sorted by model name; cells that have not finished a loop yet show as running or not run yet. Values are the mean over the cell's runs, with min–max and standard deviation in parentheses.

| Ticket | Station varied | Model (CLI) | Effort | Lore | Prompt | Runs | Reached green | Rounds | Cost per loop | Time per loop | Judge correctness | Judge completeness | Judge closeness | dod red→green | Files (Jaccard vs PR) | +/− lines |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| #3768 large | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.24 ($0.15–$0.34, sd $0.08) | 4.7 min (4.1 min–5.7 min, sd 0.7 min) | 2.7 (2.0–3.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | — | 5 (5–5, sd 0) (0.19 (0.19–0.19, sd 0.00)) | +420/−0 |
| #3768 large | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $1.33 ($1.03–$1.80, sd $0.33) | 9.4 min (4.7 min–14.3 min, sd 3.9 min) | 3.0 (3.0–3.0, sd 0.0) | 4.7 (4.0–5.0, sd 0.5) | 3.0 (3.0–3.0, sd 0.0) | — | 5 (5–5, sd 0) (0.19 (0.19–0.19, sd 0.00)) | +373/−0 |
| #3768 large | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.98 ($0.91–$1.09, sd $0.08) | 8.6 min (7.5 min–9.9 min, sd 1.0 min) | 3.0 (3.0–3.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | — | 5 (5–5, sd 0) (0.19 (0.19–0.19, sd 0.00)) | +483/−0 |
| #3768 large | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #3768 large | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 5.3 (5.0–6.0, sd 0.5) | $2.85 ($2.00–$3.34, sd $0.60) | 34.1 min (29.3 min–39.9 min, sd 4.4 min) | 2.7 (2.0–4.0, sd 0.9) | 4.7 (4.0–5.0, sd 0.5) | 2.3 (2.0–3.0, sd 0.5) | — | 12 (9–15, sd 2) (0.13 (0.12–0.15, sd 0.01)) | +759/−72 |
| #3768 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 2.0 (1.0–3.0, sd 0.8) | $4.44 ($3.44–$5.11, sd $0.72) | 26.7 min (17.0 min–34.0 min, sd 7.2 min) | 2.7 (2.0–3.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | — | 7 (5–10, sd 2) (0.15 (0.11–0.19, sd 0.03)) | +492/−0 |
| #3768 large | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 2 | 2/2 | 3.0 (3.0–3.0, sd 0.0) | $3.27 ($3.23–$3.31, sd $0.04) | 23.1 min (19.1 min–27.0 min, sd 4.0 min) | 4.0 (4.0–4.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | — | 5 (5–5, sd 0) (0.19 (0.19–0.19, sd 0.00)) | +636/−0 |

What the columns mean:

- **Effort**: the reasoning effort the varied agent ran at. Where the experiment set none, the CLI's default applies, inferred because no CLI reports it: claude code's documented default (high, medium on Opus 5.5, Sonnet 5.5 and Haiku 5.5; Haiku 4.5 has no thinking), the level gemini-cli 0.62 sends (high for the Gemini 3 models, nothing for Gemini 4 Argon, which then runs at the API's medium), and codex's per-model default from its model list.
- **Reached green**: the loop ended with the subject's CI checks passing on the pushed branch.
- **Rounds**: tdd rounds the loop spent (12 is the budget).
- **Cost**: every model's token counts at its standard market price per million tokens, read 2026-10-19 (`src/core/pricing.ts`). No launch or promotional discounts: Gemini 4 Argon is priced at its December rate and gpt-5.6-sol at its pre-promotion rate, so the numbers hold for a long-term decision. Claude and Codex runs used subscriptions; their dollar figures are what the same tokens cost on the API.
- **Judge**: a fixed model's 1–5 scores against the issue and the merged pull request.
- **dod red→green**: the agent's acceptance tests failed on the base commit and passed once the merged pull request's production code was applied.
- **Files (Jaccard vs PR)**: files the branch touched, and the overlap of that set with the merged pull request's.

### How the loops ended

| Ticket | Station varied | Model (CLI) | Lore | How the loops ended |
|---|---|---|---|---|
| #3768 large | repair-build | `gemini-3-flash-preview` (gemini) | without Lore | green ×3 |
| #3768 large | repair-build | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×3 |
| #3768 large | repair-build | `gemini-4-argon` (gemini) | without Lore | green ×2, excluded_harness ×1 |
| #3768 large | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | green ×3 |
| #3768 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×3 |
| #3768 large | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×2 |

## What we read in it

_No conclusions yet: too few loops have finished._

## What would improve it

_(written by hand from `analyze` and `propose`)_

## How it was run

- Prompts: the bodies of lore's `libs/shared/src/agent-defaults/loop-*.md` at `aa562bb4697daf30e6af4d9f7ac0c4ee8425de27`, with `/workspace` pointed at a local directory per run.
- Each run: a bare `origin` with `main` at the ticket's base commit; the subject's CI commands run locally on the pushed head between rounds.
- Agents: bare `claude`, `gemini` and `codex` CLIs under a scratch HOME with only credentials copied in.

## Limits

- Local CI is one Node version on one machine, not GitHub's matrix.
- Codex has no Bash guard, so its rounds may run acceptance tests the others are refused.
- In the `lore-mcp` arm every station of the loop has the Lore MCP server, the tdd rounds included, so a with-or-without difference is Lore's effect on the whole loop, not on the varied station alone.
- In the `lore-mcp` arm the Lore memory holds episodes from the real runs on these tickets.

