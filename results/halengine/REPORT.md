# Which model runs each implementation-loop station best

**For people choosing the model behind one of Lore's agents.** Results of `halengine` as of 2026-10-26 22:20 UTC: 732 loops over 229 cells on re-cinq/HALEngine, prompts from lore `aa562bb4`.

## Why we measured

The implementation loop's stations (`dod`, `tdd-round`, `repair-build`) each run on a model nobody chose by measurement. This bench replays merged tickets from their base commit with each harness and model, with and without the Lore MCP server, and repeats every cell so a lucky run shows as spread rather than as a rank.

## Results

Each row is one cell: one station varied against the production baseline, every other station at baseline. Each ticket carries its complexity: small (the merged change touched 1 production file, under 20 lines), medium (a few files, ~100 lines) or large (many files across modules). Rows are sorted by model name; cells that have not finished a loop yet show as running or not run yet. Values are the mean over the cell's runs, with min–max and standard deviation in parentheses.

| Ticket | Station varied | Model (CLI) | Effort | Lore | Prompt | Runs | Reached green | Rounds | Cost per loop | Time per loop | Judge correctness | Judge completeness | Judge closeness | dod red→green | Files (Jaccard vs PR) | +/− lines |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| #37 medium | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 0/3 | 0.0 (0.0–0.0, sd 0.0) | $3.81 ($0.04–$5.79, sd $2.67) | 1.1 min (0.8 min–1.3 min, sd 0.2 min) | — | — | — | 0/2 | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +109/−0 |
| #37 medium | dod | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.01 ($0.01–$0.02, sd $0.00) | 1.5 min (0.8 min–2.1 min, sd 0.5 min) | — | — | — | — | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +88/−0 |
| #37 medium | dod | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $2.09 ($0.03–$3.79, sd $1.55) | 1.6 min (1.3 min–1.8 min, sd 0.2 min) | — | — | — | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +391/−17 |
| #37 medium | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.01 ($0.01–$0.01, sd $0.00) | 1.6 min (0.9 min–2.3 min, sd 0.5 min) | — | — | — | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +371/−17 |
| #37 medium | repair-build | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.72 ($0.30–$1.56, sd $0.59) | 4.4 min (4.1 min–4.6 min, sd 0.2 min) | — | — | — | — | 11 (11–12, sd 0) (0.72 (0.69–0.77, sd 0.04)) | +536/−30 |
| #37 medium | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.60 ($0.29–$1.06, sd $0.33) | 4.7 min (3.5 min–5.9 min, sd 0.9 min) | — | — | — | — | 12 (11–14, sd 1) (0.75 (0.69–0.79, sd 0.04)) | +481/−24 |
| #37 medium | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.83 ($0.35–$1.39, sd $0.43) | 6.0 min (4.6 min–8.5 min, sd 1.8 min) | — | — | — | — | 11 (8–13, sd 2) (0.71 (0.46–0.85, sd 0.18)) | +458/−24 |
| #37 medium | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $1.13 ($0.56–$1.69, sd $0.46) | 7.7 min (4.1 min–10.3 min, sd 2.6 min) | — | — | — | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +364/−17 |
| #37 medium | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $1.18 ($0.63–$1.72, sd $0.45) | 5.6 min (4.0 min–8.1 min, sd 1.8 min) | — | — | — | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +356/−17 |
| #37 medium | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $1.44 ($1.29–$1.70, sd $0.19) | 7.9 min (6.7 min–8.6 min, sd 0.8 min) | — | — | — | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +364/−17 |
| #37 medium | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $1.73 ($1.27–$1.99, sd $0.33) | 12.4 min (11.3 min–13.8 min, sd 1.0 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.5 (2.0–3.0, sd 0.5) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +385/−17 |
| #37 medium | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $2.78 ($1.80–$4.02, sd $0.93) | 16.5 min (12.4 min–21.2 min, sd 3.6 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | — | 10 (8–13, sd 2) (0.55 (0.46–0.71, sd 0.12)) | +454/−22 |
| #37 medium | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 3 | 1/3 | 0.7 (0.0–1.0, sd 0.5) | $2.64 ($1.40–$3.37, sd $0.88) | 14.2 min (11.0 min–19.2 min, sd 3.6 min) | 2.0 | 2.0 | 3.0 | — | 12 (8–14, sd 3) (0.68 (0.46–0.79, sd 0.15)) | +579/−25 |
| #37 medium | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 5 | 4/5 | 4.4 (2.0–6.0, sd 1.5) | $0.76 ($0.44–$1.02, sd $0.19) | 131.2 min (78.0 min–224.0 min, sd 57.0 min) | 4.4 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 14 (13–15, sd 1) (0.74 (0.71–0.79, sd 0.02)) | +643/−60 |
| #37 medium | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 1/3 | 10.3 (7.0–12.0, sd 2.4) | $0.40 ($0.24–$0.49, sd $0.11) | 21.3 min (17.5 min–23.6 min, sd 2.7 min) | — | — | — | — | 9 (8–11, sd 1) (0.45 (0.43–0.47, sd 0.02)) | +648/−16 |
| #37 medium | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 1/5 | 7.8 (2.0–12.0, sd 3.6) | $0.17 ($0.06–$0.24, sd $0.07) | 20.3 min (8.5 min–29.4 min, sd 7.0 min) | 3.2 (2.0–4.0, sd 0.7) | 3.2 (3.0–4.0, sd 0.4) | 3.2 (3.0–4.0, sd 0.4) | — | 10 (8–13, sd 2) (0.57 (0.46–0.77, sd 0.14)) | +522/−46 |
| #37 medium | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 1/3 | 9.0 (3.0–12.0, sd 4.2) | $7.21 ($2.34–$10.96, sd $3.61) | 37.4 min (15.3 min–56.0 min, sd 16.8 min) | 4.0 (4.0–4.0, sd 0.0) | 4.3 (3.0–5.0, sd 0.9) | 3.3 (3.0–4.0, sd 0.5) | — | 15 (13–17, sd 2) (0.68 (0.65–0.71, sd 0.03)) | +780/−151 |
| #37 medium | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 1/3 | 9.3 (4.0–12.0, sd 3.8) | $5.95 ($2.92–$7.93, sd $2.18) | 45.5 min (23.0 min–61.7 min, sd 16.4 min) | 4.3 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 17 (16–19, sd 1) (0.64 (0.58–0.69, sd 0.04)) | +737/−63 |
| #37 medium | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 0/3 | 12.0 (12.0–12.0, sd 0.0) | $7.64 ($4.86–$12.41, sd $3.39) | 76.3 min (40.2 min–94.8 min, sd 25.5 min) | 4.0 (4.0–4.0, sd 0.0) | 4.3 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 18 (17–19, sd 1) (0.62 (0.58–0.65, sd 0.03)) | +772/−55 |
| #37 medium | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 2/3 | 5.3 (5.0–6.0, sd 0.5) | $12.13 ($10.02–$14.44, sd $1.81) | 57.2 min (46.5 min–65.7 min, sd 8.0 min) | 3.3 (3.0–4.0, sd 0.5) | 3.0 (3.0–3.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | — | 12 (8–18, sd 4) (0.52 (0.46–0.61, sd 0.06)) | +585/−25 |
| #37 medium | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 2/3 | 5.7 (5.0–6.0, sd 0.5) | $11.96 ($8.70–$15.32, sd $2.70) | 53.6 min (41.6 min–61.6 min, sd 8.6 min) | 3.5 (3.0–4.0, sd 0.5) | 3.5 (3.0–4.0, sd 0.5) | 3.5 (3.0–4.0, sd 0.5) | — | 15 (14–16, sd 1) (0.75 (0.69–0.79, sd 0.05)) | +573/−36 |
| #37 medium | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 0/3 | 4.0 (0.0–12.0, sd 5.7) | $6.42 ($0.08–$19.06, sd $8.94) | 40.4 min (0.3 min–120.5 min, sd 56.7 min) | 2.0 (1.0–4.0, sd 1.4) | 2.0 (1.0–4.0, sd 1.4) | 2.3 (1.0–4.0, sd 1.2) | — | 8 (3–17, sd 7) (0.27 (0.08–0.65, sd 0.27)) | +359/−14 |
| #37 medium | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 2.0 (1.0–3.0, sd 0.8) | $11.53 ($6.88–$20.59, sd $6.40) | 47.6 min (24.0 min–83.6 min, sd 25.9 min) | 4.3 (4.0–5.0, sd 0.5) | 3.7 (2.0–5.0, sd 1.2) | 3.7 (3.0–4.0, sd 0.5) | — | 12 (8–14, sd 3) (0.68 (0.46–0.79, sd 0.15)) | +504/−20 |
| #37 medium | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 3 | 3/3 | 4.0 (3.0–6.0, sd 1.4) | $14.55 ($12.45–$16.01, sd $1.52) | 51.4 min (32.0 min–64.5 min, sd 14.0 min) | 4.7 (4.0–5.0, sd 0.5) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 15 (14–16, sd 1) (0.75 (0.69–0.79, sd 0.05)) | +640/−27 |
| #37 medium | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 2.0 (1.0–3.0, sd 0.8) | $8.85 ($6.48–$12.89, sd $2.87) | 35.5 min (27.3 min–51.2 min, sd 11.1 min) | 4.7 (4.0–5.0, sd 0.5) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 15 (14–15, sd 0) (0.75 (0.73–0.79, sd 0.02)) | +615/−32 |
| #93 small | baseline | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 1 | 1/1 | 3.0 | $9.66 | 60.5 min | 4.0 | 5.0 | 3.0 | 0/1 | 14 (0.40) | +268/−51 |
| #93 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 1 | 0/1 | 0.0 | $7.72 | 3.5 min | — | — | — | — | 3 (0.11) | +135/−2 |
| #93 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $5.50 ($3.79–$7.33, sd $1.35) | 1.7 min (1.4 min–2.5 min, sd 0.4 min) | — | — | — | — | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +191/−0 |
| #93 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $6.21 ($5.02–$9.56, sd $1.69) | 1.7 min (1.4 min–2.0 min, sd 0.2 min) | — | — | — | — | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +231/−0 |
| #93 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $6.62 ($4.58–$8.48, sd $1.62) | 1.7 min (1.5 min–2.0 min, sd 0.2 min) | — | — | — | — | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +204/−0 |
| #93 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 4 | 0/4 | 0.0 (0.0–0.0, sd 0.0) | $3.56 ($1.40–$5.18, sd $1.52) | 1.6 min (1.2 min–2.2 min, sd 0.4 min) | — | — | — | — | 2 (2–3, sd 0) (0.03 (0.00–0.11, sd 0.05)) | +124/−1 |
| #93 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $2.92 ($1.76–$4.73, sd $1.11) | 1.6 min (1.3 min–1.8 min, sd 0.2 min) | — | — | — | — | 2 (2–3, sd 0) (0.04 (0.00–0.11, sd 0.05)) | +113/−0 |
| #93 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $3.16 ($1.56–$7.21, sd $2.08) | 1.5 min (1.3 min–1.7 min, sd 0.1 min) | — | — | — | — | 2 (2–3, sd 0) (0.02 (0.00–0.11, sd 0.04)) | +118/−0 |
| #93 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 1 | 0/1 | 0.0 | $5.77 | 1.3 min | — | — | — | — | 3 (0.11) | +109/−2 |
| #93 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 1 | 0/1 | 0.0 | $6.37 | 4.3 min | — | — | — | — | 2 (0.00) | +130/−0 |
| #93 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 1 | 0/1 | 0.0 | $2.76 | 1.0 min | — | — | — | — | 3 (0.11) | +84/−1 |
| #93 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 0/3 | 0.0 (0.0–0.0, sd 0.0) | $2.75 ($0.04–$4.28, sd $1.92) | 1.7 min (1.1 min–2.8 min, sd 0.8 min) | — | — | — | 1/1 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +113/−2 |
| #93 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 0/1 | 0.0 | $4.38 | 1.6 min | — | — | — | — | 3 (0.11) | +99/−1 |
| #93 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 1 | 0/1 | 0.0 | $2.06 | 3.1 min | — | — | — | — | 3 (0.11) | +121/−2 |
| #93 small | dod | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 1 | 0/1 | 0.0 | $5.43 | 1.7 min | — | — | — | — | 3 (0.11) | +126/−2 |
| #93 small | dod | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.45 ($0.01–$2.16, sd $0.86) | 1.5 min (0.9 min–1.9 min, sd 0.4 min) | — | — | — | — | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +95/−2 |
| #93 small | dod | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 1 | 0/1 | 0.0 | $5.92 | 1.5 min | — | — | — | — | 3 (0.11) | +106/−2 |
| #93 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 0/1 | 0.0 | $4.71 | 1.3 min | — | — | — | — | 3 (0.11) | +119/−2 |
| #93 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 1 | 0/1 | 0.0 | $4.67 | 2.2 min | — | — | — | — | 3 (0.11) | +168/−3 |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | no-traceability | 1 | 0/1 | 0.0 | $9.37 | 3.7 min | — | — | — | — | 2 (0.00) | +128/−0 |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | short | 1 | 0/1 | 0.0 | $8.30 | 3.2 min | — | — | — | — | 3 (0.11) | +127/−1 |
| #93 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 1 | 0/1 | 0.0 | $5.84 | 7.8 min | — | — | — | — | 3 (0.11) | +104/−2 |
| #93 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.56 ($0.23–$1.52, sd $0.48) | 4.7 min (2.0 min–12.5 min, sd 3.9 min) | 4.3 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +147/−5 |
| #93 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 4 | 2/4 | 0.5 (0.0–1.0, sd 0.5) | $0.54 ($0.25–$0.84, sd $0.28) | 2.9 min (2.5 min–3.7 min, sd 0.5 min) | 5.0 | 4.0 | 4.0 | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +151/−5 |
| #93 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.48 ($0.17–$1.01, sd $0.38) | 2.8 min (1.8 min–5.3 min, sd 1.3 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 3.5 (3.0–4.0, sd 0.5) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +151/−5 |
| #93 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.06 ($0.05–$0.08, sd $0.01) | 1.1 min (0.9 min–1.3 min, sd 0.1 min) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.7 (3.0–4.0, sd 0.5) | — | 7 (7–8, sd 0) (0.29 (0.27–0.36, sd 0.04)) | +148/−5 |
| #93 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 4 | 3/4 | 0.3 (0.0–1.0, sd 0.4) | $0.14 ($0.04–$0.39, sd $0.14) | 2.1 min (1.2 min–3.7 min, sd 1.0 min) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +146/−5 |
| #93 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 4/5 | 0.2 (0.0–1.0, sd 0.4) | $0.20 ($0.05–$0.78, sd $0.29) | 1.3 min (0.9 min–2.6 min, sd 0.6 min) | 4.5 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +145/−5 |
| #93 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.03 ($0.03–$0.04, sd $0.00) | 1.7 min (1.2 min–2.4 min, sd 0.5 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +143/−5 |
| #93 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.02 ($0.02–$0.02, sd $0.00) | 1.5 min (1.2 min–1.7 min, sd 0.2 min) | — | — | — | — | 7 (7–8, sd 0) (0.30 (0.27–0.36, sd 0.04)) | +144/−5 |
| #93 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 1/3 | 0.7 (0.0–1.0, sd 0.5) | $0.02 ($0.02–$0.02, sd $0.00) | 1.2 min (0.9 min–1.7 min, sd 0.3 min) | 4.0 | 4.0 | 4.0 | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +144/−5 |
| #93 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.32 ($0.31–$0.32, sd $0.01) | 1.6 min (1.0 min–2.5 min, sd 0.7 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 3.5 (3.0–4.0, sd 0.5) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +141/−5 |
| #93 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.38 ($0.32–$0.48, sd $0.07) | 1.5 min (1.2 min–2.0 min, sd 0.3 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +142/−5 |
| #93 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.31 ($0.22–$0.40, sd $0.08) | 1.4 min (1.0 min–1.7 min, sd 0.3 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +142/−5 |
| #93 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.16 ($0.14–$0.18, sd $0.02) | 2.3 min (1.4 min–3.8 min, sd 1.0 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +144/−5 |
| #93 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.16 ($0.14–$0.17, sd $0.01) | 2.4 min (1.6 min–2.9 min, sd 0.6 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +144/−5 |
| #93 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.12 ($0.11–$0.13, sd $0.01) | 1.3 min (0.8 min–1.6 min, sd 0.4 min) | — | — | — | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +141/−5 |
| #93 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.49 ($0.36–$0.71, sd $0.16) | 2.3 min (1.0 min–4.4 min, sd 1.5 min) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.7 (3.0–4.0, sd 0.5) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +145/−5 |
| #93 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.59 ($0.39–$0.69, sd $0.14) | 1.7 min (1.5 min–1.8 min, sd 0.2 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +144/−5 |
| #93 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.47 ($0.43–$0.49, sd $0.03) | 1.7 min (1.5 min–1.8 min, sd 0.1 min) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +146/−5 |
| #93 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.01 ($0.01–$0.01, sd $0.00) | 2.0 min (1.0 min–3.5 min, sd 1.1 min) | — | — | — | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +141/−5 |
| #93 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.01 ($0.01–$0.01, sd $0.00) | 2.1 min (1.4 min–3.0 min, sd 0.6 min) | — | — | — | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +143/−5 |
| #93 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $0.01 ($0.00–$0.01, sd $0.00) | 1.3 min (1.0 min–1.7 min, sd 0.3 min) | 4.5 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.5 (3.0–4.0, sd 0.5) | — | 7 (7–8, sd 0) (0.29 (0.27–0.36, sd 0.04)) | +141/−5 |
| #93 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 3 | 1/3 | 0.7 (0.0–1.0, sd 0.5) | $0.15 ($0.12–$0.17, sd $0.02) | 2.0 min (1.3 min–2.4 min, sd 0.5 min) | 5.0 | 4.0 | 4.0 | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +143/−5 |
| #93 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 3 | 1/3 | 0.7 (0.0–1.0, sd 0.5) | $0.15 ($0.12–$0.19, sd $0.03) | 2.4 min (1.6 min–3.5 min, sd 0.8 min) | 4.0 | 4.0 | 4.0 | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +142/−5 |
| #93 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 3 | 1/3 | 0.7 (0.0–1.0, sd 0.5) | $0.14 ($0.12–$0.16, sd $0.02) | 1.5 min (1.3 min–1.7 min, sd 0.1 min) | 4.0 | 4.0 | 3.0 | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +142/−5 |
| #93 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.09 ($0.07–$0.11, sd $0.02) | 2.0 min (0.9 min–3.6 min, sd 1.2 min) | 4.3 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +144/−5 |
| #93 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.09 ($0.07–$0.11, sd $0.02) | 1.5 min (1.1 min–1.8 min, sd 0.3 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +144/−5 |
| #93 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.06 ($0.05–$0.07, sd $0.01) | 1.3 min (1.2 min–1.5 min, sd 0.1 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 3.7 (3.0–4.0, sd 0.5) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +144/−5 |
| #93 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.85 ($0.21–$2.77, sd $0.97) | 3.5 min (3.0 min–4.7 min, sd 0.7 min) | 4.8 (4.0–5.0, sd 0.4) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (7–16, sd 4) (0.34 (0.25–0.45, sd 0.07)) | +175/−26 |
| #93 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $0.34 ($0.09–$1.24, sd $0.45) | 2.3 min (1.5 min–3.5 min, sd 0.7 min) | 4.5 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (7–11, sd 2) (0.27 (0.20–0.33, sd 0.04)) | +148/−8 |
| #93 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.35 ($0.07–$1.09, sd $0.39) | 2.6 min (1.3 min–4.6 min, sd 1.2 min) | 5.0 (5.0–5.0, sd 0.0) | 4.4 (4.0–5.0, sd 0.5) | 4.2 (4.0–5.0, sd 0.4) | — | 8 (7–14, sd 3) (0.28 (0.27–0.31, sd 0.02)) | +147/−8 |
| #93 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.58 ($0.44–$0.74, sd $0.11) | 3.4 min (2.9 min–3.7 min, sd 0.3 min) | 4.8 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +146/−5 |
| #93 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.75 ($0.44–$1.10, sd $0.25) | 5.8 min (3.2 min–11.0 min, sd 2.8 min) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–8, sd 0) (0.29 (0.27–0.36, sd 0.04)) | +147/−5 |
| #93 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 4/5 | 0.2 (0.0–1.0, sd 0.4) | $0.78 ($0.46–$1.04, sd $0.20) | 4.2 min (2.5 min–6.5 min, sd 1.4 min) | 4.5 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +147/−5 |
| #93 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.68 ($0.49–$0.96, sd $0.18) | 4.5 min (2.1 min–10.7 min, sd 3.2 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–8, sd 0) (0.29 (0.27–0.36, sd 0.04)) | +144/−5 |
| #93 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.81 ($0.68–$0.95, sd $0.09) | 6.6 min (3.4 min–8.9 min, sd 2.3 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–8, sd 0) (0.29 (0.27–0.36, sd 0.04)) | +145/−5 |
| #93 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.54 ($0.47–$0.62, sd $0.05) | 3.8 min (2.2 min–7.1 min, sd 1.8 min) | 4.8 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +142/−5 |
| #93 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 5 | 5/5 | 1.4 (1.0–2.0, sd 0.5) | $0.64 ($0.46–$1.04, sd $0.21) | 9.6 min (5.1 min–14.5 min, sd 3.5 min) | 4.7 (4.0–5.0, sd 0.5) | 3.7 (3.0–4.0, sd 0.5) | 3.7 (3.0–4.0, sd 0.5) | — | 8 (7–10, sd 1) (0.41 (0.27–0.67, sd 0.17)) | +177/−11 |
| #93 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 4 | 4/4 | 1.0 (1.0–1.0, sd 0.0) | $0.56 ($0.52–$0.67, sd $0.06) | 8.4 min (4.8 min–11.6 min, sd 2.4 min) | 4.3 (4.0–5.0, sd 0.5) | 3.7 (3.0–4.0, sd 0.5) | 3.3 (3.0–4.0, sd 0.5) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +184/−7 |
| #93 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 5/5 | 1.6 (1.0–2.0, sd 0.5) | $0.83 ($0.30–$1.96, sd $0.58) | 8.8 min (6.0 min–14.3 min, sd 2.9 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 3.3 (3.0–4.0, sd 0.5) | — | 7 (7–9, sd 1) (0.34 (0.27–0.60, sd 0.13)) | +190/−10 |
| #93 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 5 | 4/5 | 1.6 (1.0–2.0, sd 0.5) | $0.23 ($0.14–$0.39, sd $0.09) | 5.5 min (3.0 min–7.5 min, sd 1.8 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 3.3 (3.0–4.0, sd 0.5) | — | 7 (7–9, sd 1) (0.28 (0.27–0.33, sd 0.02)) | +157/−7 |
| #93 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 4 | 3/4 | 1.8 (1.0–4.0, sd 1.3) | $0.25 ($0.13–$0.52, sd $0.16) | 5.0 min (2.2 min–7.8 min, sd 2.0 min) | 4.3 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 9 (7–13, sd 2) (0.43 (0.27–0.67, sd 0.15)) | +186/−18 |
| #93 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 4/5 | 2.4 (0.0–4.0, sd 1.4) | $0.26 ($0.03–$0.41, sd $0.13) | 6.2 min (2.3 min–10.8 min, sd 3.3 min) | 4.3 (4.0–5.0, sd 0.5) | 4.0 (3.0–5.0, sd 0.8) | 3.7 (3.0–4.0, sd 0.5) | — | 8 (6–12, sd 2) (0.36 (0.18–0.70, sd 0.18)) | +173/−14 |
| #93 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 5 | 5/5 | 1.0 (1.0–1.0, sd 0.0) | $0.18 ($0.15–$0.23, sd $0.02) | 23.0 min (17.9 min–25.1 min, sd 2.6 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (11–12, sd 0) (0.37 (0.36–0.38, sd 0.01)) | +171/−12 |
| #93 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 3 | 3/3 | 1.7 (1.0–3.0, sd 0.9) | $0.11 ($0.08–$0.14, sd $0.03) | 4.5 min (3.3 min–5.5 min, sd 0.9 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (10–11, sd 0) (0.40 (0.21–0.50, sd 0.13)) | +179/−13 |
| #93 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $0.13 ($0.10–$0.14, sd $0.02) | 4.6 min (3.3 min–6.5 min, sd 1.4 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (10–11, sd 0) (0.40 (0.21–0.50, sd 0.13)) | +222/−27 |
| #93 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 2/3 | 2.0 (1.0–3.0, sd 0.8) | $0.24 ($0.11–$0.50, sd $0.19) | 4.8 min (3.6 min–6.1 min, sd 1.0 min) | 4.5 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (11–11, sd 0) (0.50 (0.50–0.50, sd 0.00)) | +210/−32 |
| #93 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 3 | 3/3 | 2.0 (1.0–3.0, sd 0.8) | $2.27 ($1.52–$3.23, sd $0.72) | 7.8 min (4.1 min–13.8 min, sd 4.3 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 9 (7–11, sd 2) (0.30 (0.27–0.33, sd 0.03)) | +195/−7 |
| #93 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 3 | 3/3 | 2.0 (1.0–3.0, sd 0.8) | $2.90 ($1.81–$3.82, sd $0.83) | 7.9 min (4.9 min–12.3 min, sd 3.2 min) | 4.3 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 3.7 (3.0–4.0, sd 0.5) | — | 10 (10–11, sd 0) (0.49 (0.42–0.55, sd 0.05)) | +181/−18 |
| #93 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $1.99 ($1.45–$2.90, sd $0.65) | 5.7 min (4.1 min–8.2 min, sd 1.8 min) | 4.3 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 3.7 (3.0–4.0, sd 0.5) | — | 10 (9–12, sd 1) (0.46 (0.31–0.60, sd 0.12)) | +207/−20 |
| #93 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 3 | 3/3 | 1.7 (1.0–2.0, sd 0.5) | $1.12 ($0.58–$1.57, sd $0.41) | 9.4 min (7.4 min–11.4 min, sd 1.6 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (10–11, sd 0) (0.40 (0.21–0.50, sd 0.13)) | +191/−27 |
| #93 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 3 | 3/3 | 1.7 (1.0–2.0, sd 0.5) | $1.03 ($0.77–$1.18, sd $0.18) | 10.4 min (9.4 min–11.3 min, sd 0.8 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 10 (9–12, sd 1) (0.58 (0.55–0.60, sd 0.02)) | +199/−28 |
| #93 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 3 | 3/3 | 2.0 (2.0–2.0, sd 0.0) | $1.32 ($1.03–$1.62, sd $0.24) | 6.8 min (4.0 min–12.3 min, sd 3.8 min) | 4.3 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 10 (9–10, sd 0) (0.56 (0.55–0.60, sd 0.03)) | +196/−32 |
| #93 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $3.56 ($2.98–$3.87, sd $0.41) | 5.9 min (4.3 min–7.4 min, sd 1.3 min) | 4.3 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.3 (3.0–4.0, sd 0.5) | — | 10 (9–10, sd 0) (0.22 (0.21–0.23, sd 0.01)) | +210/−6 |
| #93 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $3.12 ($2.31–$4.07, sd $0.72) | 6.0 min (5.4 min–6.4 min, sd 0.4 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | — | 9 (9–10, sd 0) (0.23 (0.21–0.23, sd 0.01)) | +210/−9 |
| #93 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 3 | 0/3 | 0.0 (0.0–0.0, sd 0.0) | $0.82 ($0.53–$1.15, sd $0.26) | 0.9 min (0.7 min–1.1 min, sd 0.2 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 1.7 (1.0–2.0, sd 0.5) | — | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +121/−2 |
| #93 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 3 | 3/3 | 2.0 (1.0–3.0, sd 0.8) | $0.06 ($0.04–$0.09, sd $0.02) | 6.7 min (5.6 min–7.6 min, sd 0.8 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 9 (8–10, sd 1) (0.39 (0.25–0.60, sd 0.15)) | +217/−12 |
| #93 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 3 | 3/3 | 2.3 (1.0–4.0, sd 1.2) | $0.08 ($0.07–$0.09, sd $0.01) | 8.0 min (6.8 min–9.7 min, sd 1.2 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 9 (7–11, sd 2) (0.34 (0.25–0.50, sd 0.11)) | +216/−12 |
| #93 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 3/5 | 0.8 (0.0–2.0, sd 0.7) | $0.04 ($0.01–$0.05, sd $0.02) | 3.0 min (0.7 min–5.1 min, sd 1.9 min) | 3.4 (1.0–5.0, sd 2.0) | 3.8 (2.0–5.0, sd 1.5) | 3.2 (2.0–4.0, sd 1.0) | — | 6 (3–9, sd 3) (0.19 (0.11–0.25, sd 0.06)) | +174/−5 |
| #93 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $0.85 ($0.73–$0.98, sd $0.10) | 6.4 min (4.4 min–10.4 min, sd 2.8 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–9, sd 0) (0.28 (0.23–0.36, sd 0.06)) | +205/−10 |
| #93 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 3 | 3/3 | 2.0 (1.0–3.0, sd 0.8) | $1.07 ($0.92–$1.35, sd $0.20) | 9.1 min (8.7 min–9.7 min, sd 0.4 min) | 4.0 (4.0–4.0, sd 0.0) | 4.7 (4.0–5.0, sd 0.5) | 3.3 (3.0–4.0, sd 0.5) | — | 9 (8–10, sd 1) (0.23 (0.21–0.25, sd 0.01)) | +221/−7 |
| #93 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 3 | 3/3 | 2.0 (1.0–3.0, sd 0.8) | $1.04 ($0.71–$1.30, sd $0.25) | 6.6 min (4.4 min–7.7 min, sd 1.5 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (7–9, sd 1) (0.28 (0.23–0.33, sd 0.04)) | +225/−9 |
| #93 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $0.43 ($0.34–$0.50, sd $0.07) | 6.4 min (5.0 min–8.4 min, sd 1.4 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 3.3 (3.0–4.0, sd 0.5) | — | 9 (9–10, sd 0) (0.23 (0.21–0.23, sd 0.01)) | +192/−7 |
| #93 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $0.45 ($0.34–$0.58, sd $0.10) | 6.1 min (5.1 min–7.5 min, sd 1.0 min) | 4.0 (4.0–4.0, sd 0.0) | 3.7 (3.0–4.0, sd 0.5) | 2.7 (2.0–3.0, sd 0.5) | — | 9 (8–10, sd 1) (0.23 (0.21–0.25, sd 0.01)) | +192/−8 |
| #93 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 3 | 0/3 | 0.0 (0.0–0.0, sd 0.0) | $0.11 ($0.09–$0.13, sd $0.01) | 0.7 min (0.6 min–1.0 min, sd 0.1 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +121/−2 |
| #93 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 5 | 5/5 | 1.2 (1.0–2.0, sd 0.4) | $0.71 ($0.57–$1.12, sd $0.21) | 7.0 min (6.0 min–8.3 min, sd 1.0 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (3.0–5.0, sd 0.9) | 3.4 (2.0–4.0, sd 0.8) | — | 9 (7–11, sd 2) (0.36 (0.27–0.50, sd 0.09)) | +185/−14 |
| #93 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 5/5 | 2.2 (1.0–3.0, sd 0.7) | $0.91 ($0.58–$1.39, sd $0.38) | 10.9 min (6.9 min–14.2 min, sd 2.9 min) | 4.8 (4.0–5.0, sd 0.4) | 4.6 (4.0–5.0, sd 0.5) | 3.8 (3.0–4.0, sd 0.4) | — | 10 (7–15, sd 3) (0.37 (0.25–0.50, sd 0.10)) | +213/−20 |
| #93 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 2.4 (1.0–4.0, sd 1.0) | $1.26 ($0.52–$2.72, sd $0.82) | 10.6 min (6.2 min–17.0 min, sd 4.3 min) | 4.8 (4.0–5.0, sd 0.4) | 4.8 (4.0–5.0, sd 0.4) | 3.8 (3.0–4.0, sd 0.4) | — | 10 (7–13, sd 2) (0.33 (0.25–0.43, sd 0.07)) | +204/−20 |
| #93 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 5 | 5/5 | 1.0 (1.0–1.0, sd 0.0) | $2.15 ($1.17–$3.62, sd $0.83) | 11.8 min (7.7 min–17.2 min, sd 3.1 min) | 4.4 (3.0–5.0, sd 0.8) | 4.8 (4.0–5.0, sd 0.4) | 3.8 (3.0–4.0, sd 0.4) | — | 18 (6–63, sd 22) (0.31 (0.11–0.60, sd 0.16)) | +309/−129 |
| #93 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 5/5 | 1.0 (1.0–1.0, sd 0.0) | $1.90 ($1.59–$2.47, sd $0.31) | 10.8 min (8.0 min–12.9 min, sd 1.9 min) | 4.0 (3.0–5.0, sd 0.9) | 4.6 (4.0–5.0, sd 0.5) | 3.4 (2.0–4.0, sd 0.8) | — | 18 (5–61, sd 21) (0.37 (0.08–0.67, sd 0.21)) | +310/−127 |
| #93 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 1.0 (1.0–1.0, sd 0.0) | $1.98 ($1.38–$2.92, sd $0.58) | 11.5 min (7.6 min–17.4 min, sd 3.3 min) | 4.2 (3.0–5.0, sd 0.7) | 4.8 (4.0–5.0, sd 0.4) | 3.8 (3.0–4.0, sd 0.4) | — | 8 (5–9, sd 1) (0.46 (0.27–0.60, sd 0.14)) | +176/−11 |
| #93 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 5 | 5/5 | 0.4 (0.0–1.0, sd 0.5) | $2.48 ($1.59–$3.14, sd $0.59) | 10.4 min (4.9 min–17.7 min, sd 4.3 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.6 (4.0–5.0, sd 0.5) | — | 9 (8–10, sd 1) (0.74 (0.67–0.78, sd 0.05)) | +177/−13 |
| #93 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $3.20 ($1.49–$5.66, sd $1.61) | 12.4 min (6.1 min–18.7 min, sd 5.5 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.2 (4.0–5.0, sd 0.4) | — | 9 (9–9, sd 0) (0.65 (0.45–0.78, sd 0.16)) | +173/−15 |
| #93 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 0.2 (0.0–1.0, sd 0.4) | $2.36 ($0.91–$4.09, sd $1.08) | 10.1 min (4.4 min–18.6 min, sd 5.4 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (9–12, sd 1) (0.44 (0.36–0.78, sd 0.17)) | +170/−12 |
| #94 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 0/3 | 0.0 (0.0–0.0, sd 0.0) | $1.22 ($0.04–$2.63, sd $1.07) | 1.5 min (1.0 min–2.3 min, sd 0.6 min) | — | — | — | 1/1 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +72/−2 |
| #94 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.72 ($0.01–$3.55, sd $1.41) | 1.1 min (0.9 min–1.3 min, sd 0.2 min) | — | — | — | — | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +75/−2 |
| #94 small | dod | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 5 | 1/5 | 0.8 (0.0–1.0, sd 0.4) | $0.46 ($0.18–$0.77, sd $0.20) | 2.1 min (1.0 min–3.0 min, sd 0.7 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +147/−27 |
| #94 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 6 | 1/6 | 0.8 (0.0–1.0, sd 0.4) | $0.48 ($0.29–$0.76, sd $0.18) | 2.2 min (0.8 min–4.2 min, sd 1.4 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +156/−27 |
| #94 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.43 ($0.29–$0.83, sd $0.20) | 1.7 min (1.0 min–2.5 min, sd 0.6 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +147/−27 |
| #94 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.29 ($0.19–$0.61, sd $0.16) | 1.5 min (0.7 min–2.8 min, sd 0.7 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +137/−27 |
| #94 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 6 | 0/6 | 1.0 (1.0–1.0, sd 0.0) | $0.24 ($0.18–$0.31, sd $0.04) | 0.9 min (0.8 min–1.0 min, sd 0.1 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +137/−27 |
| #94 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.71 ($0.18–$1.62, sd $0.62) | 0.9 min (0.8 min–1.0 min, sd 0.1 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +140/−27 |
| #94 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.02 | 2.4 min | — | — | — | — | 8 (0.75) | +142/−27 |
| #94 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.08 ($0.02–$0.20, sd $0.08) | 2.3 min (0.8 min–3.0 min, sd 1.0 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +143/−27 |
| #94 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.29 | 1.2 min | — | — | — | — | 8 (0.75) | +142/−27 |
| #94 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 0/1 | 1.0 | $0.27 | 2.3 min | — | — | — | — | 8 (0.75) | +141/−27 |
| #94 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.15 | 1.4 min | — | — | — | — | 8 (0.75) | +134/−27 |
| #94 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 1 | 0/1 | 1.0 | $0.15 | 3.3 min | — | — | — | — | 8 (0.75) | +141/−27 |
| #94 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.53 | 2.6 min | — | — | — | — | 8 (0.75) | +144/−27 |
| #94 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 0.0 | $0.47 | 3.2 min | 5.0 | 5.0 | 5.0 | — | 8 (0.75) | +144/−27 |
| #94 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.01 | 2.1 min | — | — | — | — | 8 (0.75) | +142/−27 |
| #94 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.01 ($0.00–$0.01, sd $0.00) | 1.0 min (0.8 min–1.2 min, sd 0.1 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +140/−27 |
| #94 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.17 | 2.3 min | — | — | — | — | 8 (0.75) | +143/−27 |
| #94 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 1 | 0/1 | 1.0 | $0.16 | 3.0 min | — | — | — | — | 8 (0.75) | +143/−27 |
| #94 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.08 | 2.6 min | — | — | — | — | 8 (0.75) | +141/−27 |
| #94 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 0.0 | $0.07 | 2.2 min | 5.0 | 5.0 | 5.0 | — | 8 (0.75) | +141/−27 |
| #94 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 1/3 | 0.7 (0.0–1.0, sd 0.5) | $0.25 ($0.08–$0.40, sd $0.13) | 2.4 min (1.4 min–3.4 min, sd 0.8 min) | 5.0 | 5.0 | 5.0 | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +142/−27 |
| #94 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 1/3 | 0.7 (0.0–1.0, sd 0.5) | $0.21 ($0.10–$0.40, sd $0.13) | 1.7 min (1.3 min–2.0 min, sd 0.3 min) | 5.0 | 5.0 | 5.0 | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +147/−27 |
| #94 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.11 ($0.10–$0.13, sd $0.02) | 2.2 min (1.9 min–2.6 min, sd 0.3 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +142/−27 |
| #94 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.28 ($0.25–$0.31, sd $0.03) | 1.8 min (1.6 min–1.9 min, sd 0.1 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−27 |
| #94 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.24 ($0.21–$0.27, sd $0.02) | 1.8 min (1.7 min–1.9 min, sd 0.1 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +144/−27 |
| #94 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.28 ($0.20–$0.35, sd $0.06) | 2.2 min (2.0 min–2.3 min, sd 0.1 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +146/−27 |
| #94 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.52 ($0.45–$0.64, sd $0.09) | 3.8 min (2.4 min–4.7 min, sd 1.0 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +129/−27 |
| #94 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.48 ($0.35–$0.56, sd $0.09) | 2.7 min (1.9 min–3.7 min, sd 0.7 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +138/−27 |
| #94 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.66 ($0.46–$1.00, sd $0.24) | 3.4 min (3.0 min–4.0 min, sd 0.4 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +139/−27 |
| #94 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 5 | 5/5 | 2.6 (2.0–4.0, sd 0.8) | $0.86 ($0.57–$1.35, sd $0.29) | 10.0 min (7.2 min–16.5 min, sd 3.5 min) | 4.5 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–10, sd 2) (0.57 (0.38–0.75, sd 0.17)) | +140/−24 |
| #94 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 6 | 6/6 | 2.3 (2.0–3.0, sd 0.5) | $1.10 ($0.48–$2.66, sd $0.74) | 8.9 min (5.0 min–12.8 min, sd 3.1 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (5–17, sd 4) (0.50 (0.35–0.75, sd 0.18)) | +153/−31 |
| #94 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 5/5 | 1.8 (1.0–3.0, sd 0.7) | $1.00 ($0.62–$1.29, sd $0.25) | 8.8 min (5.3 min–12.9 min, sd 2.9 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.68 (0.38–0.75, sd 0.15)) | +135/−23 |
| #94 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 5 | 1/5 | 1.2 (1.0–2.0, sd 0.4) | $0.19 ($0.13–$0.24, sd $0.04) | 2.9 min (2.0 min–3.6 min, sd 0.7 min) | 3.0 (2.0–4.0, sd 1.0) | 3.5 (3.0–4.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–7, sd 1) (0.35 (0.30–0.38, sd 0.03)) | +113/−6 |
| #94 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.21 ($0.16–$0.25, sd $0.04) | 3.2 min (2.6 min–3.9 min, sd 0.5 min) | 3.5 (2.0–5.0, sd 1.5) | 4.5 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.60 (0.38–0.75, sd 0.18)) | +119/−11 |
| #94 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 2/5 | 1.0 (1.0–1.0, sd 0.0) | $0.17 ($0.13–$0.21, sd $0.03) | 2.8 min (2.1 min–3.9 min, sd 0.6 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–8, sd 1) (0.53 (0.38–0.75, sd 0.18)) | +107/−13 |
| #94 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 5 | 5/5 | 1.0 (1.0–1.0, sd 0.0) | $0.10 ($0.08–$0.13, sd $0.02) | 12.0 min (10.1 min–15.7 min, sd 2.0 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 5 (5–5, sd 0) (0.38 (0.38–0.38, sd 0.00)) | +96/−5 |
| #94 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 1 | 1/1 | 2.0 | $0.12 | 4.9 min | 5.0 | 5.0 | 4.0 | — | 8 (0.75) | +144/−29 |
| #94 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 3/3 | 3.0 (2.0–4.0, sd 0.8) | $0.14 ($0.10–$0.19, sd $0.04) | 9.1 min (4.4 min–15.3 min, sd 4.6 min) | 4.0 | 4.0 | 4.0 | — | 7 (6–8, sd 1) (0.46 (0.30–0.75, sd 0.20)) | +166/−14 |
| #94 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 3.0 | $2.46 | 9.0 min | 5.0 | 5.0 | 4.0 | — | 8 (0.75) | +156/−27 |
| #94 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 2.0 | $1.81 | 6.9 min | 5.0 | 5.0 | 4.0 | — | 8 (0.75) | +145/−29 |
| #94 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 2.0 | $0.81 | 7.3 min | 5.0 | 5.0 | 4.0 | — | 8 (0.75) | +147/−29 |
| #94 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $1.33 | 3.0 min | 1.0 | 2.0 | 2.0 | — | 3 (0.13) | +89/−1 |
| #94 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 1 | 0/1 | 0.0 | $0.86 | 1.5 min | 1.0 | 2.0 | 2.0 | — | 3 (0.13) | +89/−1 |
| #94 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.02 | 4.3 min | — | — | — | — | 5 (0.38) | +112/−4 |
| #94 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 4/5 | 1.4 (1.0–2.0, sd 0.5) | $0.03 ($0.03–$0.04, sd $0.01) | 4.5 min (2.7 min–5.8 min, sd 1.2 min) | 4.2 (4.0–5.0, sd 0.4) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–6, sd 0) (0.34 (0.33–0.38, sd 0.02)) | +139/−5 |
| #94 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.69 | 4.9 min | 4.0 | 3.0 | 3.0 | — | 6 (0.20) | +144/−3 |
| #94 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 1.0 | $0.67 | 5.8 min | 4.0 | 5.0 | 4.0 | — | 6 (0.33) | +173/−5 |
| #94 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.22 | 1.7 min | — | — | — | — | 3 (0.13) | +89/−1 |
| #94 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 0/1 | 0.0 | $0.18 | 3.0 min | 1.0 | 2.0 | 2.0 | — | 3 (0.13) | +89/−1 |
| #94 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $0.48 ($0.40–$0.62, sd $0.10) | 6.3 min (4.4 min–9.1 min, sd 2.0 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–8, sd 1) (0.54 (0.38–0.75, sd 0.16)) | +121/−12 |
| #94 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 3/3 | 2.0 (2.0–2.0, sd 0.0) | $0.80 ($0.45–$1.08, sd $0.26) | 6.4 min (5.5 min–7.4 min, sd 0.8 min) | 4.3 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–6, sd 0) (0.35 (0.33–0.38, sd 0.02)) | +139/−4 |
| #94 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $0.32 ($0.21–$0.44, sd $0.10) | 5.6 min (3.9 min–8.3 min, sd 1.9 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–8, sd 1) (0.49 (0.33–0.75, sd 0.19)) | +131/−13 |
| #94 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 1.0 (1.0–1.0, sd 0.0) | $2.03 ($1.58–$2.37, sd $0.33) | 10.5 min (9.0 min–11.4 min, sd 1.1 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.63 (0.38–0.75, sd 0.18)) | +137/−19 |
| #94 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $1.93 ($1.75–$2.11, sd $0.15) | 10.5 min (8.4 min–12.6 min, sd 1.7 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.63 (0.38–0.75, sd 0.18)) | +128/−19 |
| #94 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 1.7 (1.0–2.0, sd 0.5) | $2.01 ($1.64–$2.65, sd $0.46) | 14.7 min (11.2 min–18.3 min, sd 2.9 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.3 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +147/−27 |
| #94 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 2/3 | 1.3 (1.0–2.0, sd 0.5) | $2.08 ($1.60–$2.66, sd $0.44) | 11.3 min (5.4 min–15.1 min, sd 4.3 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +133/−27 |
| #94 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 3 | 3/3 | 1.7 (1.0–2.0, sd 0.5) | $3.05 ($2.14–$3.68, sd $0.66) | 14.5 min (9.4 min–21.3 min, sd 5.0 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.7 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +135/−31 |
| #94 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 1.0 (1.0–1.0, sd 0.0) | $2.85 ($1.88–$3.84, sd $0.80) | 16.3 min (11.4 min–23.5 min, sd 5.2 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (6–8, sd 1) (0.67 (0.50–0.75, sd 0.12)) | +134/−18 |
| #95 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 0/3 | 0.0 (0.0–0.0, sd 0.0) | $2.17 ($0.04–$3.30, sd $1.51) | 2.0 min (1.1 min–3.9 min, sd 1.3 min) | — | — | — | 1/1 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +84/−4 |
| #95 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.01 ($0.01–$0.01, sd $0.00) | 1.2 min (0.8 min–1.7 min, sd 0.3 min) | — | — | — | — | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +74/−3 |
| #95 small | dod | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.08 ($0.01–$0.22, sd $0.10) | 0.9 min (0.6 min–1.3 min, sd 0.3 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $0.01 ($0.00–$0.01, sd $0.00) | 0.9 min (0.8 min–1.2 min, sd 0.2 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 1/3 | 0.7 (0.0–1.0, sd 0.5) | $0.29 ($0.11–$0.41, sd $0.13) | 1.6 min (1.3 min–1.8 min, sd 0.2 min) | 5.0 | 5.0 | 4.0 | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +156/−24 |
| #95 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.07 ($0.05–$0.08, sd $0.01) | 2.2 min (1.5 min–3.0 min, sd 0.6 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.3 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.09 ($0.08–$0.12, sd $0.02) | 1.4 min (1.2 min–1.6 min, sd 0.2 min) | 4.5 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +156/−24 |
| #95 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.19 ($0.15–$0.24, sd $0.04) | 2.0 min (1.2 min–2.8 min, sd 0.7 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.17 ($0.16–$0.17, sd $0.01) | 1.9 min (1.6 min–2.6 min, sd 0.5 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.15 ($0.10–$0.21, sd $0.05) | 1.2 min (0.8 min–1.6 min, sd 0.3 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.23 ($0.22–$0.25, sd $0.01) | 2.8 min (2.2 min–3.2 min, sd 0.4 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +146/−24 |
| #95 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.27 ($0.21–$0.31, sd $0.04) | 3.0 min (1.8 min–3.8 min, sd 0.8 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +146/−24 |
| #95 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.20 ($0.14–$0.25, sd $0.04) | 1.7 min (1.4 min–2.0 min, sd 0.3 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +147/−24 |
| #95 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 5 | 5/5 | 1.8 (1.0–3.0, sd 0.7) | $0.19 ($0.09–$0.34, sd $0.10) | 31.2 min (13.2 min–65.7 min, sd 19.3 min) | 4.6 (4.0–5.0, sd 0.5) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (5–10, sd 2) (0.55 (0.30–0.75, sd 0.19)) | +188/−21 |
| #95 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 3/3 | 2.3 (1.0–4.0, sd 1.2) | $0.11 ($0.07–$0.14, sd $0.03) | 5.0 min (2.9 min–7.6 min, sd 1.9 min) | — | — | — | — | 7 (6–8, sd 1) (0.47 (0.33–0.75, sd 0.20)) | +180/−17 |
| #95 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 3/5 | 2.4 (0.0–5.0, sd 1.7) | $0.04 ($0.01–$0.08, sd $0.02) | 5.4 min (0.7 min–9.7 min, sd 3.0 min) | 3.8 (1.0–5.0, sd 1.5) | 3.6 (1.0–5.0, sd 1.4) | 3.6 (2.0–4.0, sd 0.8) | — | 6 (3–9, sd 2) (0.42 (0.13–0.67, sd 0.20)) | +165/−14 |
| #95 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $0.55 ($0.28–$0.76, sd $0.20) | 7.0 min (3.6 min–11.8 min, sd 3.5 min) | 4.0 (4.0–4.0, sd 0.0) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–7, sd 1) (0.34 (0.30–0.38, sd 0.03)) | +139/−8 |
| #95 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 3/3 | 3.7 (2.0–6.0, sd 1.7) | $1.53 ($1.17–$1.73, sd $0.25) | 14.6 min (7.3 min–18.4 min, sd 5.2 min) | 4.3 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–7, sd 1) (0.33 (0.30–0.38, sd 0.04)) | +167/−9 |
| #95 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 2.0 (1.0–3.0, sd 0.8) | $1.04 ($0.49–$2.09, sd $0.75) | 8.1 min (6.8 min–9.3 min, sd 1.0 min) | 4.3 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (6–8, sd 1) (0.30 (0.27–0.33, sd 0.02)) | +194/−10 |
| #95 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $2.82 ($2.40–$3.03, sd $0.29) | 20.5 min (15.7 min–26.9 min, sd 4.7 min) | 4.3 (4.0–5.0, sd 0.5) | 3.7 (3.0–4.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +163/−26 |
| #95 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $2.63 ($2.07–$3.12, sd $0.43) | 22.8 min (15.1 min–36.0 min, sd 9.4 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (8–17, sd 4) (0.62 (0.35–0.75, sd 0.19)) | +231/−56 |
| #95 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 1.0 (1.0–1.0, sd 0.0) | $2.02 ($1.59–$2.64, sd $0.45) | 10.8 min (8.9 min–12.1 min, sd 1.4 min) | 4.3 (4.0–5.0, sd 0.5) | 3.7 (3.0–4.0, sd 0.5) | 3.7 (3.0–4.0, sd 0.5) | — | 6 (5–8, sd 1) (0.54 (0.38–0.75, sd 0.16)) | +136/−14 |
| #95 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 1.0 (1.0–1.0, sd 0.0) | $1.87 ($1.48–$2.11, sd $0.27) | 11.9 min (8.9 min–17.2 min, sd 3.7 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +163/−24 |
| #95 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 3 | 3/3 | 1.0 (1.0–1.0, sd 0.0) | $1.94 ($1.34–$2.40, sd $0.44) | 16.0 min (7.9 min–20.7 min, sd 5.8 min) | 4.7 (4.0–5.0, sd 0.5) | 4.7 (4.0–5.0, sd 0.5) | 4.3 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +165/−24 |
| #95 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 1.0 (1.0–1.0, sd 0.0) | $2.06 ($1.71–$2.73, sd $0.47) | 10.7 min (9.0 min–12.7 min, sd 1.5 min) | 4.0 (3.0–5.0, sd 0.8) | 4.0 (3.0–5.0, sd 0.8) | 3.7 (3.0–4.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +162/−24 |
| #144 large | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 0/3 | 0.0 (0.0–0.0, sd 0.0) | $5.68 ($0.05–$16.12, sd $7.39) | 2.2 min (1.4 min–3.6 min, sd 1.0 min) | — | — | — | 0/3 | 2 (2–3, sd 0) (0.01 (0.00–0.04, sd 0.02)) | +169/−0 |
| #144 large | dod | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.03 ($0.02–$0.05, sd $0.01) | 3.2 min (1.9 min–5.4 min, sd 1.2 min) | — | — | — | — | 3 (3–3, sd 0) (0.04 (0.04–0.04, sd 0.00)) | +149/−28 |
| #144 large | dod | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 3 | 1/3 | 0.7 (0.0–1.0, sd 0.5) | $0.06 ($0.04–$0.07, sd $0.01) | 3.2 min (1.7 min–4.6 min, sd 1.2 min) | — | — | — | — | 17 (12–25, sd 6) (0.51 (0.28–0.96, sd 0.32)) | +617/−42 |
| #144 large | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $4.63 ($3.11–$7.12, sd $1.41) | 3.8 min (2.7 min–5.7 min, sd 1.0 min) | — | — | — | — | 11 (8–16, sd 3) (0.28 (0.23–0.38, sd 0.05)) | +394/−25 |
| #144 large | repair-build | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 2 | 0/2 | 1.0 (1.0–1.0, sd 0.0) | $0.99 ($0.56–$1.42, sd $0.43) | 5.9 min (4.8 min–6.9 min, sd 1.1 min) | — | — | — | — | 15 (14–15, sd 1) (0.35 (0.34–0.36, sd 0.01)) | +454/−60 |
| #144 large | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 2 | 0/2 | 1.0 (1.0–1.0, sd 0.0) | $0.59 ($0.54–$0.64, sd $0.05) | 6.2 min (5.6 min–6.8 min, sd 0.6 min) | — | — | — | — | 19 (18–20, sd 1) (0.46 (0.45–0.47, sd 0.01)) | +536/−83 |
| #144 large | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $1.11 ($0.99–$1.23, sd $0.10) | 11.8 min (7.9 min–17.0 min, sd 3.8 min) | — | — | — | — | 19 (18–19, sd 0) (0.49 (0.48–0.50, sd 0.01)) | +632/−115 |
| #144 large | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 2 | 0/2 | 1.0 (1.0–1.0, sd 0.0) | $3.05 ($2.60–$3.49, sd $0.44) | 19.3 min (10.3 min–28.3 min, sd 9.0 min) | — | — | — | — | 15 (14–16, sd 1) (0.34 (0.31–0.38, sd 0.03)) | +475/−106 |
| #144 large | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 2 | 0/2 | 1.0 (1.0–1.0, sd 0.0) | $2.80 ($2.67–$2.93, sd $0.13) | 14.1 min (13.1 min–15.2 min, sd 1.1 min) | — | — | — | — | 10 (8–12, sd 2) (0.26 (0.23–0.29, sd 0.03)) | +378/−23 |
| #144 large | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $2.58 ($1.73–$3.66, sd $0.81) | 17.7 min (12.8 min–24.3 min, sd 4.8 min) | — | — | — | — | 11 (8–12, sd 2) (0.27 (0.23–0.29, sd 0.03)) | +396/−35 |
| #144 large | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 2 | 2/2 | 0.0 (0.0–0.0, sd 0.0) | $3.66 ($3.13–$4.19, sd $0.53) | 19.1 min (15.8 min–22.4 min, sd 3.3 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 10 (10–10, sd 0) (0.31 (0.31–0.31, sd 0.00)) | +352/−17 |
| #144 large | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 2 | 1/2 | 0.5 (0.0–1.0, sd 0.5) | $2.40 ($2.20–$2.59, sd $0.19) | 12.8 min (12.2 min–13.3 min, sd 0.6 min) | 2.0 | 2.0 | 2.0 | — | 12 (10–13, sd 2) (0.31 (0.31–0.32, sd 0.01)) | +379/−20 |
| #144 large | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $3.42 ($1.30–$7.03, sd $2.56) | 11.0 min (10.9 min–11.1 min, sd 0.1 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 11 (10–12, sd 1) (0.33 (0.31–0.35, sd 0.02)) | +430/−38 |
| #144 large | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 2 | 1/2 | 8.5 (5.0–12.0, sd 3.5) | $0.52 ($0.31–$0.73, sd $0.21) | 31.2 min (15.8 min–46.6 min, sd 15.4 min) | — | — | — | — | 23 (17–28, sd 6) (0.41 (0.37–0.44, sd 0.04)) | +811/−154 |
| #144 large | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 2/5 | 3.0 (1.0–7.0, sd 2.3) | $0.10 ($0.03–$0.23, sd $0.08) | 11.8 min (3.1 min–25.9 min, sd 8.9 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | — | 12 (6–22, sd 6) (0.22 (0.15–0.28, sd 0.05)) | +419/−45 |
| #144 large | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 2 | 1/2 | 9.5 (7.0–12.0, sd 2.5) | $6.34 ($4.48–$8.19, sd $1.85) | 53.3 min (37.9 min–68.6 min, sd 15.4 min) | — | — | — | — | 35 (22–47, sd 13) (0.34 (0.29–0.39, sd 0.05)) | +1016/−218 |
| #144 large | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 2 | 1/2 | 9.0 (6.0–12.0, sd 3.0) | $7.98 ($4.71–$11.25, sd $3.27) | 87.6 min (40.8 min–134.4 min, sd 46.8 min) | — | — | — | — | 47 (26–67, sd 21) (0.29 (0.18–0.39, sd 0.10)) | +1254/−634 |
| #144 large | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 8.0 (3.0–12.0, sd 3.7) | $9.12 ($2.70–$14.11, sd $4.77) | 53.4 min (18.4 min–78.6 min, sd 25.5 min) | — | — | — | — | 28 (16–39, sd 9) (0.32 (0.30–0.33, sd 0.01)) | +865/−221 |
| #144 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 2 | 0/2 | 4.5 (3.0–6.0, sd 1.5) | $13.42 ($13.04–$13.79, sd $0.37) | 59.5 min (57.5 min–61.6 min, sd 2.1 min) | — | — | — | — | 18 (14–22, sd 4) (0.29 (0.28–0.31, sd 0.02)) | +611/−168 |
| #144 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 2 | 2/2 | 4.5 (4.0–5.0, sd 0.5) | $9.88 ($8.21–$11.55, sd $1.67) | 50.4 min (50.4 min–50.5 min, sd 0.0 min) | — | — | — | — | 25 (20–30, sd 5) (0.23 (0.20–0.26, sd 0.03)) | +708/−194 |
| #144 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 2.3 (2.0–3.0, sd 0.5) | $9.23 ($4.97–$13.04, sd $3.31) | 35.0 min (26.9 min–40.7 min, sd 5.9 min) | — | — | — | — | 18 (14–20, sd 3) (0.28 (0.26–0.31, sd 0.02)) | +691/−170 |
| #144 large | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 2 | 2/2 | 2.5 (2.0–3.0, sd 0.5) | $7.19 ($6.95–$7.43, sd $0.24) | 35.9 min (31.8 min–40.1 min, sd 4.2 min) | 3.0 (3.0–3.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 15 (15–15, sd 0) (0.30 (0.30–0.30, sd 0.00)) | +533/−30 |
| #144 large | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 2 | 2/2 | 4.0 (4.0–4.0, sd 0.0) | $8.06 ($7.34–$8.79, sd $0.72) | 32.1 min (31.7 min–32.6 min, sd 0.5 min) | — | — | — | — | 23 (22–24, sd 1) (0.24 (0.23–0.24, sd 0.01)) | +739/−209 |
| #144 large | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 2.3 (1.0–3.0, sd 0.9) | $7.07 ($5.38–$8.73, sd $1.37) | 32.5 min (28.0 min–37.0 min, sd 3.7 min) | — | — | — | — | 20 (19–22, sd 1) (0.26 (0.24–0.26, sd 0.01)) | +628/−129 |

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
| #37 medium | dod | `gpt-5.6-luna` (codex) | without Lore | station_done ×3 |
| #37 medium | dod | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #37 medium | repair-build | `gpt-5.6-luna` (codex) | without Lore | station_done ×3 |
| #37 medium | repair-build | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #37 medium | repair-build | `gemini-3-flash-preview` (gemini) | with Lore | station_done ×3 |
| #37 medium | repair-build | `gemini-3-flash-preview` (gemini) | Lore on Utopia | station_done ×3 |
| #37 medium | repair-build | `gemini-3-flash-preview` (gemini) | without Lore | station_done ×3 |
| #37 medium | repair-build | `gemini-3.1-pro-preview` (gemini) | with Lore | station_done ×3 |
| #37 medium | repair-build | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | station_done ×3 |
| #37 medium | repair-build | `gemini-3.1-pro-preview` (gemini) | without Lore | station_done ×3 |
| #37 medium | repair-build | `gemini-4-argon` (gemini) | with Lore | station_done ×1, green ×2 |
| #37 medium | repair-build | `gemini-4-argon` (gemini) | Lore on Utopia | green ×2, station_done ×1 |
| #37 medium | repair-build | `gemini-4-argon` (gemini) | without Lore | green ×1, station_done ×2 |
| #37 medium | tdd-round | `glm-5.3-flash` (claude) | without Lore | green ×4, retry_budget ×1 |
| #37 medium | tdd-round | `gpt-5.6-luna` (codex) | without Lore | round_budget ×2, green ×1 |
| #37 medium | tdd-round | `gpt-6-luna` (codex) | without Lore | retry_budget ×4, green ×1 |
| #37 medium | tdd-round | `gemini-3-flash-preview` (gemini) | with Lore | round_budget ×2, green ×1 |
| #37 medium | tdd-round | `gemini-3-flash-preview` (gemini) | Lore on Utopia | green ×1, round_budget ×2 |
| #37 medium | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | round_budget ×3 |
| #37 medium | tdd-round | `gemini-3.1-pro-preview` (gemini) | with Lore | retry_budget ×1, green ×2 |
| #37 medium | tdd-round | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×2, station_done ×1 |
| #37 medium | tdd-round | `gemini-3.1-pro-preview` (gemini) | without Lore | retry_budget ×2, round_budget ×1 |
| #37 medium | tdd-round | `gemini-4-argon` (gemini) | with Lore | green ×3 |
| #37 medium | tdd-round | `gemini-4-argon` (gemini) | Lore on Utopia | green ×3 |
| #37 medium | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×3 |
| #93 small | baseline | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×1 |
| #93 small | dod | `claude-fable-5-1` (claude) | without Lore | station_done ×1 |
| #93 small | dod | `claude-haiku-4-5-20251001` (claude) | with Lore | station_done ×5 |
| #93 small | dod | `claude-haiku-4-5-20251001` (claude) | Lore on Utopia | station_done ×5 |
| #93 small | dod | `claude-haiku-4-5-20251001` (claude) | without Lore | station_done ×5 |
| #93 small | dod | `claude-haiku-5-5` (claude) | with Lore | station_done ×4 |
| #93 small | dod | `claude-haiku-5-5` (claude) | Lore on Utopia | station_done ×5 |
| #93 small | dod | `claude-haiku-5-5` (claude) | without Lore | station_done ×5 |
| #93 small | dod | `claude-opus-5-5` (claude) | without Lore | station_done ×1 |
| #93 small | dod | `claude-sonnet-4-6` (claude) | without Lore | station_done ×1 |
| #93 small | dod | `claude-sonnet-5-5` (claude) | without Lore | station_done ×1 |
| #93 small | dod | `gpt-5.6-luna` (codex) | without Lore | station_done ×3 |
| #93 small | dod | `gpt-5.6-sol` (codex) | without Lore | station_done ×1 |
| #93 small | dod | `gpt-5.6-terra` (codex) | without Lore | station_done ×1 |
| #93 small | dod | `gpt-6-astra` (codex) | without Lore | station_done ×1 |
| #93 small | dod | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #93 small | dod | `gpt-6-sol` (codex) | without Lore | station_done ×1 |
| #93 small | dod | `gpt-6.1-sol` (codex) | without Lore | station_done ×1 |
| #93 small | dod | `gemini-3-flash-preview` (gemini) | without Lore | station_done ×1 |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | without Lore | station_done ×1 |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | without Lore | station_done ×1 |
| #93 small | dod | `gemini-4-argon` (gemini) | without Lore | station_done ×1 |
| #93 small | repair-build | `claude-haiku-4-5-20251001` (claude) | with Lore | green ×3, station_done ×2 |
| #93 small | repair-build | `claude-haiku-4-5-20251001` (claude) | Lore on Utopia | station_done ×2, green ×2 |
| #93 small | repair-build | `claude-haiku-4-5-20251001` (claude) | without Lore | green ×3, station_done ×2 |
| #93 small | repair-build | `claude-haiku-5-5` (claude) | with Lore | green ×5 |
| #93 small | repair-build | `claude-haiku-5-5` (claude) | Lore on Utopia | green ×3, station_done ×1 |
| #93 small | repair-build | `claude-haiku-5-5` (claude) | without Lore | green ×4, station_done ×1 |
| #93 small | repair-build | `gpt-5.6-luna` (codex) | with Lore | station_done ×1, green ×2 |
| #93 small | repair-build | `gpt-5.6-luna` (codex) | Lore on Utopia | station_done ×3 |
| #93 small | repair-build | `gpt-5.6-luna` (codex) | without Lore | station_done ×2, green ×1 |
| #93 small | repair-build | `gpt-5.6-sol` (codex) | with Lore | station_done ×1, green ×2 |
| #93 small | repair-build | `gpt-5.6-sol` (codex) | Lore on Utopia | green ×2, station_done ×1 |
| #93 small | repair-build | `gpt-5.6-sol` (codex) | without Lore | green ×2, station_done ×1 |
| #93 small | repair-build | `gpt-5.6-terra` (codex) | with Lore | green ×2, station_done ×1 |
| #93 small | repair-build | `gpt-5.6-terra` (codex) | Lore on Utopia | green ×2, station_done ×1 |
| #93 small | repair-build | `gpt-5.6-terra` (codex) | without Lore | station_done ×3 |
| #93 small | repair-build | `gpt-6-astra` (codex) | with Lore | green ×3 |
| #93 small | repair-build | `gpt-6-astra` (codex) | Lore on Utopia | green ×3 |
| #93 small | repair-build | `gpt-6-astra` (codex) | without Lore | green ×3 |
| #93 small | repair-build | `gpt-6-luna` (codex) | with Lore | station_done ×3 |
| #93 small | repair-build | `gpt-6-luna` (codex) | Lore on Utopia | station_done ×3 |
| #93 small | repair-build | `gpt-6-luna` (codex) | without Lore | station_done ×3, green ×2 |
| #93 small | repair-build | `gpt-6-sol` (codex) | with Lore | station_done ×2, green ×1 |
| #93 small | repair-build | `gpt-6-sol` (codex) | Lore on Utopia | station_done ×2, green ×1 |
| #93 small | repair-build | `gpt-6-sol` (codex) | without Lore | green ×1, station_done ×2 |
| #93 small | repair-build | `gpt-6.1-sol` (codex) | with Lore | green ×3 |
| #93 small | repair-build | `gpt-6.1-sol` (codex) | Lore on Utopia | green ×3 |
| #93 small | repair-build | `gpt-6.1-sol` (codex) | without Lore | green ×3 |
| #93 small | repair-build | `gemini-3-flash-preview` (gemini) | with Lore | green ×5 |
| #93 small | repair-build | `gemini-3-flash-preview` (gemini) | Lore on Utopia | green ×2, station_done ×3 |
| #93 small | repair-build | `gemini-3-flash-preview` (gemini) | without Lore | green ×5 |
| #93 small | repair-build | `gemini-3.1-pro-preview` (gemini) | with Lore | green ×5 |
| #93 small | repair-build | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×5 |
| #93 small | repair-build | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×4, station_done ×1 |
| #93 small | repair-build | `gemini-4-argon` (gemini) | with Lore | green ×5 |
| #93 small | repair-build | `gemini-4-argon` (gemini) | Lore on Utopia | green ×5 |
| #93 small | repair-build | `gemini-4-argon` (gemini) | without Lore | green ×5 |
| #93 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | with Lore | green ×5 |
| #93 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | Lore on Utopia | green ×4 |
| #93 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | without Lore | green ×5 |
| #93 small | tdd-round | `claude-haiku-5-5` (claude) | with Lore | green ×4, retry_budget ×1 |
| #93 small | tdd-round | `claude-haiku-5-5` (claude) | Lore on Utopia | green ×3, retry_budget ×1 |
| #93 small | tdd-round | `claude-haiku-5-5` (claude) | without Lore | green ×4, retry_budget ×1 |
| #93 small | tdd-round | `glm-5.3-flash` (claude) | without Lore | green ×5 |
| #93 small | tdd-round | `gpt-5.6-luna` (codex) | with Lore | green ×3 |
| #93 small | tdd-round | `gpt-5.6-luna` (codex) | Lore on Utopia | green ×3 |
| #93 small | tdd-round | `gpt-5.6-luna` (codex) | without Lore | green ×2, station_done ×1 |
| #93 small | tdd-round | `gpt-5.6-sol` (codex) | with Lore | green ×3 |
| #93 small | tdd-round | `gpt-5.6-sol` (codex) | Lore on Utopia | green ×3 |
| #93 small | tdd-round | `gpt-5.6-sol` (codex) | without Lore | green ×3 |
| #93 small | tdd-round | `gpt-5.6-terra` (codex) | with Lore | green ×3 |
| #93 small | tdd-round | `gpt-5.6-terra` (codex) | Lore on Utopia | green ×3 |
| #93 small | tdd-round | `gpt-5.6-terra` (codex) | without Lore | green ×3 |
| #93 small | tdd-round | `gpt-6-astra` (codex) | with Lore | green ×3 |
| #93 small | tdd-round | `gpt-6-astra` (codex) | Lore on Utopia | green ×3 |
| #93 small | tdd-round | `gpt-6-astra` (codex) | without Lore | retry_budget ×3 |
| #93 small | tdd-round | `gpt-6-luna` (codex) | with Lore | green ×3 |
| #93 small | tdd-round | `gpt-6-luna` (codex) | Lore on Utopia | green ×3 |
| #93 small | tdd-round | `gpt-6-luna` (codex) | without Lore | green ×3, retry_budget ×2 |
| #93 small | tdd-round | `gpt-6-sol` (codex) | with Lore | green ×3 |
| #93 small | tdd-round | `gpt-6-sol` (codex) | Lore on Utopia | green ×3 |
| #93 small | tdd-round | `gpt-6-sol` (codex) | without Lore | green ×3 |
| #93 small | tdd-round | `gpt-6.1-sol` (codex) | with Lore | green ×3 |
| #93 small | tdd-round | `gpt-6.1-sol` (codex) | Lore on Utopia | green ×3 |
| #93 small | tdd-round | `gpt-6.1-sol` (codex) | without Lore | retry_budget ×3 |
| #93 small | tdd-round | `gemini-3-flash-preview` (gemini) | with Lore | green ×5 |
| #93 small | tdd-round | `gemini-3-flash-preview` (gemini) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | green ×5 |
| #93 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | with Lore | green ×5 |
| #93 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×5 |
| #93 small | tdd-round | `gemini-4-argon` (gemini) | with Lore | green ×5 |
| #93 small | tdd-round | `gemini-4-argon` (gemini) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×5 |
| #94 small | dod | `gpt-5.6-luna` (codex) | without Lore | station_done ×3 |
| #94 small | dod | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #94 small | repair-build | `claude-haiku-4-5-20251001` (claude) | with Lore | station_done ×4, green ×1 |
| #94 small | repair-build | `claude-haiku-4-5-20251001` (claude) | Lore on Utopia | green ×1, station_done ×5 |
| #94 small | repair-build | `claude-haiku-4-5-20251001` (claude) | without Lore | station_done ×5 |
| #94 small | repair-build | `claude-haiku-5-5` (claude) | with Lore | station_done ×5 |
| #94 small | repair-build | `claude-haiku-5-5` (claude) | Lore on Utopia | station_done ×6 |
| #94 small | repair-build | `claude-haiku-5-5` (claude) | without Lore | station_done ×5 |
| #94 small | repair-build | `gpt-5.6-luna` (codex) | with Lore | station_done ×1 |
| #94 small | repair-build | `gpt-5.6-luna` (codex) | without Lore | station_done ×3 |
| #94 small | repair-build | `gpt-5.6-sol` (codex) | with Lore | station_done ×1 |
| #94 small | repair-build | `gpt-5.6-sol` (codex) | without Lore | station_done ×1 |
| #94 small | repair-build | `gpt-5.6-terra` (codex) | with Lore | station_done ×1 |
| #94 small | repair-build | `gpt-5.6-terra` (codex) | without Lore | station_done ×1 |
| #94 small | repair-build | `gpt-6-astra` (codex) | with Lore | green ×1 |
| #94 small | repair-build | `gpt-6-astra` (codex) | without Lore | green ×1 |
| #94 small | repair-build | `gpt-6-luna` (codex) | with Lore | station_done ×1 |
| #94 small | repair-build | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #94 small | repair-build | `gpt-6-sol` (codex) | with Lore | station_done ×1 |
| #94 small | repair-build | `gpt-6-sol` (codex) | without Lore | station_done ×1 |
| #94 small | repair-build | `gpt-6.1-sol` (codex) | with Lore | green ×1 |
| #94 small | repair-build | `gpt-6.1-sol` (codex) | without Lore | green ×1 |
| #94 small | repair-build | `gemini-3-flash-preview` (gemini) | with Lore | green ×1, station_done ×2 |
| #94 small | repair-build | `gemini-3-flash-preview` (gemini) | Lore on Utopia | station_done ×2, green ×1 |
| #94 small | repair-build | `gemini-3-flash-preview` (gemini) | without Lore | green ×3 |
| #94 small | repair-build | `gemini-3.1-pro-preview` (gemini) | with Lore | station_done ×3 |
| #94 small | repair-build | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | station_done ×3 |
| #94 small | repair-build | `gemini-3.1-pro-preview` (gemini) | without Lore | station_done ×3 |
| #94 small | repair-build | `gemini-4-argon` (gemini) | with Lore | green ×3 |
| #94 small | repair-build | `gemini-4-argon` (gemini) | Lore on Utopia | green ×2, station_done ×1 |
| #94 small | repair-build | `gemini-4-argon` (gemini) | without Lore | green ×2, station_done ×1 |
| #94 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | with Lore | green ×5 |
| #94 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | Lore on Utopia | green ×6 |
| #94 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | without Lore | green ×5 |
| #94 small | tdd-round | `claude-haiku-5-5` (claude) | with Lore | retry_budget ×4, green ×1 |
| #94 small | tdd-round | `claude-haiku-5-5` (claude) | Lore on Utopia | retry_budget ×5 |
| #94 small | tdd-round | `claude-haiku-5-5` (claude) | without Lore | retry_budget ×3, green ×2 |
| #94 small | tdd-round | `glm-5.3-flash` (claude) | without Lore | green ×5 |
| #94 small | tdd-round | `gpt-5.6-luna` (codex) | with Lore | green ×1 |
| #94 small | tdd-round | `gpt-5.6-luna` (codex) | without Lore | green ×3 |
| #94 small | tdd-round | `gpt-5.6-sol` (codex) | with Lore | green ×1 |
| #94 small | tdd-round | `gpt-5.6-sol` (codex) | without Lore | green ×1 |
| #94 small | tdd-round | `gpt-5.6-terra` (codex) | without Lore | green ×1 |
| #94 small | tdd-round | `gpt-6-astra` (codex) | with Lore | retry_budget ×1 |
| #94 small | tdd-round | `gpt-6-astra` (codex) | without Lore | retry_budget ×1 |
| #94 small | tdd-round | `gpt-6-luna` (codex) | with Lore | retry_budget ×1 |
| #94 small | tdd-round | `gpt-6-luna` (codex) | without Lore | green ×4, retry_budget ×1 |
| #94 small | tdd-round | `gpt-6-sol` (codex) | with Lore | retry_budget ×1 |
| #94 small | tdd-round | `gpt-6-sol` (codex) | without Lore | green ×1 |
| #94 small | tdd-round | `gpt-6.1-sol` (codex) | with Lore | retry_budget ×1 |
| #94 small | tdd-round | `gpt-6.1-sol` (codex) | without Lore | retry_budget ×1 |
| #94 small | tdd-round | `gemini-3-flash-preview` (gemini) | with Lore | green ×3 |
| #94 small | tdd-round | `gemini-3-flash-preview` (gemini) | Lore on Utopia | green ×3 |
| #94 small | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | green ×3 |
| #94 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | with Lore | green ×3 |
| #94 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×3 |
| #94 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×3 |
| #94 small | tdd-round | `gemini-4-argon` (gemini) | with Lore | green ×2, retry_budget ×1 |
| #94 small | tdd-round | `gemini-4-argon` (gemini) | Lore on Utopia | green ×3 |
| #94 small | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×3 |
| #95 small | dod | `gpt-5.6-luna` (codex) | without Lore | station_done ×3 |
| #95 small | dod | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #95 small | repair-build | `gpt-5.6-luna` (codex) | without Lore | green ×2, station_done ×1 |
| #95 small | repair-build | `gpt-6-luna` (codex) | without Lore | station_done ×3, green ×2 |
| #95 small | repair-build | `gemini-3-flash-preview` (gemini) | with Lore | station_done ×2, green ×1 |
| #95 small | repair-build | `gemini-3-flash-preview` (gemini) | Lore on Utopia | green ×3 |
| #95 small | repair-build | `gemini-3-flash-preview` (gemini) | without Lore | green ×2, station_done ×1 |
| #95 small | repair-build | `gemini-3.1-pro-preview` (gemini) | with Lore | green ×3 |
| #95 small | repair-build | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×3 |
| #95 small | repair-build | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×3 |
| #95 small | repair-build | `gemini-4-argon` (gemini) | with Lore | green ×2, station_done ×1 |
| #95 small | repair-build | `gemini-4-argon` (gemini) | Lore on Utopia | station_done ×3 |
| #95 small | repair-build | `gemini-4-argon` (gemini) | without Lore | station_done ×3 |
| #95 small | tdd-round | `glm-5.3-flash` (claude) | without Lore | green ×5 |
| #95 small | tdd-round | `gpt-5.6-luna` (codex) | without Lore | green ×3 |
| #95 small | tdd-round | `gpt-6-luna` (codex) | without Lore | green ×3, retry_budget ×2 |
| #95 small | tdd-round | `gemini-3-flash-preview` (gemini) | with Lore | green ×3 |
| #95 small | tdd-round | `gemini-3-flash-preview` (gemini) | Lore on Utopia | green ×3 |
| #95 small | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | green ×3 |
| #95 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | with Lore | green ×3 |
| #95 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×3 |
| #95 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×3 |
| #95 small | tdd-round | `gemini-4-argon` (gemini) | with Lore | green ×3 |
| #95 small | tdd-round | `gemini-4-argon` (gemini) | Lore on Utopia | green ×3 |
| #95 small | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×3 |
| #144 large | dod | `gpt-5.6-luna` (codex) | without Lore | station_done ×3 |
| #144 large | dod | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #144 large | repair-build | `gpt-5.6-luna` (codex) | without Lore | green ×1, station_done ×2 |
| #144 large | repair-build | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #144 large | repair-build | `gemini-3-flash-preview` (gemini) | with Lore | station_done ×2 |
| #144 large | repair-build | `gemini-3-flash-preview` (gemini) | Lore on Utopia | station_done ×2 |
| #144 large | repair-build | `gemini-3-flash-preview` (gemini) | without Lore | station_done ×3 |
| #144 large | repair-build | `gemini-3.1-pro-preview` (gemini) | with Lore | station_done ×2 |
| #144 large | repair-build | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | station_done ×2 |
| #144 large | repair-build | `gemini-3.1-pro-preview` (gemini) | without Lore | station_done ×3 |
| #144 large | repair-build | `gemini-4-argon` (gemini) | with Lore | green ×2 |
| #144 large | repair-build | `gemini-4-argon` (gemini) | Lore on Utopia | station_done ×1, green ×1 |
| #144 large | repair-build | `gemini-4-argon` (gemini) | without Lore | green ×2, station_done ×1 |
| #144 large | tdd-round | `gpt-5.6-luna` (codex) | without Lore | green ×1, round_budget ×1 |
| #144 large | tdd-round | `gpt-6-luna` (codex) | without Lore | retry_budget ×3, green ×2 |
| #144 large | tdd-round | `gemini-3-flash-preview` (gemini) | with Lore | green ×1, round_budget ×1 |
| #144 large | tdd-round | `gemini-3-flash-preview` (gemini) | Lore on Utopia | round_budget ×1, green ×1 |
| #144 large | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | green ×3 |
| #144 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | with Lore | retry_budget ×1, station_done ×1 |
| #144 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×2 |
| #144 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×3 |
| #144 large | tdd-round | `gemini-4-argon` (gemini) | with Lore | green ×2 |
| #144 large | tdd-round | `gemini-4-argon` (gemini) | Lore on Utopia | green ×2 |
| #144 large | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×3 |

## What we read in it

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

**tdd-round and repair-build, Gemini models, five runs per cell** (ticket #93, all three context settings; tdd-round starts from gpt-5.6-terra's clean dod, repair-build from the first red build of the clean Gemini 4 Argon loop):

- **Every Gemini model finishes the implementation every time.** 45 of 45 tdd-round loops reached a green build.
- **Gemini 4 Argon writes the best code, Gemini 3 Flash is the cheapest, Gemini 3.1 Pro sits below both.** Argon scored 5 for correctness and completeness in all 15 runs, at $2.36–3.20 a loop, with the fewest extra rounds (0–0.4). Flash scored 4.6–4.8 / 4.0–4.8 at $0.71–1.26, needing 1–2.4 extra rounds. 3.1 Pro scored 4.0–4.4 / 4.6–4.8 at $1.90–2.15. For scale, production's Sonnet 4.6 took the same dod to green for about $1.70 in one clean run.
- **Repairs are cheap and almost always work:** $0.34–0.85, 2.5–6.5 minutes, and 41 of 45 left the build green. The exceptions: Gemini 3 Flash on Lore-on-Utopia (2 of 5) and Gemini 3.1 Pro, the production repair model, without Lore (4 of 5).
- **Context makes no consistent difference on these two stations.** Across the three settings the means sit inside each other's spread for every model: Argon's tdd-round costs $2.36 without Lore, $2.48 with Lore, $3.20 with Lore on Utopia, with standard deviations of $0.59–1.61. Flash is the one model whose tdd rounds are cheaper with Lore ($0.71 against $1.26 without, fewer extra rounds), but its spread without Lore ($0.52–2.72) covers that.
- **Lore on Utopia** gives the agent only spec statements and ADRs today (memory, episodes, code and the graph return "no Utopia reader yet"), so it measures Lore switched to Utopia as it stands. It is no worse than the other settings on the tdd round, slower on repairs (5.8–6.6 minutes against 2.6–4.5), and Flash's repairs fail more often on it (3 of 5 left red).
- **Reading:** on this ticket the branch and the round brief carry what these stations need; neither store measurably helps. Whether context matters is a question for the dod station and for larger tickets, both still to be run.

**Codex models: pending.** The ChatGPT account hit its usage limit at about 02:30, so 67 Codex loops failed in seconds; they were discarded and rerun from 04:05, when the limit reset.

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

