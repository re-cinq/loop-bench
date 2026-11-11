# Which model runs each implementation-loop station best

**For people choosing the model behind one of Lore's agents.** Results of `halengine` as of 2026-11-11 01:32 UTC: 2464 loops over 658 cells on re-cinq/HALEngine, prompts from lore `aa562bb4`.

## Why we measured

The implementation loop's stations (`dod`, `tdd-round`, `repair-build`) each run on a model nobody chose by measurement. This bench replays merged tickets from their base commit with each harness and model, with and without the Lore MCP server, and repeats every cell so a lucky run shows as spread rather than as a rank.

## Results

Each row is one cell: one station varied against the production baseline, every other station at baseline. Each ticket carries its complexity: small (the merged change touched 1 production file, under 20 lines), medium (a few files, ~100 lines) or large (many files across modules). Rows are sorted by model name; cells that have not finished a loop yet show as running or not run yet. Values are the mean over the cell's runs, with min–max and standard deviation in parentheses.

| Ticket | Station varied | Model (CLI) | Effort | Lore | Prompt | Runs | Reached green | Rounds | Cost per loop | Time per loop | Judge correctness | Judge completeness | Judge closeness | dod red→green | Files (Jaccard vs PR) | +/− lines |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| #37 medium | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.20 | 13.1 min | 1.0 | 1.0 | 1.0 | 0/1 | 3 (0.08) | +337/−0 |
| #37 medium | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.26 ($0.00–$0.69, sd $0.26) | 18.2 min (2.4 min–27.9 min, sd 9.0 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 0/5 | 3 (3–4, sd 0) (0.09 (0.00–0.15, sd 0.06)) | +423/−0 |
| #37 medium | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.08 | 12.5 min | 1.0 | 1.0 | 2.0 | 0/1 | 3 (0.08) | +197/−0 |
| #37 medium | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 3 | 0/3 | 0.0 (0.0–0.0, sd 0.0) | $0.04 ($0.00–$0.07, sd $0.03) | 15.1 min (11.4 min–21.7 min, sd 4.7 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.3 (1.0–2.0, sd 0.5) | 0/3 | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +123/−0 |
| #37 medium | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.08 ($0.06–$0.13, sd $0.03) | 10.2 min (2.0 min–15.0 min, sd 4.4 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +109/−0 |
| #37 medium | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.23 | 19.8 min | 1.0 | 1.0 | 2.0 | 0/1 | 4 (0.07) | +245/−0 |
| #37 medium | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.28 ($0.20–$0.57, sd $0.14) | 22.5 min (17.8 min–34.2 min, sd 5.9 min) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | 0/5 | 3 (3–4, sd 0) (0.07 (0.07–0.08, sd 0.00)) | +221/−0 |
| #37 medium | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.27 | 24.6 min | 1.0 | 1.0 | 1.0 | 0/1 | 3 (0.08) | +89/−0 |
| #37 medium | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.09 ($0.00–$0.24, sd $0.11) | 30.2 min (20.3 min–39.7 min, sd 7.4 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 3 (3–4, sd 0) (0.08 (0.07–0.08, sd 0.00)) | +136/−0 |
| #37 medium | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.23 | 1.0 min | 1.0 | 1.0 | 2.0 | 0/1 | 3 (0.08) | +147/−0 |
| #37 medium | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.17 ($0.08–$0.22, sd $0.05) | 8.7 min (0.6 min–15.6 min, sd 6.6 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 0/5 | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +130/−0 |
| #37 medium | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.05 ($0.04–$0.06, sd $0.01) | 2.3 min (1.1 min–3.9 min, sd 1.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 0/5 | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +160/−0 |
| #37 medium | dod | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.04 ($0.03–$0.04, sd $0.00) | 3.9 min (1.3 min–4.7 min, sd 1.3 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 0/5 | 3 (2–3, sd 0) (0.05 (0.00–0.08, sd 0.04)) | +143/−0 |
| #37 medium | dod | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $2.30 ($0.03–$5.79, sd $2.77) | 1.1 min (0.8 min–1.3 min, sd 0.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 0/5 | 3 (2–3, sd 0) (0.06 (0.00–0.08, sd 0.03)) | +117/−0 |
| #37 medium | dod | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.81 | 8.8 min | 1.0 | 1.0 | 2.0 | 0/1 | 3 (0.08) | +249/−0 |
| #37 medium | dod | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.77 ($0.28–$1.03, sd $0.26) | 6.9 min (0.6 min–8.8 min, sd 3.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 0/4 | 2 (0–3, sd 1) (0.06 (0.00–0.08, sd 0.03)) | +152/−0 |
| #37 medium | dod | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.70 ($0.21–$0.93, sd $0.26) | 6.1 min (0.4 min–7.7 min, sd 2.8 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 0/4 | 2 (0–3, sd 1) (0.06 (0.00–0.08, sd 0.03)) | +144/−0 |
| #37 medium | dod | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.41 | 9.3 min | 1.0 | 1.0 | 2.0 | 0/1 | 3 (0.08) | +153/−0 |
| #37 medium | dod | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.45 ($0.13–$0.60, sd $0.17) | 9.9 min (9.4 min–10.5 min, sd 0.4 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 0/4 | 3 (0–4, sd 1) (0.06 (0.00–0.08, sd 0.03)) | +139/−0 |
| #37 medium | dod | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.50 ($0.42–$0.59, sd $0.06) | 9.8 min (8.8 min–11.5 min, sd 0.9 min) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 0/5 | 3 (3–4, sd 0) (0.07 (0.07–0.08, sd 0.00)) | +190/−0 |
| #37 medium | dod | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $1.13 | 11.1 min | 1.0 | 1.0 | 2.0 | 0/1 | 4 (0.07) | +224/−1 |
| #37 medium | dod | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.83 ($0.58–$1.11, sd $0.20) | 11.3 min (10.3 min–13.7 min, sd 1.3 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 0/2 | 1 (0–3, sd 1) (0.03 (0.00–0.08, sd 0.04)) | +85/−0 |
| #37 medium | dod | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.22 ($1.05–$1.56, sd $0.18) | 10.6 min (10.2 min–11.3 min, sd 0.4 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 0/5 | 3 (3–4, sd 0) (0.08 (0.07–0.08, sd 0.00)) | +210/−0 |
| #37 medium | dod | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.02 ($0.01–$0.03, sd $0.01) | 4.4 min (3.5 min–5.8 min, sd 0.8 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 0/5 | 3 (3–3, sd 0) (0.06 (0.00–0.08, sd 0.03)) | +93/−0 |
| #37 medium | dod | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.02 ($0.01–$0.05, sd $0.02) | 3.5 min (0.6 min–6.3 min, sd 2.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 0/5 | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +110/−0 |
| #37 medium | dod | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.01 ($0.01–$0.02, sd $0.00) | 1.5 min (0.8 min–2.1 min, sd 0.5 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +88/−0 |
| #37 medium | dod | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.60 | 7.4 min | 1.0 | 1.0 | 2.0 | 0/1 | 4 (0.07) | +215/−0 |
| #37 medium | dod | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.48 ($0.33–$0.68, sd $0.11) | 6.2 min (2.2 min–7.7 min, sd 2.0 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 0/5 | 3 (3–4, sd 0) (0.07 (0.07–0.08, sd 0.00)) | +214/−0 |
| #37 medium | dod | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.48 ($0.32–$0.72, sd $0.13) | 7.0 min (6.6 min–7.4 min, sd 0.4 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 0/5 | 4 (3–4, sd 0) (0.07 (0.07–0.08, sd 0.00)) | +216/−0 |
| #37 medium | dod | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.20 | 6.4 min | 1.0 | 1.0 | 2.0 | 0/1 | 3 (0.08) | +166/−0 |
| #37 medium | dod | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.15 ($0.14–$0.17, sd $0.01) | 5.9 min (5.8 min–6.2 min, sd 0.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 0/5 | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +188/−0 |
| #37 medium | dod | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.16 ($0.14–$0.18, sd $0.01) | 5.6 min (5.2 min–6.0 min, sd 0.3 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 0/5 | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +186/−0 |
| #37 medium | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.08 | 17.6 min | 1.0 | 1.0 | 1.0 | 0/1 | 3 (0.08) | +231/−0 |
| #37 medium | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.22 ($0.00–$0.58, sd $0.22) | 24.9 min (2.1 min–35.8 min, sd 13.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | 0/5 | 7 (4–10, sd 2) (0.32 (0.07–0.50, sd 0.14)) | +384/−12 |
| #37 medium | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.08 ($0.00–$0.16, sd $0.07) | 25.0 min (17.4 min–34.4 min, sd 7.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 1.8 (1.0–2.0, sd 0.4) | 0/5 | 5 (4–9, sd 2) (0.16 (0.07–0.43, sd 0.14)) | +357/−3 |
| #37 medium | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.86 | 32.9 min | — | — | — | 0/1 | 3 (0.08) | +118/−0 |
| #37 medium | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 1 | 0/1 | 0.0 | $0.00 | 53.4 min | — | — | — | 0/1 | 3 (0.08) | +120/−0 |
| #37 medium | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.53 ($0.00–$1.17, sd $0.46) | 33.0 min (26.9 min–40.3 min, sd 5.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 0/5 | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +139/−0 |
| #37 medium | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 64.1 min | — | — | — | 0/1 | 3 (0.08) | +274/−0 |
| #37 medium | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 4 | 0/4 | 0.0 (0.0–0.0, sd 0.0) | $0.60 ($0.00–$1.38, sd $0.61) | 36.2 min (26.1 min–45.8 min, sd 9.6 min) | — | — | — | 0/4 | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +197/−0 |
| #37 medium | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.32 ($0.00–$1.25, sd $0.48) | 36.3 min (24.1 min–48.2 min, sd 9.5 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 0/5 | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +254/−0 |
| #37 medium | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.25 | 27.5 min | 2.0 | 2.0 | 2.0 | — | 8 (0.46) | +385/−17 |
| #37 medium | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.6 (0.0–1.0, sd 0.5) | $0.19 ($0.00–$0.39, sd $0.16) | 18.2 min (2.1 min–26.2 min, sd 9.1 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +377/−17 |
| #37 medium | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.06 | 1.1 min | 2.0 | 2.0 | 2.0 | — | 8 (0.46) | +348/−17 |
| #37 medium | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.04 ($0.02–$0.10, sd $0.04) | 12.3 min (11.8 min–12.7 min, sd 0.4 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.3 (2.0–3.0, sd 0.5) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +364/−17 |
| #37 medium | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.05 ($0.02–$0.06, sd $0.02) | 7.2 min (0.8 min–21.6 min, sd 8.2 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +348/−17 |
| #37 medium | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.53 | 20.5 min | 4.0 | 3.0 | 3.0 | — | 8 (0.46) | +377/−17 |
| #37 medium | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.20 ($0.09–$0.48, sd $0.15) | 18.7 min (1.4 min–33.1 min, sd 10.1 min) | 3.4 (2.0–4.0, sd 0.8) | 2.8 (2.0–3.0, sd 0.4) | 3.0 (2.0–4.0, sd 0.6) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +370/−17 |
| #37 medium | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $1.11 | 4.5 min | 2.0 | 2.0 | 3.0 | — | 8 (0.46) | +381/−17 |
| #37 medium | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 1/5 | 0.8 (0.0–1.0, sd 0.4) | $0.51 ($0.18–$0.95, sd $0.32) | 24.4 min (3.8 min–54.4 min, sd 16.5 min) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | 2.2 (2.0–3.0, sd 0.4) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +361/−17 |
| #37 medium | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.18 | 17.5 min | 2.0 | 2.0 | 2.0 | — | 8 (0.46) | +365/−17 |
| #37 medium | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.13 ($0.09–$0.21, sd $0.04) | 12.1 min (1.0 min–17.2 min, sd 5.8 min) | 2.0 (1.0–3.0, sd 0.6) | 2.0 (2.0–2.0, sd 0.0) | 2.2 (2.0–3.0, sd 0.4) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +359/−17 |
| #37 medium | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.03 ($0.03–$0.04, sd $0.01) | 3.0 min (1.3 min–4.6 min, sd 1.3 min) | 2.4 (2.0–4.0, sd 0.8) | 2.2 (2.0–3.0, sd 0.4) | 3.0 (3.0–3.0, sd 0.0) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +387/−17 |
| #37 medium | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.04 ($0.03–$0.06, sd $0.01) | 3.4 min (1.5 min–5.9 min, sd 1.9 min) | 2.8 (2.0–4.0, sd 0.7) | 2.4 (2.0–3.0, sd 0.5) | 3.0 (3.0–3.0, sd 0.0) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +391/−17 |
| #37 medium | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $1.27 ($0.03–$3.79, sd $1.56) | 2.1 min (1.3 min–3.5 min, sd 0.8 min) | 2.8 (2.0–4.0, sd 1.0) | 2.4 (2.0–3.0, sd 0.5) | 2.8 (2.0–3.0, sd 0.4) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +389/−17 |
| #37 medium | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.42 | 8.4 min | 2.0 | 2.0 | 3.0 | — | 8 (0.46) | +385/−17 |
| #37 medium | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.57 ($0.44–$0.81, sd $0.13) | 7.0 min (1.5 min–8.8 min, sd 2.8 min) | 2.4 (2.0–4.0, sd 0.8) | 2.4 (2.0–3.0, sd 0.5) | 3.0 (3.0–3.0, sd 0.0) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +382/−17 |
| #37 medium | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.54 ($0.48–$0.60, sd $0.05) | 7.6 min (7.3 min–7.8 min, sd 0.2 min) | 2.8 (2.0–4.0, sd 1.0) | 2.6 (2.0–3.0, sd 0.5) | 3.0 (3.0–3.0, sd 0.0) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +382/−17 |
| #37 medium | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.25 | 2.4 min | 4.0 | 2.0 | 3.0 | — | 8 (0.46) | +381/−17 |
| #37 medium | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.27 ($0.23–$0.29, sd $0.02) | 5.4 min (1.3 min–10.8 min, sd 4.0 min) | 2.4 (2.0–4.0, sd 0.8) | 2.4 (2.0–3.0, sd 0.5) | 3.0 (2.0–4.0, sd 0.6) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +386/−17 |
| #37 medium | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.30 ($0.21–$0.37, sd $0.06) | 6.9 min (2.1 min–10.5 min, sd 3.6 min) | 2.8 (2.0–4.0, sd 0.7) | 2.6 (2.0–3.0, sd 0.5) | 3.0 (2.0–4.0, sd 0.6) | — | 9 (8–11, sd 1) (0.51 (0.46–0.69, sd 0.09)) | +391/−20 |
| #37 medium | repair-build | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.66 | 11.2 min | 2.0 | 2.0 | 2.0 | — | 8 (0.46) | +348/−17 |
| #37 medium | repair-build | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.76 ($0.57–$1.09, sd $0.19) | 1.7 min (1.1 min–2.7 min, sd 0.6 min) | 2.2 (2.0–3.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | 2.2 (2.0–3.0, sd 0.4) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +356/−17 |
| #37 medium | repair-build | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.70 ($0.63–$0.89, sd $0.10) | 14.4 min (10.4 min–20.1 min, sd 4.6 min) | 2.2 (2.0–3.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | 2.2 (2.0–3.0, sd 0.4) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +354/−17 |
| #37 medium | repair-build | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.01 ($0.01–$0.02, sd $0.00) | 3.2 min (1.1 min–6.4 min, sd 2.3 min) | 2.2 (2.0–3.0, sd 0.4) | 2.2 (2.0–3.0, sd 0.4) | 2.6 (2.0–3.0, sd 0.5) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +380/−17 |
| #37 medium | repair-build | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.02 ($0.01–$0.03, sd $0.01) | 5.0 min (1.9 min–6.4 min, sd 1.6 min) | 2.8 (2.0–4.0, sd 0.7) | 2.6 (2.0–3.0, sd 0.5) | 2.8 (2.0–3.0, sd 0.4) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +418/−17 |
| #37 medium | repair-build | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.01 ($0.01–$0.01, sd $0.00) | 1.6 min (0.9 min–2.3 min, sd 0.5 min) | 2.2 (2.0–3.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | 2.6 (2.0–3.0, sd 0.5) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +371/−17 |
| #37 medium | repair-build | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.22 | 2.5 min | 4.0 | 3.0 | 3.0 | — | 8 (0.46) | +377/−17 |
| #37 medium | repair-build | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.25 ($0.20–$0.32, sd $0.04) | 4.4 min (2.2 min–7.5 min, sd 2.4 min) | 2.8 (2.0–4.0, sd 1.0) | 2.6 (2.0–3.0, sd 0.5) | 3.0 (3.0–3.0, sd 0.0) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +375/−17 |
| #37 medium | repair-build | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.25 ($0.19–$0.38, sd $0.07) | 5.1 min (1.7 min–7.7 min, sd 2.4 min) | 3.6 (2.0–4.0, sd 0.8) | 2.8 (2.0–3.0, sd 0.4) | 3.0 (3.0–3.0, sd 0.0) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +377/−17 |
| #37 medium | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.13 | 1.8 min | 3.0 | 2.0 | 3.0 | — | 8 (0.46) | +371/−17 |
| #37 medium | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 1/5 | 0.8 (0.0–1.0, sd 0.4) | $0.13 ($0.11–$0.15, sd $0.01) | 5.9 min (5.7 min–6.0 min, sd 0.1 min) | 3.0 (2.0–4.0, sd 0.6) | 2.2 (2.0–3.0, sd 0.4) | 2.6 (2.0–3.0, sd 0.5) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +360/−17 |
| #37 medium | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.15 ($0.10–$0.18, sd $0.04) | 7.7 min (5.4 min–10.0 min, sd 2.0 min) | 2.6 (1.0–4.0, sd 1.0) | 2.0 (2.0–2.0, sd 0.0) | 2.6 (2.0–3.0, sd 0.5) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +363/−17 |
| #37 medium | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.72 ($0.30–$1.56, sd $0.59) | 4.4 min (4.1 min–4.6 min, sd 0.2 min) | 2.0 (2.0–2.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | — | 11 (11–12, sd 0) (0.72 (0.69–0.77, sd 0.04)) | +536/−30 |
| #37 medium | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.42 ($0.10–$1.06, sd $0.34) | 7.5 min (3.5 min–19.1 min, sd 5.8 min) | 2.0 (2.0–2.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | — | 12 (11–14, sd 1) (0.74 (0.69–0.79, sd 0.04)) | +507/−24 |
| #37 medium | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.69 ($0.34–$1.39, sd $0.38) | 12.2 min (4.6 min–23.4 min, sd 7.8 min) | 2.4 (2.0–4.0, sd 0.8) | 3.2 (2.0–4.0, sd 0.7) | 3.4 (3.0–4.0, sd 0.5) | — | 11 (8–13, sd 2) (0.71 (0.46–0.85, sd 0.14)) | +491/−28 |
| #37 medium | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $1.13 ($0.56–$1.69, sd $0.46) | 7.7 min (4.1 min–10.3 min, sd 2.6 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +364/−17 |
| #37 medium | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $1.18 ($0.63–$1.72, sd $0.45) | 5.6 min (4.0 min–8.1 min, sd 1.8 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.3 (2.0–3.0, sd 0.5) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +356/−17 |
| #37 medium | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $1.44 ($1.29–$1.70, sd $0.19) | 7.9 min (6.7 min–8.6 min, sd 0.8 min) | 2.3 (2.0–3.0, sd 0.5) | 2.0 (2.0–2.0, sd 0.0) | 2.3 (2.0–3.0, sd 0.5) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +364/−17 |
| #37 medium | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.17 | 24.5 min | — | — | — | — | 8 (0.46) | +401/−24 |
| #37 medium | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 1 | 0/1 | 1.0 | $0.11 | 47.6 min | — | — | — | — | 8 (0.46) | +398/−17 |
| #37 medium | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.86 ($0.08–$1.83, sd $0.68) | 21.8 min (12.0 min–30.4 min, sd 6.5 min) | 2.8 (1.0–4.0, sd 1.5) | 2.6 (2.0–3.0, sd 0.5) | 2.6 (2.0–3.0, sd 0.5) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +375/−17 |
| #37 medium | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $1.73 ($1.27–$1.99, sd $0.33) | 12.4 min (11.3 min–13.8 min, sd 1.0 min) | 1.7 (1.0–2.0, sd 0.5) | 2.0 (2.0–2.0, sd 0.0) | 2.3 (2.0–3.0, sd 0.5) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +385/−17 |
| #37 medium | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 4 | 3/4 | 0.3 (0.0–1.0, sd 0.4) | $2.93 ($1.80–$4.02, sd $0.84) | 23.8 min (12.4 min–45.9 min, sd 13.1 min) | 2.7 (2.0–4.0, sd 0.9) | 2.3 (2.0–3.0, sd 0.5) | 3.0 (3.0–3.0, sd 0.0) | — | 9 (8–13, sd 2) (0.52 (0.46–0.71, sd 0.11)) | +431/−21 |
| #37 medium | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 1/5 | 0.8 (0.0–1.0, sd 0.4) | $2.21 ($0.10–$3.37, sd $1.27) | 18.7 min (11.0 min–26.1 min, sd 6.1 min) | 3.4 (2.0–5.0, sd 1.2) | 3.2 (2.0–5.0, sd 1.0) | 3.4 (3.0–4.0, sd 0.5) | — | 10 (8–14, sd 3) (0.59 (0.46–0.79, sd 0.16)) | +512/−22 |
| #37 medium | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.20 | 39.3 min | 3.0 | 2.0 | 3.0 | — | 7 (0.38) | +499/−17 |
| #37 medium | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.6 (0.0–1.0, sd 0.5) | $0.14 ($0.00–$0.29, sd $0.12) | 28.4 min (25.1 min–37.6 min, sd 4.7 min) | 2.2 (2.0–3.0, sd 0.4) | 2.2 (2.0–3.0, sd 0.4) | 2.6 (2.0–3.0, sd 0.5) | — | 7 (6–8, sd 1) (0.36 (0.31–0.46, sd 0.06)) | +416/−4 |
| #37 medium | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.07 | 34.4 min | 2.0 | 2.0 | 2.0 | — | 8 (0.46) | +379/−17 |
| #37 medium | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 3 | 0/3 | 0.7 (0.0–1.0, sd 0.5) | $0.07 ($0.00–$0.14, sd $0.06) | 31.2 min (22.7 min–35.9 min, sd 6.0 min) | 2.7 (2.0–4.0, sd 0.9) | 2.3 (2.0–3.0, sd 0.5) | 2.7 (2.0–3.0, sd 0.5) | — | 8 (7–8, sd 0) (0.44 (0.38–0.46, sd 0.04)) | +382/−15 |
| #37 medium | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (0.0–2.0, sd 0.6) | $0.09 ($0.00–$0.20, sd $0.07) | 37.2 min (21.7 min–51.8 min, sd 10.2 min) | 2.4 (2.0–4.0, sd 0.8) | 2.2 (2.0–3.0, sd 0.4) | 2.8 (2.0–3.0, sd 0.4) | — | 8 (8–9, sd 0) (0.48 (0.46–0.54, sd 0.03)) | +397/−12 |
| #37 medium | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.26 | 58.7 min | 2.0 | 3.0 | 4.0 | — | 8 (0.46) | +416/−17 |
| #37 medium | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 2/5 | 2.0 (0.0–5.0, sd 1.8) | $1.02 ($0.00–$2.57, sd $1.05) | 103.2 min (33.4 min–231.6 min, sd 67.6 min) | 3.0 (2.0–4.0, sd 0.9) | 2.8 (2.0–3.0, sd 0.4) | 3.4 (3.0–4.0, sd 0.5) | — | 8 (7–9, sd 1) (0.46 (0.38–0.54, sd 0.05)) | +435/−13 |
| #37 medium | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 45.1 min | 4.0 | 4.0 | 4.0 | — | 12 (0.64) | +420/−19 |
| #37 medium | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.00 ($0.00–$0.00, sd $0.00) | 40.2 min (38.0 min–41.8 min, sd 1.6 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (3.0–5.0, sd 0.6) | 3.6 (3.0–4.0, sd 0.5) | — | 12 (8–14, sd 2) (0.66 (0.46–0.79, sd 0.11)) | +421/−20 |
| #37 medium | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 1/1 | 3.0 | $1.08 | 22.1 min | 4.0 | 3.0 | 3.0 | — | 8 (0.46) | +421/−17 |
| #37 medium | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 3/5 | 7.0 (3.0–12.0, sd 3.0) | $1.47 ($0.69–$2.39, sd $0.62) | 112.8 min (68.6 min–224.0 min, sd 59.1 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (3.0–5.0, sd 0.9) | 3.8 (3.0–4.0, sd 0.4) | — | 11 (8–14, sd 3) (0.64 (0.46–0.79, sd 0.15)) | +511/−25 |
| #37 medium | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 5 | 4/5 | 4.4 (2.0–6.0, sd 1.5) | $0.76 ($0.44–$1.02, sd $0.19) | 131.2 min (78.0 min–224.0 min, sd 57.0 min) | 4.4 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 14 (13–15, sd 1) (0.74 (0.71–0.79, sd 0.02)) | +643/−60 |
| #37 medium | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 2/5 | 11.0 (7.0–12.0, sd 2.0) | $0.52 ($0.33–$0.59, sd $0.10) | 37.6 min (25.3 min–45.0 min, sd 6.9 min) | 3.2 (3.0–4.0, sd 0.4) | 3.2 (3.0–4.0, sd 0.4) | 3.6 (3.0–4.0, sd 0.5) | — | 9 (8–10, sd 1) (0.48 (0.46–0.50, sd 0.02)) | +658/−20 |
| #37 medium | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 1/5 | 10.2 (3.0–12.0, sd 3.6) | $0.51 ($0.19–$0.63, sd $0.17) | 83.7 min (20.2 min–238.3 min, sd 78.5 min) | 3.2 (2.0–4.0, sd 1.0) | 3.8 (3.0–5.0, sd 0.7) | 3.2 (3.0–4.0, sd 0.4) | — | 12 (8–17, sd 4) (0.61 (0.46–0.79, sd 0.13)) | +651/−40 |
| #37 medium | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 2/5 | 11.0 (7.0–12.0, sd 2.0) | $0.43 ($0.24–$0.49, sd $0.09) | 27.0 min (17.5 min–36.0 min, sd 7.3 min) | 3.6 (2.0–4.0, sd 0.8) | 3.6 (3.0–5.0, sd 0.8) | 3.4 (3.0–4.0, sd 0.5) | — | 11 (8–15, sd 3) (0.56 (0.43–0.73, sd 0.13)) | +626/−25 |
| #37 medium | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 5.0 | $4.01 | 46.6 min | 4.0 | 3.0 | 3.0 | — | 8 (0.46) | +484/−17 |
| #37 medium | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 3/5 | 8.0 (3.0–12.0, sd 3.6) | $5.67 ($2.87–$9.18, sd $2.56) | 79.5 min (36.6 min–133.1 min, sd 38.1 min) | 3.6 (3.0–4.0, sd 0.5) | 3.4 (3.0–5.0, sd 0.8) | 3.2 (3.0–4.0, sd 0.4) | — | 10 (8–15, sd 3) (0.52 (0.46–0.73, sd 0.11)) | +520/−25 |
| #37 medium | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 4/5 | 6.6 (4.0–12.0, sd 2.8) | $3.95 ($2.32–$7.42, sd $1.78) | 52.4 min (36.0 min–84.8 min, sd 17.4 min) | 3.0 (2.0–4.0, sd 0.9) | 2.6 (2.0–3.0, sd 0.5) | 3.2 (3.0–4.0, sd 0.4) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +460/−17 |
| #37 medium | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 1/1 | 4.0 | $1.58 | 52.6 min | 2.0 | 3.0 | 3.0 | — | 8 (0.46) | +455/−14 |
| #37 medium | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 4/5 | 8.4 (4.0–12.0, sd 2.7) | $3.55 ($2.10–$4.71, sd $0.90) | 81.4 min (52.3 min–114.0 min, sd 21.0 min) | 3.4 (3.0–4.0, sd 0.5) | 2.8 (2.0–3.0, sd 0.4) | 2.8 (2.0–3.0, sd 0.4) | — | 8 (8–9, sd 0) (0.45 (0.43–0.46, sd 0.01)) | +546/−16 |
| #37 medium | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 5/5 | 7.8 (2.0–12.0, sd 3.9) | $2.65 ($1.04–$4.58, sd $1.31) | 71.8 min (25.5 min–125.0 min, sd 32.7 min) | 3.0 (2.0–4.0, sd 0.9) | 2.8 (2.0–3.0, sd 0.4) | 3.0 (3.0–3.0, sd 0.0) | — | 8 (8–8, sd 0) (0.46 (0.46–0.46, sd 0.00)) | +544/−15 |
| #37 medium | tdd-round | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 3.0 | $5.23 | 54.3 min | 2.0 | 2.0 | 2.0 | — | 12 (0.35) | +417/−18 |
| #37 medium | tdd-round | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 3/5 | 6.2 (4.0–8.0, sd 1.5) | $10.15 ($5.48–$13.10, sd $2.70) | 97.0 min (49.8 min–140.5 min, sd 30.6 min) | 3.6 (3.0–4.0, sd 0.5) | 2.8 (2.0–3.0, sd 0.4) | 2.8 (2.0–3.0, sd 0.4) | — | 14 (12–16, sd 1) (0.31 (0.29–0.35, sd 0.02)) | +509/−18 |
| #37 medium | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.70 ($0.59–$0.94, sd $0.14) | 18.5 min (10.3 min–21.4 min, sd 4.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 3 (3–3, sd 0) (0.08 (0.08–0.08, sd 0.00)) | +241/−0 |
| #37 medium | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 4/5 | 8.8 (7.0–12.0, sd 1.7) | $0.21 ($0.17–$0.26, sd $0.04) | 39.9 min (32.6 min–46.3 min, sd 5.4 min) | 3.6 (2.0–5.0, sd 1.0) | 3.6 (3.0–5.0, sd 0.8) | 3.6 (3.0–4.0, sd 0.5) | — | 11 (8–15, sd 3) (0.58 (0.46–0.73, sd 0.13)) | +581/−31 |
| #37 medium | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 4/5 | 9.8 (3.0–12.0, sd 3.5) | $0.21 ($0.07–$0.26, sd $0.07) | 58.6 min (21.8 min–85.0 min, sd 22.2 min) | 3.6 (2.0–4.0, sd 0.8) | 4.2 (2.0–5.0, sd 1.2) | 3.6 (2.0–4.0, sd 0.8) | — | 14 (8–17, sd 3) (0.67 (0.46–0.79, sd 0.11)) | +623/−39 |
| #37 medium | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 1/5 | 7.8 (2.0–12.0, sd 3.6) | $0.17 ($0.06–$0.24, sd $0.07) | 20.3 min (8.5 min–29.4 min, sd 7.0 min) | 3.2 (2.0–4.0, sd 0.7) | 3.2 (3.0–4.0, sd 0.4) | 3.2 (3.0–4.0, sd 0.4) | — | 10 (8–13, sd 2) (0.57 (0.46–0.77, sd 0.14)) | +522/−46 |
| #37 medium | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 1/1 | 3.0 | $1.76 | 33.7 min | 4.0 | 3.0 | 4.0 | — | 15 (0.63) | +528/−45 |
| #37 medium | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 4/5 | 8.2 (3.0–12.0, sd 3.0) | $3.71 ($1.80–$5.48, sd $1.20) | 77.3 min (32.4 min–129.1 min, sd 32.9 min) | 3.0 (2.0–4.0, sd 0.9) | 3.0 (3.0–3.0, sd 0.0) | 2.8 (2.0–3.0, sd 0.4) | — | 10 (9–14, sd 2) (0.42 (0.39–0.43, sd 0.02)) | +601/−25 |
| #37 medium | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 3/5 | 8.0 (3.0–12.0, sd 3.8) | $3.27 ($1.36–$4.96, sd $1.50) | 130.1 min (30.7 min–433.4 min, sd 153.0 min) | 3.2 (2.0–4.0, sd 0.7) | 3.2 (3.0–4.0, sd 0.4) | 3.0 (2.0–4.0, sd 0.6) | — | 10 (8–14, sd 2) (0.49 (0.43–0.67, sd 0.09)) | +606/−21 |
| #37 medium | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 6.0 | $1.30 | 45.2 min | 4.0 | 3.0 | 3.0 | — | 10 (0.40) | +532/−17 |
| #37 medium | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 4/5 | 6.2 (5.0–8.0, sd 1.0) | $1.23 ($0.94–$1.55, sd $0.20) | 68.4 min (37.0 min–90.5 min, sd 18.7 min) | 3.6 (3.0–4.0, sd 0.5) | 3.0 (3.0–3.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | — | 14 (13–14, sd 0) (0.32 (0.32–0.33, sd 0.01)) | +546/−18 |
| #37 medium | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.8 (0.0–3.0, sd 1.2) | $0.28 ($0.12–$0.70, sd $0.21) | 16.9 min (1.0 min–46.3 min, sd 15.6 min) | 1.4 (1.0–3.0, sd 0.8) | 1.4 (1.0–2.0, sd 0.5) | 2.2 (2.0–3.0, sd 0.4) | — | 5 (3–10, sd 3) (0.22 (0.08–0.46, sd 0.17)) | +294/−7 |
| #37 medium | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 1/3 | 9.0 (3.0–12.0, sd 4.2) | $7.21 ($2.34–$10.96, sd $3.61) | 37.4 min (15.3 min–56.0 min, sd 16.8 min) | 4.0 (4.0–4.0, sd 0.0) | 4.3 (3.0–5.0, sd 0.9) | 3.3 (3.0–4.0, sd 0.5) | — | 15 (13–17, sd 2) (0.68 (0.65–0.71, sd 0.03)) | +780/−151 |
| #37 medium | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 1/5 | 6.0 (1.0–12.0, sd 5.0) | $4.07 ($0.40–$7.93, sd $2.91) | 53.8 min (23.0 min–74.3 min, sd 17.1 min) | 3.4 (2.0–5.0, sd 1.2) | 3.8 (3.0–4.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | — | 16 (14–19, sd 2) (0.70 (0.58–0.79, sd 0.08)) | +725/−55 |
| #37 medium | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 9.8 (1.0–12.0, sd 4.4) | $5.85 ($2.19–$12.41, sd $3.47) | 77.8 min (19.8 min–140.4 min, sd 43.0 min) | 3.6 (2.0–4.0, sd 0.8) | 4.0 (3.0–5.0, sd 0.6) | 3.8 (3.0–4.0, sd 0.4) | — | 16 (13–19, sd 2) (0.67 (0.58–0.79, sd 0.07)) | +699/−47 |
| #37 medium | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 2/3 | 5.3 (5.0–6.0, sd 0.5) | $12.13 ($10.02–$14.44, sd $1.81) | 57.2 min (46.5 min–65.7 min, sd 8.0 min) | 3.3 (3.0–4.0, sd 0.5) | 3.0 (3.0–3.0, sd 0.0) | 3.0 (3.0–3.0, sd 0.0) | — | 12 (8–18, sd 4) (0.52 (0.46–0.61, sd 0.06)) | +585/−25 |
| #37 medium | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 2/3 | 5.7 (5.0–6.0, sd 0.5) | $11.96 ($8.70–$15.32, sd $2.70) | 53.6 min (41.6 min–61.6 min, sd 8.6 min) | 3.7 (3.0–4.0, sd 0.5) | 4.0 (3.0–5.0, sd 0.8) | 3.7 (3.0–4.0, sd 0.5) | — | 15 (14–16, sd 1) (0.75 (0.69–0.79, sd 0.05)) | +573/−36 |
| #37 medium | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 0/3 | 4.0 (0.0–12.0, sd 5.7) | $6.42 ($0.08–$19.06, sd $8.94) | 40.4 min (0.3 min–120.5 min, sd 56.7 min) | 2.0 (1.0–4.0, sd 1.4) | 2.0 (1.0–4.0, sd 1.4) | 2.3 (1.0–4.0, sd 1.2) | — | 8 (3–17, sd 7) (0.27 (0.08–0.65, sd 0.27)) | +359/−14 |
| #37 medium | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.64 | 30.9 min | — | — | — | — | 7 (0.38) | +344/−17 |
| #37 medium | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 1 | 0/1 | 0.0 | $0.15 | 24.5 min | — | — | — | — | 8 (0.46) | +367/−17 |
| #37 medium | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 1.8 (0.0–7.0, sd 2.6) | $3.26 ($0.00–$14.07, sd $5.43) | 120.4 min (37.7 min–378.8 min, sd 130.2 min) | 3.2 (2.0–5.0, sd 1.2) | 3.4 (2.0–5.0, sd 1.4) | 3.4 (3.0–4.0, sd 0.5) | — | 10 (7–14, sd 3) (0.56 (0.38–0.79, sd 0.19)) | +519/−21 |
| #37 medium | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 2.0 (1.0–3.0, sd 0.8) | $11.53 ($6.88–$20.59, sd $6.40) | 47.6 min (24.0 min–83.6 min, sd 25.9 min) | 4.3 (4.0–5.0, sd 0.5) | 3.7 (2.0–5.0, sd 1.2) | 3.7 (3.0–4.0, sd 0.5) | — | 12 (8–14, sd 3) (0.68 (0.46–0.79, sd 0.15)) | +504/−20 |
| #37 medium | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 4 | 3/4 | 3.0 (0.0–6.0, sd 2.1) | $10.91 ($0.00–$16.01, sd $6.44) | 51.0 min (32.0 min–64.5 min, sd 12.2 min) | 4.7 (4.0–5.0, sd 0.5) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 13 (8–16, sd 3) (0.68 (0.46–0.79, sd 0.13)) | +586/−24 |
| #37 medium | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 4/5 | 1.8 (1.0–3.0, sd 0.7) | $6.59 ($1.87–$12.89, sd $3.65) | 58.6 min (27.3 min–95.6 min, sd 29.6 min) | 4.6 (4.0–5.0, sd 0.5) | 4.4 (3.0–5.0, sd 0.8) | 3.8 (3.0–4.0, sd 0.4) | — | 13 (8–15, sd 3) (0.70 (0.46–0.79, sd 0.12)) | +644/−30 |
| #37 medium | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #37 medium | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | baseline | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 1 | 1/1 | 3.0 | $9.66 | 60.5 min | 4.0 | 5.0 | 3.0 | 0/1 | 14 (0.40) | +268/−51 |
| #93 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 1 | 0/1 | 0.0 | $7.72 | 3.5 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.11) | +135/−2 |
| #93 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $5.50 ($3.79–$7.33, sd $1.35) | 1.7 min (1.4 min–2.5 min, sd 0.4 min) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 1.2 (1.0–2.0, sd 0.4) | 4/5 | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +191/−0 |
| #93 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $6.21 ($5.02–$9.56, sd $1.69) | 1.7 min (1.4 min–2.0 min, sd 0.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 4/5 | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +231/−0 |
| #93 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $6.62 ($4.58–$8.48, sd $1.62) | 1.7 min (1.5 min–2.0 min, sd 0.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 5/5 | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +204/−0 |
| #93 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $6.12 ($1.40–$16.34, sd $5.29) | 3.6 min (1.2 min–11.4 min, sd 3.9 min) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 2 (2–3, sd 0) (0.02 (0.00–0.11, sd 0.04)) | +125/−0 |
| #93 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $2.92 ($1.76–$4.73, sd $1.11) | 1.6 min (1.3 min–1.8 min, sd 0.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 2 (2–3, sd 0) (0.04 (0.00–0.11, sd 0.05)) | +113/−0 |
| #93 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $3.16 ($1.56–$7.21, sd $2.08) | 1.5 min (1.3 min–1.7 min, sd 0.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 5/5 | 2 (2–3, sd 0) (0.02 (0.00–0.11, sd 0.04)) | +118/−0 |
| #93 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.48 | 21.0 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.11) | +117/−2 |
| #93 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.52 ($0.43–$5.77, sd $2.13) | 4.4 min (1.3 min–16.9 min, sd 6.2 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +115/−1 |
| #93 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.27 | 23.7 min | 1.0 | 1.0 | 2.0 | 1/1 | 2 (0.00) | +123/−0 |
| #93 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.43 ($0.00–$6.37, sd $2.49) | 25.1 min (4.2 min–40.9 min, sd 17.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 3 (2–3, sd 0) (0.07 (0.00–0.11, sd 0.05)) | +115/−0 |
| #93 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.16 | 17.1 min | 1.0 | 1.0 | 1.0 | 1/1 | 2 (0.00) | +94/−0 |
| #93 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.69 ($0.15–$2.76, sd $1.04) | 0.9 min (0.7 min–1.0 min, sd 0.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 1.2 (1.0–2.0, sd 0.4) | 5/5 | 2 (2–3, sd 0) (0.02 (0.00–0.11, sd 0.04)) | +92/−0 |
| #93 small | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.05 ($0.04–$0.06, sd $0.01) | 1.9 min (1.0 min–4.1 min, sd 1.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 1.2 (1.0–2.0, sd 0.4) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +131/−2 |
| #93 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.05 ($0.04–$0.06, sd $0.01) | 5.9 min (1.2 min–17.6 min, sd 6.0 min) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 3 (2–3, sd 0) (0.09 (0.00–0.11, sd 0.04)) | +130/−1 |
| #93 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.67 ($0.04–$4.28, sd $1.99) | 1.9 min (1.1 min–2.8 min, sd 0.7 min) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 1.4 (1.0–2.0, sd 0.5) | 5/5 | 3 (2–3, sd 0) (0.09 (0.00–0.11, sd 0.04)) | +114/−2 |
| #93 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.65 | 9.0 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.11) | +84/−1 |
| #93 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.61 ($0.52–$0.76, sd $0.09) | 4.4 min (1.4 min–8.9 min, sd 3.5 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +103/−2 |
| #93 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.36 ($0.54–$4.38, sd $1.51) | 1.2 min (1.1 min–1.6 min, sd 0.2 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +98/−2 |
| #93 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.46 | 11.3 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.11) | +89/−2 |
| #93 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.36 ($0.30–$0.41, sd $0.04) | 4.0 min (1.2 min–9.8 min, sd 3.0 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +109/−2 |
| #93 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.73 ($0.37–$2.06, sd $0.67) | 5.2 min (1.2 min–10.1 min, sd 3.7 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +115/−2 |
| #93 small | dod | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.77 | 11.7 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.11) | +125/−2 |
| #93 small | dod | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.06 ($0.83–$1.56, sd $0.26) | 12.0 min (10.4 min–13.1 min, sd 1.0 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–4, sd 0) (0.11 (0.10–0.11, sd 0.00)) | +128/−2 |
| #93 small | dod | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.79 ($0.81–$5.43, sd $1.82) | 8.7 min (1.7 min–10.9 min, sd 3.5 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +123/−3 |
| #93 small | dod | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.01 ($0.01–$0.02, sd $0.00) | 1.6 min (0.9 min–3.7 min, sd 1.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 1.6 (1.0–2.0, sd 0.5) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +85/−1 |
| #93 small | dod | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.02 ($0.01–$0.03, sd $0.01) | 3.1 min (0.8 min–5.6 min, sd 1.9 min) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 1.6 (1.0–2.0, sd 0.5) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +112/−2 |
| #93 small | dod | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.45 ($0.01–$2.16, sd $0.86) | 1.5 min (0.9 min–1.9 min, sd 0.4 min) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 1.6 (1.0–2.0, sd 0.5) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +95/−2 |
| #93 small | dod | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.32 | 8.8 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.11) | +102/−3 |
| #93 small | dod | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.40 ($0.31–$0.55, sd $0.09) | 4.6 min (2.4 min–7.0 min, sd 2.0 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–4, sd 0) (0.11 (0.10–0.11, sd 0.00)) | +110/−4 |
| #93 small | dod | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.46 ($0.28–$5.92, sd $2.23) | 4.3 min (1.5 min–7.1 min, sd 2.3 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +97/−3 |
| #93 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.13 | 6.7 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.11) | +130/−2 |
| #93 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.17 ($0.15–$0.22, sd $0.02) | 4.8 min (1.7 min–7.1 min, sd 2.5 min) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 1.6 (1.0–2.0, sd 0.5) | 5/5 | 3 (3–4, sd 0) (0.11 (0.10–0.11, sd 0.00)) | +117/−2 |
| #93 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.07 ($0.14–$4.71, sd $1.82) | 4.7 min (1.3 min–6.1 min, sd 1.7 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +121/−2 |
| #93 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.25 | 22.1 min | 1.0 | 2.0 | 2.0 | 0/1 | 4 (0.22) | +192/−1 |
| #93 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.20 ($0.00–$0.43, sd $0.15) | 15.2 min (1.4 min–34.5 min, sd 12.4 min) | 1.2 (1.0–2.0, sd 0.4) | 1.8 (1.0–3.0, sd 0.7) | 1.6 (1.0–2.0, sd 0.5) | 1/5 | 4 (2–7, sd 2) (0.19 (0.00–0.40, sd 0.13)) | +198/−3 |
| #93 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.09 ($0.00–$4.67, sd $1.80) | 14.0 min (1.3 min–32.6 min, sd 15.1 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 4/5 | 4 (3–5, sd 1) (0.20 (0.11–0.22, sd 0.04)) | +213/−2 |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | no-traceability | 1 | 0/1 | 0.0 | $9.37 | 3.7 min | 1.0 | 1.0 | 1.0 | 1/1 | 2 (0.00) | +128/−0 |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | short | 1 | 0/1 | 0.0 | $8.30 | 3.2 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.11) | +127/−1 |
| #93 small | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.45 | 35.9 min | — | — | — | 1/1 | 3 (0.11) | +189/−2 |
| #93 small | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 2 | 0/2 | 0.0 (0.0–0.0, sd 0.0) | $0.99 ($0.59–$1.39, sd $0.40) | 17.3 min (7.6 min–27.0 min, sd 9.7 min) | — | — | — | 2/2 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +167/−2 |
| #93 small | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.19 ($0.00–$1.79, sd $0.68) | 17.3 min (7.8 min–37.0 min, sd 11.5 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +147/−2 |
| #93 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $2.33 | 6.0 min | — | — | — | — | 0 (0.00) | +0/−0 |
| #93 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.67 ($0.00–$1.34, sd $0.45) | 33.3 min (22.0 min–50.8 min, sd 12.2 min) | — | — | — | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +134/−2 |
| #93 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.33 ($0.00–$5.84, sd $2.26) | 31.5 min (7.8 min–43.1 min, sd 14.0 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +119/−2 |
| #93 small | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.56 ($0.23–$1.52, sd $0.48) | 4.7 min (2.0 min–12.5 min, sd 3.9 min) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +147/−5 |
| #93 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 4 | 2/4 | 0.5 (0.0–1.0, sd 0.5) | $0.54 ($0.25–$0.84, sd $0.28) | 2.9 min (2.5 min–3.7 min, sd 0.5 min) | 4.3 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +151/−5 |
| #93 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.48 ($0.17–$1.01, sd $0.38) | 2.8 min (1.8 min–5.3 min, sd 1.3 min) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +151/−5 |
| #93 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.06 ($0.05–$0.08, sd $0.01) | 1.1 min (0.9 min–1.3 min, sd 0.1 min) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.6 (3.0–4.0, sd 0.5) | — | 7 (7–8, sd 0) (0.29 (0.27–0.36, sd 0.04)) | +148/−5 |
| #93 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 4 | 3/4 | 0.3 (0.0–1.0, sd 0.4) | $0.14 ($0.04–$0.39, sd $0.14) | 2.1 min (1.2 min–3.7 min, sd 1.0 min) | 4.5 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +146/−5 |
| #93 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 4/5 | 0.2 (0.0–1.0, sd 0.4) | $0.20 ($0.05–$0.78, sd $0.29) | 1.3 min (0.9 min–2.6 min, sd 0.6 min) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +145/−5 |
| #93 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.26 | 1.4 min | 4.0 | 4.0 | 4.0 | — | 8 (0.36) | +149/−5 |
| #93 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.20 ($0.08–$0.26, sd $0.06) | 16.2 min (1.1 min–24.8 min, sd 8.0 min) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (7–8, sd 0) (0.35 (0.27–0.36, sd 0.04)) | +150/−5 |
| #93 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.43 | 2.9 min | 5.0 | 4.0 | 4.0 | — | 7 (0.27) | +154/−5 |
| #93 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 4/5 | 0.2 (0.0–1.0, sd 0.4) | $0.24 ($0.11–$0.47, sd $0.14) | 12.9 min (2.2 min–20.0 min, sd 8.3 min) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–8, sd 0) (0.31 (0.27–0.36, sd 0.04)) | +153/−5 |
| #93 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.08 | 0.7 min | 4.0 | 4.0 | 4.0 | — | 7 (0.27) | +141/−5 |
| #93 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $0.09 ($0.08–$0.12, sd $0.02) | 8.3 min (0.7 min–14.6 min, sd 6.3 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–8, sd 0) (0.31 (0.27–0.36, sd 0.04)) | +150/−5 |
| #93 small | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.03 ($0.03–$0.04, sd $0.00) | 1.4 min (0.9 min–2.4 min, sd 0.5 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +142/−5 |
| #93 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.02 ($0.02–$0.03, sd $0.00) | 1.4 min (1.0 min–1.7 min, sd 0.3 min) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–8, sd 0) (0.29 (0.27–0.36, sd 0.04)) | +143/−5 |
| #93 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.03 ($0.02–$0.03, sd $0.00) | 1.2 min (0.9 min–1.7 min, sd 0.3 min) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +143/−5 |
| #93 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.32 ($0.31–$0.32, sd $0.01) | 1.6 min (1.0 min–2.5 min, sd 0.7 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 3.7 (3.0–4.0, sd 0.5) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +141/−5 |
| #93 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 4/5 | 0.2 (0.0–1.0, sd 0.4) | $0.35 ($0.31–$0.48, sd $0.07) | 3.0 min (1.0 min–9.2 min, sd 3.2 min) | 4.8 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +142/−5 |
| #93 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 4/5 | 0.2 (0.0–1.0, sd 0.4) | $0.28 ($0.19–$0.40, sd $0.08) | 1.1 min (0.8 min–1.7 min, sd 0.4 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +142/−5 |
| #93 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.16 ($0.14–$0.18, sd $0.02) | 2.3 min (1.4 min–3.8 min, sd 1.0 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +144/−5 |
| #93 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.16 ($0.14–$0.17, sd $0.01) | 3.8 min (0.9 min–11.0 min, sd 3.6 min) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.6 (3.0–4.0, sd 0.5) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +143/−5 |
| #93 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.11 ($0.10–$0.13, sd $0.01) | 2.9 min (0.8 min–9.4 min, sd 3.2 min) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.6 (3.0–4.0, sd 0.5) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +141/−5 |
| #93 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.49 ($0.36–$0.71, sd $0.16) | 2.3 min (1.0 min–4.4 min, sd 1.5 min) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.7 (3.0–4.0, sd 0.5) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +145/−5 |
| #93 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.54 ($0.39–$0.69, sd $0.13) | 1.4 min (0.9 min–1.8 min, sd 0.4 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +145/−5 |
| #93 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.44 ($0.37–$0.49, sd $0.04) | 5.2 min (1.5 min–10.5 min, sd 4.3 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +146/−5 |
| #93 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 1/5 | 0.8 (0.0–1.0, sd 0.4) | $0.01 ($0.01–$0.01, sd $0.00) | 1.7 min (1.0 min–3.5 min, sd 1.0 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +141/−5 |
| #93 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 1/5 | 0.8 (0.0–1.0, sd 0.4) | $0.01 ($0.01–$0.01, sd $0.00) | 1.6 min (0.9 min–3.0 min, sd 0.8 min) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +142/−5 |
| #93 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $0.01 ($0.00–$0.01, sd $0.00) | 1.3 min (1.0 min–1.7 min, sd 0.3 min) | 4.8 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–8, sd 0) (0.29 (0.27–0.36, sd 0.04)) | +141/−5 |
| #93 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 3 | 1/3 | 0.7 (0.0–1.0, sd 0.5) | $0.15 ($0.12–$0.17, sd $0.02) | 2.0 min (1.3 min–2.4 min, sd 0.5 min) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +143/−5 |
| #93 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.16 ($0.12–$0.20, sd $0.03) | 2.1 min (1.6 min–3.5 min, sd 0.7 min) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +142/−5 |
| #93 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.15 ($0.12–$0.16, sd $0.02) | 2.7 min (1.3 min–6.9 min, sd 2.1 min) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.6 (3.0–4.0, sd 0.5) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +143/−5 |
| #93 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.09 ($0.07–$0.11, sd $0.02) | 2.0 min (0.9 min–3.6 min, sd 1.2 min) | 4.3 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +144/−5 |
| #93 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.09 ($0.06–$0.11, sd $0.02) | 1.3 min (0.9 min–1.8 min, sd 0.3 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +143/−5 |
| #93 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.08 ($0.05–$0.16, sd $0.04) | 2.4 min (1.0 min–6.9 min, sd 2.3 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +144/−5 |
| #93 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.85 ($0.21–$2.77, sd $0.97) | 3.5 min (3.0 min–4.7 min, sd 0.7 min) | 4.8 (4.0–5.0, sd 0.4) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (7–16, sd 4) (0.34 (0.25–0.45, sd 0.07)) | +175/−26 |
| #93 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $0.34 ($0.09–$1.24, sd $0.45) | 2.3 min (1.5 min–3.5 min, sd 0.7 min) | 4.4 (4.0–5.0, sd 0.5) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (7–11, sd 2) (0.27 (0.20–0.33, sd 0.04)) | +148/−8 |
| #93 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.35 ($0.07–$1.09, sd $0.39) | 2.6 min (1.3 min–4.6 min, sd 1.2 min) | 5.0 (5.0–5.0, sd 0.0) | 4.4 (4.0–5.0, sd 0.5) | 4.2 (4.0–5.0, sd 0.4) | — | 8 (7–14, sd 3) (0.28 (0.27–0.31, sd 0.02)) | +147/−8 |
| #93 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.58 ($0.44–$0.74, sd $0.11) | 3.4 min (2.9 min–3.7 min, sd 0.3 min) | 4.8 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +146/−5 |
| #93 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.75 ($0.44–$1.10, sd $0.25) | 5.8 min (3.2 min–11.0 min, sd 2.8 min) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–8, sd 0) (0.29 (0.27–0.36, sd 0.04)) | +147/−5 |
| #93 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 4/5 | 0.2 (0.0–1.0, sd 0.4) | $0.78 ($0.46–$1.04, sd $0.20) | 4.2 min (2.5 min–6.5 min, sd 1.4 min) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +147/−5 |
| #93 small | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 1/1 | 0.0 | $1.23 | 7.6 min | — | — | — | — | 7 (0.27) | +146/−5 |
| #93 small | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 2 | 2/2 | 0.0 (0.0–0.0, sd 0.0) | $1.43 ($1.28–$1.58, sd $0.15) | 40.4 min (30.9 min–49.9 min, sd 9.5 min) | — | — | — | — | 8 (7–8, sd 1) (0.32 (0.27–0.36, sd 0.05)) | +146/−5 |
| #93 small | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.74 ($0.06–$1.35, sd $0.56) | 20.9 min (7.0 min–43.9 min, sd 13.6 min) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (6–7, sd 0) (0.28 (0.27–0.30, sd 0.01)) | +139/−5 |
| #93 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.68 ($0.49–$0.96, sd $0.18) | 4.5 min (2.1 min–10.7 min, sd 3.2 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–8, sd 0) (0.29 (0.27–0.36, sd 0.04)) | +144/−5 |
| #93 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.81 ($0.68–$0.95, sd $0.09) | 6.6 min (3.4 min–8.9 min, sd 2.3 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–8, sd 0) (0.29 (0.27–0.36, sd 0.04)) | +145/−5 |
| #93 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.54 ($0.47–$0.62, sd $0.05) | 3.8 min (2.2 min–7.1 min, sd 1.8 min) | 4.8 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +142/−5 |
| #93 small | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 5 | 5/5 | 1.4 (1.0–2.0, sd 0.5) | $0.64 ($0.46–$1.04, sd $0.21) | 9.6 min (5.1 min–14.5 min, sd 3.5 min) | 4.4 (4.0–5.0, sd 0.5) | 3.8 (3.0–4.0, sd 0.4) | 3.8 (3.0–4.0, sd 0.4) | — | 8 (7–10, sd 1) (0.41 (0.27–0.67, sd 0.17)) | +177/−11 |
| #93 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 4 | 4/4 | 1.0 (1.0–1.0, sd 0.0) | $0.56 ($0.52–$0.67, sd $0.06) | 8.4 min (4.8 min–11.6 min, sd 2.4 min) | 4.3 (4.0–5.0, sd 0.4) | 3.8 (3.0–4.0, sd 0.4) | 3.3 (3.0–4.0, sd 0.4) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +184/−7 |
| #93 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 5/5 | 1.6 (1.0–2.0, sd 0.5) | $0.83 ($0.30–$1.96, sd $0.58) | 8.8 min (6.0 min–14.3 min, sd 2.9 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.6 (3.0–4.0, sd 0.5) | — | 7 (7–9, sd 1) (0.34 (0.27–0.60, sd 0.13)) | +190/−10 |
| #93 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 5 | 4/5 | 1.6 (1.0–2.0, sd 0.5) | $0.23 ($0.14–$0.39, sd $0.09) | 5.5 min (3.0 min–7.5 min, sd 1.8 min) | 4.4 (4.0–5.0, sd 0.5) | 4.2 (4.0–5.0, sd 0.4) | 3.6 (3.0–4.0, sd 0.5) | — | 7 (7–9, sd 1) (0.28 (0.27–0.33, sd 0.02)) | +157/−7 |
| #93 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 4 | 3/4 | 1.8 (1.0–4.0, sd 1.3) | $0.25 ($0.13–$0.52, sd $0.16) | 5.0 min (2.2 min–7.8 min, sd 2.0 min) | 4.3 (4.0–5.0, sd 0.4) | 4.3 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | — | 9 (7–13, sd 2) (0.43 (0.27–0.67, sd 0.15)) | +186/−18 |
| #93 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 4/5 | 2.4 (0.0–4.0, sd 1.4) | $0.26 ($0.03–$0.41, sd $0.13) | 6.2 min (2.3 min–10.8 min, sd 3.3 min) | 4.4 (4.0–5.0, sd 0.5) | 4.2 (3.0–5.0, sd 0.7) | 3.8 (3.0–4.0, sd 0.4) | — | 8 (6–12, sd 2) (0.36 (0.18–0.70, sd 0.18)) | +173/−14 |
| #93 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.28 | 40.5 min | 5.0 | 5.0 | 4.0 | — | 11 (0.38) | +221/−11 |
| #93 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 3/5 | 2.4 (1.0–7.0, sd 2.3) | $0.91 ($0.29–$1.93, sd $0.55) | 81.7 min (39.4 min–150.6 min, sd 40.2 min) | 4.6 (4.0–5.0, sd 0.5) | 4.8 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (7–13, sd 2) (0.38 (0.27–0.54, sd 0.09)) | +190/−13 |
| #93 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 1/1 | 1.0 | $0.93 | 44.0 min | 5.0 | 4.0 | 4.0 | — | 7 (0.27) | +165/−7 |
| #93 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.47 ($0.15–$0.87, sd $0.29) | 63.2 min (48.1 min–74.8 min, sd 10.3 min) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (7–8, sd 0) (0.35 (0.27–0.36, sd 0.04)) | +171/−10 |
| #93 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 2.0 | $0.32 | 85.3 min | 5.0 | 5.0 | 4.0 | — | 7 (0.27) | +165/−7 |
| #93 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 5/5 | 1.4 (1.0–2.0, sd 0.5) | $0.33 ($0.20–$0.59, sd $0.14) | 12.3 min (2.2 min–38.0 min, sd 13.5 min) | 5.0 (5.0–5.0, sd 0.0) | 4.8 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (6–10, sd 1) (0.27 (0.21–0.30, sd 0.03)) | +163/−7 |
| #93 small | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 5 | 5/5 | 1.0 (1.0–1.0, sd 0.0) | $0.18 ($0.15–$0.23, sd $0.02) | 23.0 min (17.9 min–25.1 min, sd 2.6 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (11–12, sd 0) (0.37 (0.36–0.38, sd 0.01)) | +171/−12 |
| #93 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 5/5 | 1.8 (1.0–3.0, sd 0.7) | $0.12 ($0.08–$0.15, sd $0.03) | 4.7 min (3.3 min–5.5 min, sd 0.7 min) | 4.8 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (10–11, sd 0) (0.44 (0.21–0.50, sd 0.11)) | +182/−15 |
| #93 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 1.4 (1.0–2.0, sd 0.5) | $0.13 ($0.10–$0.15, sd $0.02) | 7.8 min (3.3 min–15.5 min, sd 4.5 min) | 4.4 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (10–12, sd 1) (0.44 (0.21–0.50, sd 0.11)) | +212/−23 |
| #93 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 4/5 | 1.6 (1.0–3.0, sd 0.8) | $0.18 ($0.07–$0.50, sd $0.16) | 5.0 min (3.6 min–6.5 min, sd 1.2 min) | 4.6 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 10 (8–11, sd 1) (0.45 (0.25–0.50, sd 0.10)) | +193/−25 |
| #93 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 3 | 3/3 | 2.0 (1.0–3.0, sd 0.8) | $2.27 ($1.52–$3.23, sd $0.72) | 7.8 min (4.1 min–13.8 min, sd 4.3 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 9 (7–11, sd 2) (0.30 (0.27–0.33, sd 0.03)) | +195/−7 |
| #93 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 2.0 (1.0–3.0, sd 0.9) | $2.53 ($1.45–$3.82, sd $0.86) | 12.5 min (4.9 min–27.7 min, sd 8.1 min) | 4.6 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 10 (8–11, sd 1) (0.39 (0.23–0.55, sd 0.13)) | +200/−13 |
| #93 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 5/5 | 1.4 (1.0–2.0, sd 0.5) | $1.72 ($1.17–$2.90, sd $0.61) | 7.3 min (3.5 min–16.1 min, sd 4.7 min) | 4.4 (4.0–5.0, sd 0.5) | 4.8 (4.0–5.0, sd 0.4) | 3.8 (3.0–4.0, sd 0.4) | — | 9 (7–12, sd 2) (0.44 (0.27–0.60, sd 0.13)) | +197/−15 |
| #93 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 3 | 3/3 | 1.7 (1.0–2.0, sd 0.5) | $1.12 ($0.58–$1.57, sd $0.41) | 9.4 min (7.4 min–11.4 min, sd 1.6 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (10–11, sd 0) (0.40 (0.21–0.50, sd 0.13)) | +191/−27 |
| #93 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 2.6 (1.0–5.0, sd 1.4) | $1.17 ($0.77–$1.49, sd $0.24) | 19.1 min (9.4 min–53.7 min, sd 17.3 min) | 4.6 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 10 (9–12, sd 1) (0.51 (0.23–0.60, sd 0.14)) | +206/−24 |
| #93 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 5/5 | 2.0 (2.0–2.0, sd 0.0) | $1.09 ($0.67–$1.62, sd $0.34) | 9.8 min (4.0 min–23.4 min, sd 7.4 min) | 4.4 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 10 (9–10, sd 0) (0.54 (0.42–0.60, sd 0.07)) | +192/−25 |
| #93 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $3.56 ($2.98–$3.87, sd $0.41) | 5.9 min (4.3 min–7.4 min, sd 1.3 min) | 4.3 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.3 (3.0–4.0, sd 0.5) | — | 10 (9–10, sd 0) (0.22 (0.21–0.23, sd 0.01)) | +210/−6 |
| #93 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 1.6 (1.0–3.0, sd 0.8) | $3.10 ($2.31–$4.07, sd $0.65) | 15.9 min (5.4 min–33.4 min, sd 12.2 min) | 4.2 (4.0–5.0, sd 0.4) | 4.2 (4.0–5.0, sd 0.4) | 3.2 (3.0–4.0, sd 0.4) | — | 10 (9–11, sd 1) (0.22 (0.20–0.23, sd 0.01)) | +215/−8 |
| #93 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.80 ($0.53–$1.15, sd $0.20) | 8.8 min (0.7 min–20.6 min, sd 9.6 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | — | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +121/−2 |
| #93 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 5/5 | 2.0 (1.0–3.0, sd 0.6) | $0.06 ($0.04–$0.09, sd $0.02) | 9.2 min (5.6 min–14.2 min, sd 3.2 min) | 4.8 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 9 (7–10, sd 1) (0.40 (0.25–0.60, sd 0.15)) | +211/−15 |
| #93 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 2.0 (1.0–4.0, sd 1.1) | $0.06 ($0.03–$0.09, sd $0.02) | 7.8 min (4.8 min–10.5 min, sd 2.0 min) | 4.4 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 9 (7–11, sd 1) (0.29 (0.21–0.50, sd 0.11)) | +211/−9 |
| #93 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 3/5 | 0.8 (0.0–2.0, sd 0.7) | $0.04 ($0.01–$0.05, sd $0.02) | 3.0 min (0.7 min–5.1 min, sd 1.9 min) | 3.4 (1.0–5.0, sd 2.0) | 3.8 (2.0–5.0, sd 1.5) | 3.2 (2.0–4.0, sd 1.0) | — | 6 (3–9, sd 3) (0.19 (0.11–0.25, sd 0.06)) | +174/−5 |
| #93 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $0.85 ($0.73–$0.98, sd $0.10) | 6.4 min (4.4 min–10.4 min, sd 2.8 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–9, sd 0) (0.28 (0.23–0.36, sd 0.06)) | +205/−10 |
| #93 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 1.8 (1.0–3.0, sd 0.7) | $1.05 ($0.72–$1.35, sd $0.24) | 14.3 min (8.7 min–28.9 min, sd 7.7 min) | 4.4 (4.0–5.0, sd 0.5) | 4.8 (4.0–5.0, sd 0.4) | 3.6 (3.0–4.0, sd 0.5) | — | 8 (7–10, sd 1) (0.24 (0.21–0.27, sd 0.02)) | +225/−7 |
| #93 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 5/5 | 1.6 (1.0–3.0, sd 0.8) | $0.88 ($0.61–$1.30, sd $0.27) | 9.5 min (4.4 min–16.2 min, sd 4.0 min) | 4.6 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 9 (7–10, sd 1) (0.27 (0.21–0.33, sd 0.04)) | +217/−10 |
| #93 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $0.43 ($0.34–$0.50, sd $0.07) | 6.4 min (5.0 min–8.4 min, sd 1.4 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 3.3 (3.0–4.0, sd 0.5) | — | 9 (9–10, sd 0) (0.23 (0.21–0.23, sd 0.01)) | +192/−7 |
| #93 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 1.2 (1.0–2.0, sd 0.4) | $0.47 ($0.30–$0.70, sd $0.15) | 9.4 min (5.1 min–14.3 min, sd 4.1 min) | 4.0 (4.0–4.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | 2.8 (2.0–3.0, sd 0.4) | — | 9 (8–11, sd 1) (0.23 (0.20–0.25, sd 0.02)) | +203/−8 |
| #93 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.12 ($0.09–$0.16, sd $0.02) | 5.2 min (0.6 min–12.7 min, sd 5.4 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 3 (3–3, sd 0) (0.11 (0.11–0.11, sd 0.00)) | +121/−2 |
| #93 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 5 | 5/5 | 1.2 (1.0–2.0, sd 0.4) | $0.71 ($0.57–$1.12, sd $0.21) | 7.0 min (6.0 min–8.3 min, sd 1.0 min) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (3.0–5.0, sd 0.9) | 3.4 (2.0–4.0, sd 0.8) | — | 9 (7–11, sd 2) (0.36 (0.27–0.50, sd 0.09)) | +185/−14 |
| #93 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 5/5 | 2.2 (1.0–3.0, sd 0.7) | $0.91 ($0.58–$1.39, sd $0.38) | 10.9 min (6.9 min–14.2 min, sd 2.9 min) | 4.8 (4.0–5.0, sd 0.4) | 4.6 (4.0–5.0, sd 0.5) | 3.8 (3.0–4.0, sd 0.4) | — | 10 (7–15, sd 3) (0.37 (0.25–0.50, sd 0.10)) | +213/−20 |
| #93 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 2.4 (1.0–4.0, sd 1.0) | $1.26 ($0.52–$2.72, sd $0.82) | 10.6 min (6.2 min–17.0 min, sd 4.3 min) | 4.8 (4.0–5.0, sd 0.4) | 4.8 (4.0–5.0, sd 0.4) | 3.8 (3.0–4.0, sd 0.4) | — | 10 (7–13, sd 2) (0.33 (0.25–0.43, sd 0.07)) | +204/−20 |
| #93 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 5 | 5/5 | 1.0 (1.0–1.0, sd 0.0) | $2.15 ($1.17–$3.62, sd $0.83) | 11.8 min (7.7 min–17.2 min, sd 3.1 min) | 4.4 (3.0–5.0, sd 0.8) | 4.8 (4.0–5.0, sd 0.4) | 3.8 (3.0–4.0, sd 0.4) | — | 18 (6–63, sd 22) (0.31 (0.11–0.60, sd 0.16)) | +309/−129 |
| #93 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 5/5 | 1.0 (1.0–1.0, sd 0.0) | $1.90 ($1.59–$2.47, sd $0.31) | 10.8 min (8.0 min–12.9 min, sd 1.9 min) | 4.0 (3.0–5.0, sd 0.9) | 4.6 (4.0–5.0, sd 0.5) | 3.4 (2.0–4.0, sd 0.8) | — | 18 (5–61, sd 21) (0.37 (0.08–0.67, sd 0.21)) | +310/−127 |
| #93 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 1.0 (1.0–1.0, sd 0.0) | $1.98 ($1.38–$2.92, sd $0.58) | 11.5 min (7.6 min–17.4 min, sd 3.3 min) | 4.2 (3.0–5.0, sd 0.7) | 4.8 (4.0–5.0, sd 0.4) | 3.8 (3.0–4.0, sd 0.4) | — | 8 (5–9, sd 1) (0.46 (0.27–0.60, sd 0.14)) | +176/−11 |
| #93 small | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 58.8 min | — | — | — | — | 10 (0.31) | +222/−10 |
| #93 small | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 2 | 1/2 | 0.5 (0.0–1.0, sd 0.5) | $1.17 ($0.00–$2.35, sd $1.17) | 66.0 min (50.1 min–81.8 min, sd 15.8 min) | — | — | — | — | 12 (11–12, sd 1) (0.43 (0.29–0.58, sd 0.15)) | +176/−12 |
| #93 small | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 3/5 | 0.6 (0.0–1.0, sd 0.5) | $1.71 ($0.00–$3.48, sd $1.47) | 63.5 min (44.1 min–90.7 min, sd 15.6 min) | 4.2 (4.0–5.0, sd 0.4) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 10 (9–12, sd 1) (0.54 (0.38–0.78, sd 0.14)) | +231/−12 |
| #93 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 5 | 5/5 | 0.4 (0.0–1.0, sd 0.5) | $2.48 ($1.59–$3.14, sd $0.59) | 10.4 min (4.9 min–17.7 min, sd 4.3 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.6 (4.0–5.0, sd 0.5) | — | 9 (8–10, sd 1) (0.74 (0.67–0.78, sd 0.05)) | +177/−13 |
| #93 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $3.20 ($1.49–$5.66, sd $1.61) | 12.4 min (6.1 min–18.7 min, sd 5.5 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.2 (4.0–5.0, sd 0.4) | — | 9 (9–9, sd 0) (0.65 (0.45–0.78, sd 0.16)) | +173/−15 |
| #93 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 0.2 (0.0–1.0, sd 0.4) | $2.36 ($0.91–$4.09, sd $1.08) | 10.1 min (4.4 min–18.6 min, sd 5.4 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (9–12, sd 1) (0.44 (0.36–0.78, sd 0.17)) | +170/−12 |
| #93 small | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 small | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.13 | 1.0 min | 1.0 | 1.0 | 1.0 | 1/1 | 2 (0.00) | +152/−0 |
| #94 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.17 ($0.12–$0.21, sd $0.04) | 1.3 min (0.9 min–1.5 min, sd 0.3 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 5/5 | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +154/−0 |
| #94 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.07 | 11.4 min | 1.0 | 1.0 | 1.0 | 1/1 | 3 (0.13) | +89/−1 |
| #94 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 4 | 0/4 | 0.0 (0.0–0.0, sd 0.0) | $0.07 ($0.07–$0.08, sd $0.00) | 8.8 min (1.0 min–11.7 min, sd 4.5 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.5 (1.0–2.0, sd 0.5) | 4/4 | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +102/−0 |
| #94 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.07 ($0.06–$0.08, sd $0.01) | 5.1 min (0.7 min–12.1 min, sd 5.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 5/5 | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +102/−0 |
| #94 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.16 | 38.8 min | 1.0 | 1.0 | 2.0 | 1/1 | 3 (0.13) | +81/−0 |
| #94 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.34 ($0.28–$0.37, sd $0.03) | 11.1 min (0.9 min–18.3 min, sd 8.3 min) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +89/−0 |
| #94 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.30 | 41.4 min | 1.0 | 1.0 | 1.0 | 1/1 | 3 (0.13) | +99/−0 |
| #94 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.31 ($0.24–$0.53, sd $0.11) | 20.5 min (18.7 min–21.5 min, sd 1.0 min) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 1.6 (1.0–2.0, sd 0.5) | 5/5 | 3 (2–3, sd 0) (0.07 (0.00–0.13, sd 0.06)) | +98/−1 |
| #94 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.13 | 16.6 min | 1.0 | 1.0 | 2.0 | 1/1 | 2 (0.00) | +73/−0 |
| #94 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.13 ($0.12–$0.15, sd $0.01) | 6.1 min (0.5 min–14.3 min, sd 6.7 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 5/5 | 2 (2–3, sd 0) (0.05 (0.00–0.13, sd 0.06)) | +77/−0 |
| #94 small | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.04 ($0.03–$0.04, sd $0.00) | 1.4 min (0.9 min–3.1 min, sd 0.8 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +78/−2 |
| #94 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.04 ($0.03–$0.04, sd $0.00) | 2.7 min (1.2 min–4.7 min, sd 1.5 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +88/−2 |
| #94 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.75 ($0.04–$2.63, sd $1.01) | 1.7 min (1.0 min–2.9 min, sd 0.7 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +72/−2 |
| #94 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.55 | 9.0 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.13) | +69/−3 |
| #94 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.54 ($0.44–$0.65, sd $0.07) | 3.9 min (0.8 min–8.3 min, sd 3.6 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +72/−2 |
| #94 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.56 ($0.42–$0.68, sd $0.09) | 5.2 min (0.8 min–8.1 min, sd 3.3 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +72/−2 |
| #94 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.31 | 2.6 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.13) | +69/−3 |
| #94 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.34 ($0.28–$0.45, sd $0.06) | 5.5 min (2.2 min–10.1 min, sd 3.7 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +80/−2 |
| #94 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.38 ($0.32–$0.42, sd $0.04) | 5.8 min (1.0 min–9.2 min, sd 3.8 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +77/−2 |
| #94 small | dod | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.78 | 1.5 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.13) | +100/−2 |
| #94 small | dod | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.79 ($0.68–$1.07, sd $0.15) | 7.2 min (1.3 min–12.1 min, sd 4.6 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–4, sd 0) (0.12 (0.11–0.13, sd 0.01)) | +103/−2 |
| #94 small | dod | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.79 ($0.67–$0.88, sd $0.07) | 8.5 min (1.0 min–10.5 min, sd 3.7 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +102/−2 |
| #94 small | dod | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.01 ($0.01–$0.02, sd $0.00) | 1.6 min (0.7 min–3.7 min, sd 1.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 3 (2–3, sd 0) (0.10 (0.00–0.13, sd 0.05)) | +77/−1 |
| #94 small | dod | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.01 ($0.01–$0.02, sd $0.00) | 1.8 min (0.7 min–5.0 min, sd 1.6 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 3 (2–3, sd 0) (0.10 (0.00–0.13, sd 0.05)) | +75/−2 |
| #94 small | dod | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.72 ($0.01–$3.55, sd $1.41) | 1.1 min (0.9 min–1.3 min, sd 0.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +75/−2 |
| #94 small | dod | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.31 | 2.6 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.13) | +83/−2 |
| #94 small | dod | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.38 ($0.32–$0.44, sd $0.04) | 7.7 min (6.6 min–8.8 min, sd 0.8 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +83/−2 |
| #94 small | dod | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.34 ($0.28–$0.48, sd $0.07) | 4.9 min (2.0 min–7.2 min, sd 2.2 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +89/−2 |
| #94 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.12 | 1.4 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.13) | +96/−2 |
| #94 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.13 ($0.11–$0.18, sd $0.02) | 4.1 min (1.4 min–6.0 min, sd 2.1 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +96/−2 |
| #94 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.12 ($0.10–$0.17, sd $0.02) | 6.0 min (4.8 min–6.5 min, sd 0.6 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +99/−2 |
| #94 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.11 | 1.1 min | 4.0 | 4.0 | 4.0 | 1/1 | 5 (0.38) | +123/−4 |
| #94 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.10 ($0.00–$0.16, sd $0.06) | 14.5 min (0.6 min–33.9 min, sd 12.1 min) | 1.6 (1.0–4.0, sd 1.2) | 2.4 (1.0–5.0, sd 1.4) | 2.2 (1.0–4.0, sd 1.0) | 5/5 | 4 (2–5, sd 1) (0.19 (0.00–0.25, sd 0.10)) | +109/−4 |
| #94 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.19 ($0.00–$0.44, sd $0.18) | 20.4 min (2.5 min–33.0 min, sd 11.3 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 4 (4–4, sd 0) (0.25 (0.25–0.25, sd 0.00)) | +107/−2 |
| #94 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 48.1 min | — | — | — | 1/1 | 3 (0.13) | +98/−2 |
| #94 small | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 2 | 0/2 | 0.0 (0.0–0.0, sd 0.0) | $0.57 ($0.54–$0.60, sd $0.03) | 26.7 min (26.1 min–27.3 min, sd 0.6 min) | — | — | — | 2/2 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +94/−2 |
| #94 small | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.66 ($0.00–$1.46, sd $0.57) | 19.5 min (6.7 min–35.7 min, sd 10.9 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +81/−2 |
| #94 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.81 | 31.2 min | — | — | — | 1/1 | 3 (0.13) | +69/−2 |
| #94 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.62 ($0.28–$0.98, sd $0.26) | 24.8 min (5.2 min–46.9 min, sd 13.3 min) | — | — | — | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +89/−2 |
| #94 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.54 ($0.24–$0.94, sd $0.27) | 30.3 min (3.0 min–42.9 min, sd 15.4 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +88/−4 |
| #94 small | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 5 | 1/5 | 0.8 (0.0–1.0, sd 0.4) | $0.46 ($0.18–$0.77, sd $0.20) | 2.1 min (1.0 min–3.0 min, sd 0.7 min) | 4.8 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.8 (4.0–5.0, sd 0.4) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +147/−27 |
| #94 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 6 | 1/6 | 0.8 (0.0–1.0, sd 0.4) | $0.48 ($0.29–$0.76, sd $0.18) | 2.2 min (0.8 min–4.2 min, sd 1.4 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.7 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +156/−27 |
| #94 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.43 ($0.29–$0.83, sd $0.20) | 1.7 min (1.0 min–2.5 min, sd 0.6 min) | 4.8 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.6 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +147/−27 |
| #94 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.29 ($0.19–$0.61, sd $0.16) | 1.5 min (0.7 min–2.8 min, sd 0.7 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.6 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +137/−27 |
| #94 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 6 | 0/6 | 1.0 (1.0–1.0, sd 0.0) | $0.24 ($0.18–$0.31, sd $0.04) | 0.9 min (0.8 min–1.0 min, sd 0.1 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +137/−27 |
| #94 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.71 ($0.18–$1.62, sd $0.62) | 0.9 min (0.8 min–1.0 min, sd 0.1 min) | 4.8 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.8 (4.0–5.0, sd 0.4) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +140/−27 |
| #94 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.17 | 19.5 min | 5.0 | 5.0 | 5.0 | — | 8 (0.75) | +137/−27 |
| #94 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.17 ($0.14–$0.19, sd $0.02) | 4.4 min (0.8 min–18.6 min, sd 7.1 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.8 (4.0–5.0, sd 0.4) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +138/−27 |
| #94 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.09 | 40.3 min | 5.0 | 5.0 | 5.0 | — | 8 (0.75) | +146/−27 |
| #94 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.27 ($0.23–$0.32, sd $0.03) | 1.4 min (1.2 min–1.6 min, sd 0.1 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +141/−27 |
| #94 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.09 | 0.9 min | 5.0 | 5.0 | 5.0 | — | 8 (0.75) | +134/−27 |
| #94 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.08 ($0.06–$0.08, sd $0.01) | 3.2 min (0.7 min–12.7 min, sd 4.7 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +135/−27 |
| #94 small | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.02 ($0.01–$0.02, sd $0.00) | 1.7 min (0.8 min–3.6 min, sd 1.1 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.6 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +141/−27 |
| #94 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.02 ($0.02–$0.03, sd $0.00) | 3.4 min (0.9 min–5.5 min, sd 2.0 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.8 (4.0–5.0, sd 0.4) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +142/−27 |
| #94 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.05 ($0.01–$0.20, sd $0.07) | 1.8 min (0.8 min–3.0 min, sd 1.0 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +142/−27 |
| #94 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.29 | 1.2 min | 5.0 | 5.0 | 5.0 | — | 8 (0.75) | +142/−27 |
| #94 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.27 ($0.21–$0.35, sd $0.05) | 4.3 min (0.9 min–10.5 min, sd 4.3 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +140/−27 |
| #94 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.26 ($0.24–$0.27, sd $0.01) | 5.4 min (0.8 min–15.4 min, sd 5.6 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.4 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +139/−27 |
| #94 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.15 | 1.4 min | 5.0 | 5.0 | 5.0 | — | 8 (0.75) | +134/−27 |
| #94 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.16 ($0.14–$0.18, sd $0.02) | 4.6 min (0.9 min–10.5 min, sd 4.4 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.6 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +138/−27 |
| #94 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.12 ($0.10–$0.15, sd $0.01) | 1.5 min (0.7 min–3.3 min, sd 0.9 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +141/−27 |
| #94 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.53 | 2.6 min | 5.0 | 5.0 | 5.0 | — | 8 (0.75) | +144/−27 |
| #94 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.48 ($0.45–$0.51, sd $0.02) | 5.0 min (1.0 min–10.7 min, sd 4.6 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +143/−27 |
| #94 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.48 ($0.44–$0.56, sd $0.04) | 13.0 min (3.2 min–20.5 min, sd 6.7 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.8 (4.0–5.0, sd 0.4) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +142/−27 |
| #94 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.01 ($0.01–$0.01, sd $0.00) | 4.0 min (1.1 min–9.1 min, sd 2.8 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.6 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +140/−27 |
| #94 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.01 ($0.01–$0.01, sd $0.00) | 2.5 min (0.8 min–5.4 min, sd 2.1 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.8 (4.0–5.0, sd 0.4) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +142/−27 |
| #94 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.01 ($0.00–$0.01, sd $0.00) | 1.0 min (0.8 min–1.2 min, sd 0.1 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.4 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +140/−27 |
| #94 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.17 | 2.3 min | 5.0 | 5.0 | 5.0 | — | 8 (0.75) | +143/−27 |
| #94 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.14 ($0.11–$0.17, sd $0.02) | 3.7 min (1.3 min–7.4 min, sd 2.7 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +142/−27 |
| #94 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.15 ($0.11–$0.17, sd $0.02) | 4.4 min (1.1 min–15.0 min, sd 5.3 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.6 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +141/−27 |
| #94 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.08 | 2.6 min | 5.0 | 5.0 | 5.0 | — | 8 (0.75) | +141/−27 |
| #94 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $0.07 ($0.07–$0.09, sd $0.01) | 1.9 min (0.9 min–5.5 min, sd 1.8 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.8 (4.0–5.0, sd 0.4) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +142/−27 |
| #94 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.08 ($0.07–$0.10, sd $0.01) | 5.1 min (1.2 min–10.9 min, sd 3.4 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.6 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +141/−27 |
| #94 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 1/3 | 0.7 (0.0–1.0, sd 0.5) | $0.25 ($0.08–$0.40, sd $0.13) | 2.4 min (1.4 min–3.4 min, sd 0.8 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.3 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +142/−27 |
| #94 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 1/5 | 0.8 (0.0–1.0, sd 0.4) | $0.20 ($0.09–$0.40, sd $0.12) | 4.8 min (1.3 min–17.4 min, sd 6.3 min) | 4.8 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.6 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +146/−27 |
| #94 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.13 ($0.06–$0.27, sd $0.07) | 4.9 min (1.2 min–16.5 min, sd 5.8 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +143/−27 |
| #94 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.28 ($0.25–$0.31, sd $0.03) | 1.8 min (1.6 min–1.9 min, sd 0.1 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.7 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−27 |
| #94 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.24 ($0.21–$0.27, sd $0.02) | 1.8 min (1.7 min–1.9 min, sd 0.1 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +144/−27 |
| #94 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.28 ($0.20–$0.35, sd $0.06) | 2.2 min (2.0 min–2.3 min, sd 0.1 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.7 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +146/−27 |
| #94 small | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.10 | 24.5 min | — | — | — | — | 8 (0.75) | +137/−27 |
| #94 small | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 2 | 0/2 | 1.0 (1.0–1.0, sd 0.0) | $0.10 ($0.08–$0.11, sd $0.01) | 37.2 min (26.2 min–48.2 min, sd 11.0 min) | — | — | — | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +138/−27 |
| #94 small | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $0.80 ($0.07–$1.49, sd $0.45) | 16.6 min (5.5 min–25.7 min, sd 8.9 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.8 (4.0–5.0, sd 0.4) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +138/−27 |
| #94 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.52 ($0.45–$0.64, sd $0.09) | 3.8 min (2.4 min–4.7 min, sd 1.0 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +129/−27 |
| #94 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 5 | 4/5 | 0.2 (0.0–1.0, sd 0.4) | $0.45 ($0.23–$0.58, sd $0.14) | 7.5 min (1.9 min–24.8 min, sd 8.7 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.7 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +137/−27 |
| #94 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.64 ($0.40–$1.00, sd $0.23) | 11.6 min (3.0 min–27.1 min, sd 10.2 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.8 (4.0–5.0, sd 0.4) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +139/−27 |
| #94 small | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 5 | 5/5 | 2.6 (2.0–4.0, sd 0.8) | $0.86 ($0.57–$1.35, sd $0.29) | 10.0 min (7.2 min–16.5 min, sd 3.5 min) | 4.4 (4.0–5.0, sd 0.5) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–10, sd 2) (0.57 (0.38–0.75, sd 0.17)) | +140/−24 |
| #94 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 6 | 6/6 | 2.3 (2.0–3.0, sd 0.5) | $1.10 ($0.48–$2.66, sd $0.74) | 8.9 min (5.0 min–12.8 min, sd 3.1 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 3.8 (3.0–4.0, sd 0.4) | — | 8 (5–17, sd 4) (0.50 (0.35–0.75, sd 0.18)) | +153/−31 |
| #94 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 5/5 | 1.8 (1.0–3.0, sd 0.7) | $1.00 ($0.62–$1.29, sd $0.25) | 8.8 min (5.3 min–12.9 min, sd 2.9 min) | 4.4 (4.0–5.0, sd 0.5) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.68 (0.38–0.75, sd 0.15)) | +135/−23 |
| #94 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 5 | 1/5 | 1.2 (1.0–2.0, sd 0.4) | $0.19 ($0.13–$0.24, sd $0.04) | 2.9 min (2.0 min–3.6 min, sd 0.7 min) | 2.4 (2.0–4.0, sd 0.8) | 3.6 (3.0–4.0, sd 0.5) | 3.8 (3.0–4.0, sd 0.4) | — | 6 (5–7, sd 1) (0.35 (0.30–0.38, sd 0.03)) | +113/−6 |
| #94 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.21 ($0.16–$0.25, sd $0.04) | 3.2 min (2.6 min–3.9 min, sd 0.5 min) | 3.2 (2.0–5.0, sd 1.5) | 4.2 (3.0–5.0, sd 0.7) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.60 (0.38–0.75, sd 0.18)) | +119/−11 |
| #94 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 2/5 | 1.0 (1.0–1.0, sd 0.0) | $0.17 ($0.13–$0.21, sd $0.03) | 2.8 min (2.1 min–3.9 min, sd 0.6 min) | 4.6 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–8, sd 1) (0.53 (0.38–0.75, sd 0.18)) | +107/−13 |
| #94 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 1/1 | 1.0 | $0.48 | 77.5 min | 5.0 | 5.0 | 4.0 | — | 8 (0.75) | +155/−25 |
| #94 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 2/5 | 1.0 (0.0–2.0, sd 0.9) | $0.45 ($0.00–$0.94, sd $0.39) | 54.6 min (34.6 min–74.2 min, sd 15.5 min) | 4.2 (2.0–5.0, sd 1.2) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (7–8, sd 0) (0.72 (0.63–0.75, sd 0.05)) | +169/−23 |
| #94 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 40.7 min | 2.0 | 5.0 | 4.0 | — | 6 (0.33) | +149/−4 |
| #94 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 1/5 | 0.8 (0.0–2.0, sd 0.7) | $0.29 ($0.00–$1.01, sd $0.38) | 59.4 min (29.5 min–96.1 min, sd 25.6 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–8, sd 1) (0.52 (0.33–0.75, sd 0.19)) | +123/−14 |
| #94 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 3.0 | $0.28 | 85.7 min | 4.0 | 5.0 | 4.0 | — | 5 (0.38) | +85/−3 |
| #94 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 5/5 | 2.4 (2.0–3.0, sd 0.5) | $0.27 ($0.22–$0.30, sd $0.03) | 44.8 min (2.5 min–65.2 min, sd 21.8 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 5 (5–5, sd 0) (0.38 (0.38–0.38, sd 0.00)) | +86/−3 |
| #94 small | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 5 | 5/5 | 1.0 (1.0–1.0, sd 0.0) | $0.10 ($0.08–$0.13, sd $0.02) | 12.0 min (10.1 min–15.7 min, sd 2.0 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 5 (5–5, sd 0) (0.38 (0.38–0.38, sd 0.00)) | +96/−5 |
| #94 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 5/5 | 2.4 (1.0–6.0, sd 1.9) | $0.12 ($0.07–$0.25, sd $0.07) | 9.7 min (3.6 min–23.6 min, sd 7.2 min) | 4.8 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.68 (0.38–0.75, sd 0.15)) | +132/−23 |
| #94 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 2.4 (1.0–3.0, sd 0.8) | $0.18 ($0.13–$0.22, sd $0.03) | 16.0 min (5.9 min–24.8 min, sd 6.6 min) | 3.8 (2.0–5.0, sd 1.2) | 5.0 (5.0–5.0, sd 0.0) | 3.6 (3.0–4.0, sd 0.5) | — | 9 (8–10, sd 1) (0.69 (0.60–0.75, sd 0.06)) | +172/−35 |
| #94 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 3/5 | 2.4 (1.0–4.0, sd 1.0) | $0.12 ($0.06–$0.19, sd $0.04) | 9.1 min (4.4 min–15.3 min, sd 4.0 min) | 4.0 (3.0–5.0, sd 0.6) | 4.8 (4.0–5.0, sd 0.4) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (6–8, sd 1) (0.48 (0.30–0.75, sd 0.16)) | +149/−10 |
| #94 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 3.0 | $2.46 | 9.0 min | 5.0 | 5.0 | 4.0 | — | 8 (0.75) | +156/−27 |
| #94 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 4/5 | 1.6 (1.0–2.0, sd 0.5) | $2.03 ($1.49–$3.30, sd $0.65) | 24.4 min (5.0 min–45.2 min, sd 14.0 min) | 4.2 (4.0–5.0, sd 0.4) | 4.8 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.68 (0.38–0.75, sd 0.15)) | +138/−23 |
| #94 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 5/5 | 2.0 (2.0–2.0, sd 0.0) | $1.47 ($1.23–$1.81, sd $0.19) | 17.9 min (6.9 min–30.7 min, sd 8.5 min) | 4.2 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (6–8, sd 1) (0.50 (0.33–0.75, sd 0.20)) | +141/−15 |
| #94 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $2.66 | 39.3 min | 4.0 | 4.0 | 4.0 | — | 7 (0.63) | +135/−26 |
| #94 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 2.2 (2.0–3.0, sd 0.4) | $1.17 ($0.83–$1.59, sd $0.25) | 26.4 min (8.5 min–50.9 min, sd 15.9 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +150/−27 |
| #94 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 4/5 | 1.8 (1.0–3.0, sd 0.7) | $0.77 ($0.48–$1.01, sd $0.19) | 21.8 min (7.3 min–29.1 min, sd 8.0 min) | 4.6 (4.0–5.0, sd 0.5) | 4.8 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.60 (0.38–0.75, sd 0.18)) | +133/−19 |
| #94 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $1.33 | 3.0 min | 1.0 | 2.0 | 2.0 | — | 3 (0.13) | +89/−1 |
| #94 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 1/5 | 0.8 (0.0–2.0, sd 0.7) | $2.17 ($1.42–$3.25, sd $0.65) | 25.6 min (1.7 min–63.5 min, sd 21.2 min) | 3.0 (1.0–5.0, sd 1.7) | 3.8 (2.0–5.0, sd 1.5) | 3.2 (2.0–4.0, sd 1.0) | — | 5 (3–7, sd 2) (0.23 (0.13–0.30, sd 0.09)) | +124/−5 |
| #94 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.80 ($0.71–$0.86, sd $0.06) | 12.8 min (1.5 min–21.0 min, sd 7.3 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +89/−1 |
| #94 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 1/5 | 1.0 (1.0–1.0, sd 0.0) | $0.03 ($0.02–$0.04, sd $0.01) | 8.9 min (4.3 min–16.4 min, sd 4.3 min) | 4.2 (4.0–5.0, sd 0.4) | 3.6 (3.0–5.0, sd 0.8) | 3.8 (3.0–4.0, sd 0.4) | — | 5 (5–6, sd 0) (0.37 (0.33–0.38, sd 0.02)) | +120/−4 |
| #94 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 2/5 | 1.8 (1.0–4.0, sd 1.2) | $0.05 ($0.03–$0.10, sd $0.03) | 16.6 min (10.0 min–26.5 min, sd 5.9 min) | 3.8 (2.0–5.0, sd 1.0) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–8, sd 1) (0.48 (0.33–0.75, sd 0.17)) | +147/−14 |
| #94 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 4/5 | 1.4 (1.0–2.0, sd 0.5) | $0.03 ($0.03–$0.04, sd $0.01) | 4.5 min (2.7 min–5.8 min, sd 1.2 min) | 4.2 (4.0–5.0, sd 0.4) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–6, sd 0) (0.34 (0.33–0.38, sd 0.02)) | +139/−5 |
| #94 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.69 | 4.9 min | 4.0 | 3.0 | 3.0 | — | 6 (0.20) | +144/−3 |
| #94 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 3/5 | 1.2 (1.0–2.0, sd 0.4) | $0.73 ($0.58–$0.91, sd $0.11) | 22.2 min (15.5 min–28.7 min, sd 5.5 min) | 4.6 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (6–9, sd 1) (0.39 (0.30–0.67, sd 0.14)) | +157/−6 |
| #94 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 3/5 | 1.0 (1.0–1.0, sd 0.0) | $0.62 ($0.52–$0.73, sd $0.07) | 13.9 min (5.8 min–20.3 min, sd 4.7 min) | 3.8 (2.0–5.0, sd 1.0) | 4.8 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (6–6, sd 0) (0.33 (0.33–0.33, sd 0.00)) | +152/−5 |
| #94 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.22 | 1.7 min | 1.0 | 2.0 | 2.0 | — | 3 (0.13) | +89/−1 |
| #94 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 2/5 | 1.0 (1.0–1.0, sd 0.0) | $0.34 ($0.30–$0.38, sd $0.03) | 16.5 min (11.8 min–23.4 min, sd 5.2 min) | 4.0 (4.0–4.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (6–7, sd 0) (0.31 (0.30–0.33, sd 0.01)) | +139/−7 |
| #94 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $0.27 ($0.12–$0.39, sd $0.11) | 17.1 min (3.0 min–32.4 min, sd 11.2 min) | 3.0 (1.0–5.0, sd 1.7) | 3.8 (2.0–5.0, sd 1.5) | 3.2 (2.0–4.0, sd 1.0) | — | 5 (3–7, sd 2) (0.24 (0.13–0.33, sd 0.10)) | +120/−3 |
| #94 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $0.48 ($0.40–$0.62, sd $0.10) | 6.3 min (4.4 min–9.1 min, sd 2.0 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–8, sd 1) (0.54 (0.38–0.75, sd 0.16)) | +121/−12 |
| #94 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 4/5 | 2.2 (1.0–4.0, sd 1.0) | $0.76 ($0.39–$1.08, sd $0.29) | 37.1 min (5.5 min–110.3 min, sd 41.3 min) | 4.6 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.51 (0.33–0.75, sd 0.20)) | +147/−13 |
| #94 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 4/5 | 1.0 (0.0–2.0, sd 0.6) | $0.25 ($0.00–$0.44, sd $0.14) | 23.7 min (3.9 min–65.5 min, sd 24.1 min) | 4.4 (2.0–5.0, sd 1.2) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–8, sd 1) (0.43 (0.33–0.75, sd 0.16)) | +134/−10 |
| #94 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 1.0 (1.0–1.0, sd 0.0) | $2.03 ($1.58–$2.37, sd $0.33) | 10.5 min (9.0 min–11.4 min, sd 1.1 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.63 (0.38–0.75, sd 0.18)) | +137/−19 |
| #94 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $1.93 ($1.75–$2.11, sd $0.15) | 10.5 min (8.4 min–12.6 min, sd 1.7 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.63 (0.38–0.75, sd 0.18)) | +128/−19 |
| #94 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 1.7 (1.0–2.0, sd 0.5) | $2.01 ($1.64–$2.65, sd $0.46) | 14.7 min (11.2 min–18.3 min, sd 2.9 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.3 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +147/−27 |
| #94 small | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 1/1 | 1.0 | $0.89 | 73.4 min | — | — | — | — | 8 (0.75) | +142/−27 |
| #94 small | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 1 | 0/1 | 0.0 | $0.00 | 51.8 min | — | — | — | — | 7 (0.63) | +143/−27 |
| #94 small | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 3/5 | 1.2 (1.0–2.0, sd 0.4) | $1.95 ($1.13–$2.70, sd $0.67) | 76.6 min (61.4 min–92.5 min, sd 12.2 min) | 4.8 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.57 (0.38–0.75, sd 0.15)) | +119/−13 |
| #94 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 2/3 | 1.3 (1.0–2.0, sd 0.5) | $2.08 ($1.60–$2.66, sd $0.44) | 11.3 min (5.4 min–15.1 min, sd 4.3 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +133/−27 |
| #94 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 5 | 3/5 | 1.2 (0.0–2.0, sd 0.7) | $1.92 ($0.00–$3.68, sd $1.48) | 37.1 min (9.4 min–95.9 min, sd 32.1 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.7 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +138/−30 |
| #94 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 1.2 (1.0–2.0, sd 0.4) | $2.66 ($1.88–$3.84, sd $0.67) | 46.4 min (11.4 min–95.2 min, sd 37.2 min) | 4.8 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (6–8, sd 1) (0.70 (0.50–0.75, sd 0.10)) | +131/−21 |
| #94 small | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #94 small | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.15 | 12.5 min | 1.0 | 1.0 | 1.0 | 1/1 | 2 (0.00) | +189/−0 |
| #95 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.15 ($0.15–$0.16, sd $0.00) | 10.2 min (1.1 min–23.9 min, sd 8.5 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 5/5 | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +194/−0 |
| #95 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.07 | 1.0 min | 1.0 | 1.0 | 2.0 | 1/1 | 2 (0.00) | +115/−0 |
| #95 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 4 | 0/4 | 0.0 (0.0–0.0, sd 0.0) | $0.05 ($0.00–$0.08, sd $0.03) | 11.4 min (1.0 min–21.4 min, sd 7.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.3 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | 4/4 | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +100/−0 |
| #95 small | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.06 ($0.04–$0.07, sd $0.01) | 12.9 min (10.7 min–21.2 min, sd 4.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +113/−0 |
| #95 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.40 | 19.2 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.13) | +93/−6 |
| #95 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.37 ($0.28–$0.42, sd $0.05) | 14.6 min (1.0 min–19.5 min, sd 6.9 min) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 3 (2–3, sd 0) (0.07 (0.00–0.13, sd 0.06)) | +97/−2 |
| #95 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.27 | 21.6 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.13) | +116/−6 |
| #95 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.40 ($0.24–$0.57, sd $0.13) | 12.5 min (2.8 min–21.4 min, sd 7.9 min) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 3 (2–3, sd 0) (0.07 (0.00–0.13, sd 0.06)) | +122/−1 |
| #95 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.12 | 0.5 min | 1.0 | 1.0 | 2.0 | 1/1 | 2 (0.00) | +76/−0 |
| #95 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.13 ($0.12–$0.15, sd $0.01) | 6.1 min (0.5 min–16.2 min, sd 6.8 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 5/5 | 2 (2–3, sd 0) (0.03 (0.00–0.13, sd 0.05)) | +78/−0 |
| #95 small | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.04 ($0.03–$0.05, sd $0.01) | 2.4 min (0.9 min–3.4 min, sd 1.0 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 4/5 | 3 (2–3, sd 0) (0.10 (0.00–0.13, sd 0.05)) | +86/−3 |
| #95 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.04 ($0.03–$0.05, sd $0.01) | 2.6 min (1.2 min–4.6 min, sd 1.4 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +90/−3 |
| #95 small | dod | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.32 ($0.03–$3.30, sd $1.57) | 2.0 min (0.8 min–3.9 min, sd 1.2 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +84/−4 |
| #95 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.51 | 1.2 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.13) | +127/−4 |
| #95 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.55 ($0.49–$0.68, sd $0.07) | 7.3 min (1.0 min–9.6 min, sd 3.2 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +85/−4 |
| #95 small | dod | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.58 ($0.45–$0.74, sd $0.10) | 5.0 min (0.9 min–7.7 min, sd 3.2 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +88/−4 |
| #95 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.33 | 8.8 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.13) | +79/−4 |
| #95 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.39 ($0.32–$0.48, sd $0.07) | 8.5 min (1.3 min–12.0 min, sd 3.7 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +91/−4 |
| #95 small | dod | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.32 ($0.16–$0.44, sd $0.10) | 4.6 min (0.6 min–9.5 min, sd 4.0 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +91/−4 |
| #95 small | dod | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $1.08 | 11.7 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.13) | +87/−4 |
| #95 small | dod | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.87 ($0.75–$1.02, sd $0.09) | 7.4 min (2.6 min–10.8 min, sd 3.8 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–4, sd 0) (0.12 (0.11–0.13, sd 0.01)) | +94/−4 |
| #95 small | dod | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.82 ($0.63–$0.92, sd $0.11) | 10.6 min (10.2 min–11.0 min, sd 0.3 min) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 1.6 (1.0–2.0, sd 0.5) | 4/4 | 2 (0–3, sd 1) (0.10 (0.00–0.13, sd 0.05)) | +74/−3 |
| #95 small | dod | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.01 ($0.01–$0.02, sd $0.00) | 3.1 min (0.7 min–5.1 min, sd 1.8 min) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +73/−3 |
| #95 small | dod | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.02 ($0.01–$0.03, sd $0.01) | 4.0 min (1.3 min–4.8 min, sd 1.4 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +84/−3 |
| #95 small | dod | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.01 ($0.01–$0.01, sd $0.00) | 1.2 min (0.8 min–1.7 min, sd 0.3 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +74/−3 |
| #95 small | dod | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.31 | 8.8 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.13) | +80/−3 |
| #95 small | dod | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.38 ($0.27–$0.45, sd $0.06) | 7.6 min (6.8 min–8.4 min, sd 0.6 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +90/−4 |
| #95 small | dod | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.42 ($0.32–$0.54, sd $0.07) | 6.1 min (2.4 min–7.4 min, sd 1.9 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +97/−4 |
| #95 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.18 | 6.7 min | 1.0 | 2.0 | 2.0 | 1/1 | 3 (0.13) | +101/−4 |
| #95 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.13 ($0.11–$0.15, sd $0.01) | 5.0 min (1.4 min–6.0 min, sd 1.8 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +98/−4 |
| #95 small | dod | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.15 ($0.12–$0.21, sd $0.03) | 4.9 min (1.7 min–6.1 min, sd 1.6 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +86/−4 |
| #95 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.14 | 22.1 min | 1.0 | 2.0 | 2.0 | 1/1 | 4 (0.25) | +174/−3 |
| #95 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.23 ($0.09–$0.64, sd $0.20) | 14.7 min (1.3 min–19.8 min, sd 6.8 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 1/4 | 3 (0–4, sd 2) (0.20 (0.00–0.25, sd 0.10)) | +129/−3 |
| #95 small | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.11 ($0.00–$0.19, sd $0.06) | 17.7 min (1.7 min–33.0 min, sd 10.1 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 3/5 | 4 (4–4, sd 0) (0.25 (0.25–0.25, sd 0.00)) | +177/−5 |
| #95 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.56 | 27.5 min | — | — | — | 1/1 | 3 (0.13) | +94/−6 |
| #95 small | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 1 | 0/1 | 0.0 | $0.26 | 26.7 min | — | — | — | 1/1 | 3 (0.13) | +94/−6 |
| #95 small | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.73 ($0.00–$1.47, sd $0.53) | 24.3 min (8.5 min–36.7 min, sd 9.1 min) | 1.0 (1.0–1.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +121/−6 |
| #95 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.92 | 66.1 min | — | — | — | 1/1 | 3 (0.13) | +97/−6 |
| #95 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.95 ($0.47–$1.44, sd $0.36) | 26.5 min (24.9 min–28.4 min, sd 1.4 min) | — | — | — | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +99/−6 |
| #95 small | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.63 ($0.34–$1.48, sd $0.43) | 28.8 min (5.2 min–46.6 min, sd 14.7 min) | 1.0 (1.0–1.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | 5/5 | 3 (3–3, sd 0) (0.13 (0.13–0.13, sd 0.00)) | +104/−5 |
| #95 small | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 23.2 min | 5.0 | 5.0 | 4.0 | — | 8 (0.75) | +147/−24 |
| #95 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 4/5 | 0.0 (0.0–0.0, sd 0.0) | $0.05 ($0.00–$0.07, sd $0.03) | 5.1 min (0.8 min–22.2 min, sd 8.6 min) | 4.6 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +147/−24 |
| #95 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.03 | 0.7 min | 4.0 | 5.0 | 4.0 | — | 8 (0.75) | +148/−24 |
| #95 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 4 | 2/4 | 0.5 (0.0–1.0, sd 0.5) | $0.03 ($0.02–$0.03, sd $0.00) | 3.4 min (0.6 min–11.4 min, sd 4.7 min) | 4.5 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +146/−24 |
| #95 small | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.02 ($0.01–$0.03, sd $0.01) | 7.0 min (0.6 min–11.6 min, sd 5.2 min) | 4.0 (4.0–4.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.16 | 1.0 min | 4.0 | 5.0 | 4.0 | — | 8 (0.75) | +146/−24 |
| #95 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.13 ($0.10–$0.16, sd $0.02) | 8.9 min (0.7 min–40.9 min, sd 16.0 min) | 4.2 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +146/−24 |
| #95 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.16 | 0.9 min | 4.0 | 5.0 | 4.0 | — | 8 (0.75) | +145/−24 |
| #95 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 4/5 | 0.2 (0.0–1.0, sd 0.4) | $0.14 ($0.14–$0.16, sd $0.01) | 12.4 min (0.6 min–38.9 min, sd 15.4 min) | 4.0 (4.0–4.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.06 | 0.7 min | 5.0 | 5.0 | 4.0 | — | 8 (0.75) | +145/−24 |
| #95 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 4/5 | 0.2 (0.0–1.0, sd 0.4) | $0.05 ($0.05–$0.05, sd $0.00) | 5.9 min (0.7 min–14.3 min, sd 6.3 min) | 4.0 (4.0–4.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.01 ($0.01–$0.02, sd $0.00) | 1.5 min (0.8 min–3.9 min, sd 1.2 min) | 4.6 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 1/5 | 0.8 (0.0–1.0, sd 0.4) | $0.01 ($0.01–$0.02, sd $0.00) | 2.6 min (1.1 min–4.9 min, sd 1.8 min) | 4.2 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +146/−24 |
| #95 small | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.05 ($0.01–$0.22, sd $0.08) | 0.9 min (0.6 min–1.3 min, sd 0.2 min) | 4.2 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.20 | 1.0 min | 4.0 | 5.0 | 4.0 | — | 8 (0.75) | +145/−24 |
| #95 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.26 ($0.22–$0.33, sd $0.04) | 5.6 min (0.8 min–9.4 min, sd 3.9 min) | 4.4 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.20 ($0.17–$0.28, sd $0.04) | 5.0 min (0.8 min–15.4 min, sd 5.8 min) | 4.4 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.12 | 0.8 min | 4.0 | 5.0 | 4.0 | — | 8 (0.75) | +145/−24 |
| #95 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.11 ($0.10–$0.13, sd $0.01) | 6.4 min (0.9 min–10.4 min, sd 4.4 min) | 4.2 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 4/5 | 0.2 (0.0–1.0, sd 0.4) | $0.08 ($0.07–$0.09, sd $0.01) | 6.1 min (0.9 min–10.0 min, sd 4.2 min) | 4.6 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.38 | 0.8 min | 4.0 | 5.0 | 4.0 | — | 8 (0.75) | +145/−24 |
| #95 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.36 ($0.33–$0.39, sd $0.02) | 4.9 min (0.8 min–11.7 min, sd 5.0 min) | 4.0 (4.0–4.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.40 ($0.36–$0.43, sd $0.02) | 10.6 min (0.8 min–20.2 min, sd 6.1 min) | 4.0 (4.0–4.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $0.01 ($0.00–$0.01, sd $0.00) | 2.0 min (0.8 min–3.7 min, sd 1.3 min) | 4.2 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.00 ($0.00–$0.01, sd $0.00) | 2.5 min (0.7 min–5.1 min, sd 2.1 min) | 4.6 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $0.01 ($0.00–$0.01, sd $0.00) | 0.9 min (0.8 min–1.2 min, sd 0.2 min) | 4.8 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.4 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.08 | 1.2 min | 4.0 | 5.0 | 4.0 | — | 8 (0.75) | +145/−24 |
| #95 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.10 ($0.09–$0.14, sd $0.02) | 5.0 min (1.0 min–8.2 min, sd 3.1 min) | 4.2 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.11 ($0.09–$0.13, sd $0.01) | 5.0 min (1.1 min–7.7 min, sd 2.9 min) | 4.0 (4.0–4.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.08 | 0.9 min | 5.0 | 5.0 | 4.0 | — | 8 (0.75) | +145/−24 |
| #95 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.07 ($0.05–$0.09, sd $0.01) | 2.0 min (0.8 min–6.3 min, sd 2.2 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 4/5 | 0.2 (0.0–1.0, sd 0.4) | $0.06 ($0.06–$0.07, sd $0.01) | 6.6 min (0.8 min–10.6 min, sd 3.5 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 1/3 | 0.7 (0.0–1.0, sd 0.5) | $0.29 ($0.11–$0.41, sd $0.13) | 1.6 min (1.3 min–1.8 min, sd 0.2 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +156/−24 |
| #95 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.10 ($0.05–$0.20, sd $0.05) | 1.7 min (1.1 min–3.0 min, sd 0.7 min) | 4.8 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.2 (4.0–5.0, sd 0.4) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $0.11 ($0.08–$0.17, sd $0.03) | 8.3 min (1.2 min–20.5 min, sd 8.6 min) | 4.2 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +157/−24 |
| #95 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.19 ($0.15–$0.24, sd $0.04) | 2.0 min (1.2 min–2.8 min, sd 0.7 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.17 ($0.16–$0.17, sd $0.01) | 1.9 min (1.6 min–2.6 min, sd 0.5 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.15 ($0.10–$0.21, sd $0.05) | 1.2 min (0.8 min–1.6 min, sd 0.3 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 1/1 | 0.0 | $0.09 | 24.3 min | — | — | — | — | 8 (0.75) | +145/−24 |
| #95 small | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 1 | 1/1 | 0.0 | $0.44 | 26.8 min | — | — | — | — | 8 (0.75) | +145/−24 |
| #95 small | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 5/5 | 0.0 (0.0–0.0, sd 0.0) | $0.33 ($0.07–$0.58, sd $0.21) | 10.9 min (3.4 min–20.0 min, sd 7.4 min) | 4.0 (4.0–4.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +145/−24 |
| #95 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.23 ($0.22–$0.25, sd $0.01) | 2.8 min (2.2 min–3.2 min, sd 0.4 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +146/−24 |
| #95 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 4 | 0/4 | 1.0 (1.0–1.0, sd 0.0) | $0.26 ($0.21–$0.31, sd $0.04) | 2.9 min (1.8 min–3.8 min, sd 0.7 min) | 4.0 (4.0–4.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +146/−24 |
| #95 small | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.19 ($0.14–$0.25, sd $0.04) | 9.9 min (1.4 min–22.8 min, sd 10.1 min) | 4.0 (4.0–4.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +146/−24 |
| #95 small | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 24.2 min | 2.0 | 2.0 | 3.0 | — | 6 (0.50) | +135/−8 |
| #95 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 1/5 | 0.2 (0.0–1.0, sd 0.4) | $0.06 ($0.00–$0.32, sd $0.13) | 22.5 min (16.2 min–24.7 min, sd 3.2 min) | 2.8 (2.0–4.0, sd 1.0) | 3.0 (2.0–4.0, sd 0.9) | 3.0 (2.0–4.0, sd 0.9) | — | 6 (5–7, sd 1) (0.43 (0.33–0.50, sd 0.07)) | +178/−8 |
| #95 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.06 | 45.6 min | 2.0 | 3.0 | 4.0 | — | 8 (0.75) | +189/−23 |
| #95 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 3 | 1/3 | 1.3 (0.0–3.0, sd 1.2) | $0.12 ($0.00–$0.29, sd $0.12) | 34.5 min (22.1 min–47.4 min, sd 10.3 min) | 4.0 (3.0–5.0, sd 0.8) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.63 (0.38–0.75, sd 0.18)) | +178/−19 |
| #95 small | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 3/5 | 1.6 (0.0–3.0, sd 1.2) | $0.14 ($0.00–$0.27, sd $0.10) | 43.7 min (20.1 min–61.6 min, sd 14.3 min) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–8, sd 1) (0.45 (0.30–0.75, sd 0.16)) | +174/−11 |
| #95 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 1/1 | 2.0 | $0.83 | 78.3 min | 4.0 | 4.0 | 4.0 | — | 8 (0.75) | +205/−38 |
| #95 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 2/5 | 1.2 (0.0–2.0, sd 0.7) | $0.54 ($0.00–$1.13, sd $0.37) | 59.2 min (40.2 min–77.2 min, sd 14.4 min) | 4.0 (3.0–5.0, sd 0.6) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +184/−24 |
| #95 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 43.2 min | 4.0 | 4.0 | 4.0 | — | 6 (0.33) | +139/−8 |
| #95 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.2 (0.0–1.0, sd 0.4) | $0.15 ($0.00–$0.76, sd $0.30) | 42.3 min (32.8 min–61.9 min, sd 10.2 min) | 4.0 (3.0–5.0, sd 0.6) | 3.8 (3.0–4.0, sd 0.4) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (6–8, sd 1) (0.41 (0.30–0.75, sd 0.17)) | +166/−11 |
| #95 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 1/1 | 1.0 | $0.36 | 52.1 min | 4.0 | 4.0 | 4.0 | — | 6 (0.33) | +204/−8 |
| #95 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 5/5 | 2.4 (2.0–3.0, sd 0.5) | $0.39 ($0.27–$0.48, sd $0.08) | 59.6 min (50.5 min–68.8 min, sd 7.6 min) | 4.0 (4.0–4.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (6–8, sd 1) (0.41 (0.30–0.75, sd 0.17)) | +178/−12 |
| #95 small | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 5 | 5/5 | 1.8 (1.0–3.0, sd 0.7) | $0.19 ($0.09–$0.34, sd $0.10) | 31.2 min (13.2 min–65.7 min, sd 19.3 min) | 4.6 (4.0–5.0, sd 0.5) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (5–10, sd 2) (0.55 (0.30–0.75, sd 0.19)) | +188/−21 |
| #95 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 5/5 | 3.0 (2.0–5.0, sd 1.1) | $0.15 ($0.10–$0.26, sd $0.05) | 12.5 min (10.3 min–17.6 min, sd 2.7 min) | 4.0 (4.0–4.0, sd 0.0) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (6–9, sd 1) (0.56 (0.30–0.75, sd 0.20)) | +198/−31 |
| #95 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 3.6 (2.0–5.0, sd 1.4) | $0.18 ($0.11–$0.25, sd $0.05) | 59.3 min (13.2 min–210.2 min, sd 75.8 min) | 4.6 (4.0–5.0, sd 0.5) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–9, sd 0) (0.73 (0.67–0.75, sd 0.03)) | +219/−41 |
| #95 small | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 5/5 | 2.4 (1.0–4.0, sd 1.0) | $0.12 ($0.07–$0.19, sd $0.04) | 6.3 min (2.9 min–9.5 min, sd 2.3 min) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (6–9, sd 1) (0.48 (0.33–0.75, sd 0.19)) | +184/−17 |
| #95 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 1.0 | $1.06 | 32.7 min | 4.0 | 4.0 | 4.0 | — | 6 (0.33) | +157/−8 |
| #95 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 1.0 (1.0–1.0, sd 0.0) | $1.31 ($1.10–$1.43, sd $0.13) | 23.3 min (16.7 min–32.8 min, sd 5.9 min) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (6–8, sd 1) (0.42 (0.33–0.75, sd 0.17)) | +154/−12 |
| #95 small | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 5/5 | 1.2 (1.0–2.0, sd 0.4) | $1.10 ($0.83–$1.43, sd $0.20) | 22.8 min (15.2 min–31.0 min, sd 6.7 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (6–8, sd 1) (0.58 (0.33–0.75, sd 0.20)) | +160/−18 |
| #95 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 1/1 | 5.0 | $1.97 | 60.0 min | 4.0 | 4.0 | 4.0 | — | 8 (0.75) | +222/−37 |
| #95 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 3.4 (2.0–6.0, sd 1.4) | $1.64 ($0.93–$2.60, sd $0.61) | 50.5 min (38.2 min–71.5 min, sd 11.8 min) | 4.0 (4.0–4.0, sd 0.0) | 4.4 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (6–8, sd 1) (0.70 (0.50–0.75, sd 0.10)) | +197/−25 |
| #95 small | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 5/5 | 2.0 (2.0–2.0, sd 0.0) | $0.90 ($0.75–$1.07, sd $0.13) | 35.1 min (22.4 min–50.7 min, sd 9.6 min) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +177/−25 |
| #95 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 1.0 | $3.07 | 42.3 min | 4.0 | 4.0 | 3.0 | — | 9 (0.25) | +196/−8 |
| #95 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 1.6 (1.0–3.0, sd 0.8) | $3.03 ($2.12–$4.54, sd $0.90) | 36.6 min (21.4 min–65.4 min, sd 16.0 min) | 3.8 (3.0–4.0, sd 0.4) | 3.6 (3.0–5.0, sd 0.8) | 3.2 (3.0–4.0, sd 0.4) | — | 8 (7–10, sd 1) (0.29 (0.23–0.30, sd 0.03)) | +187/−9 |
| #95 small | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 2/5 | 0.4 (0.0–1.0, sd 0.5) | $1.33 ($0.53–$2.39, sd $0.75) | 29.0 min (0.8 min–61.3 min, sd 20.6 min) | 2.0 (1.0–4.0, sd 1.3) | 2.2 (1.0–4.0, sd 1.5) | 2.8 (2.0–4.0, sd 1.0) | — | 5 (3–7, sd 2) (0.20 (0.13–0.30, sd 0.09)) | +130/−7 |
| #95 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 5/5 | 3.2 (2.0–4.0, sd 1.0) | $0.06 ($0.04–$0.09, sd $0.02) | 20.1 min (12.4 min–25.9 min, sd 5.2 min) | 4.2 (4.0–5.0, sd 0.4) | 4.6 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (6–8, sd 1) (0.30 (0.27–0.33, sd 0.02)) | +189/−8 |
| #95 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 2.6 (2.0–3.0, sd 0.5) | $0.06 ($0.05–$0.08, sd $0.01) | 19.4 min (17.1 min–22.3 min, sd 1.9 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (3.0–5.0, sd 0.6) | 3.8 (3.0–4.0, sd 0.4) | — | 8 (6–9, sd 1) (0.47 (0.25–0.75, sd 0.23)) | +202/−17 |
| #95 small | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 3/5 | 2.4 (0.0–5.0, sd 1.7) | $0.04 ($0.01–$0.08, sd $0.02) | 5.4 min (0.7 min–9.7 min, sd 3.0 min) | 3.8 (1.0–5.0, sd 1.5) | 3.6 (1.0–5.0, sd 1.4) | 3.6 (2.0–4.0, sd 0.8) | — | 6 (3–9, sd 2) (0.42 (0.13–0.67, sd 0.20)) | +165/−14 |
| #95 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 1/1 | 3.0 | $1.33 | 28.5 min | 4.0 | 4.0 | 4.0 | — | 10 (0.23) | +224/−9 |
| #95 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 4/5 | 2.0 (1.0–4.0, sd 1.1) | $0.99 ($0.47–$1.52, sd $0.38) | 29.8 min (22.0 min–39.2 min, sd 7.0 min) | 4.2 (4.0–5.0, sd 0.4) | 4.4 (4.0–5.0, sd 0.5) | 3.8 (3.0–4.0, sd 0.4) | — | 7 (6–9, sd 1) (0.30 (0.25–0.33, sd 0.03)) | +200/−10 |
| #95 small | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 5/5 | 2.0 (1.0–3.0, sd 0.6) | $0.87 ($0.51–$1.18, sd $0.23) | 93.4 min (21.3 min–355.0 min, sd 130.9 min) | 4.2 (4.0–5.0, sd 0.4) | 4.4 (4.0–5.0, sd 0.5) | 3.8 (3.0–4.0, sd 0.4) | — | 8 (6–10, sd 2) (0.29 (0.23–0.33, sd 0.05)) | +203/−9 |
| #95 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 2.0 | $0.46 | 28.4 min | 5.0 | 4.0 | 4.0 | — | 8 (0.27) | +233/−8 |
| #95 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 1.0 (1.0–1.0, sd 0.0) | $0.32 ($0.27–$0.38, sd $0.04) | 18.6 min (12.3 min–23.9 min, sd 5.2 min) | 4.2 (4.0–5.0, sd 0.4) | 3.8 (3.0–5.0, sd 0.7) | 3.6 (3.0–4.0, sd 0.5) | — | 7 (6–8, sd 1) (0.30 (0.27–0.33, sd 0.02)) | +158/−8 |
| #95 small | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 2/5 | 0.4 (0.0–1.0, sd 0.5) | $0.29 ($0.11–$0.64, sd $0.21) | 15.0 min (5.5 min–26.3 min, sd 8.1 min) | 2.2 (1.0–4.0, sd 1.5) | 2.4 (1.0–4.0, sd 1.4) | 2.8 (2.0–4.0, sd 1.0) | — | 4 (3–7, sd 2) (0.20 (0.13–0.33, sd 0.09)) | +131/−8 |
| #95 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $0.55 ($0.28–$0.76, sd $0.20) | 7.0 min (3.6 min–11.8 min, sd 3.5 min) | 4.0 (4.0–4.0, sd 0.0) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 6 (5–7, sd 1) (0.34 (0.30–0.38, sd 0.03)) | +139/−8 |
| #95 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 4/5 | 3.0 (1.0–6.0, sd 1.7) | $1.16 ($0.58–$1.73, sd $0.50) | 46.3 min (7.3 min–113.7 min, sd 41.0 min) | 4.2 (4.0–5.0, sd 0.4) | 4.8 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (5–8, sd 1) (0.40 (0.30–0.75, sd 0.17)) | +194/−18 |
| #95 small | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 4/5 | 2.0 (1.0–3.0, sd 0.9) | $0.83 ($0.17–$2.09, sd $0.67) | 35.6 min (6.8 min–87.3 min, sd 34.3 min) | 4.2 (4.0–5.0, sd 0.4) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (6–8, sd 1) (0.40 (0.27–0.75, sd 0.18)) | +200/−12 |
| #95 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $2.82 ($2.40–$3.03, sd $0.29) | 20.5 min (15.7 min–26.9 min, sd 4.7 min) | 4.3 (4.0–5.0, sd 0.5) | 3.7 (3.0–4.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +163/−26 |
| #95 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 3 | 3/3 | 1.3 (1.0–2.0, sd 0.5) | $2.63 ($2.07–$3.12, sd $0.43) | 22.8 min (15.1 min–36.0 min, sd 9.4 min) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 11 (8–17, sd 4) (0.62 (0.35–0.75, sd 0.19)) | +231/−56 |
| #95 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 1.0 (1.0–1.0, sd 0.0) | $2.02 ($1.59–$2.64, sd $0.45) | 10.8 min (8.9 min–12.1 min, sd 1.4 min) | 4.3 (4.0–5.0, sd 0.5) | 3.7 (3.0–4.0, sd 0.5) | 3.7 (3.0–4.0, sd 0.5) | — | 6 (5–8, sd 1) (0.54 (0.38–0.75, sd 0.16)) | +136/−14 |
| #95 small | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 1/1 | 1.0 | $1.99 | 127.2 min | — | — | — | — | 8 (0.75) | +192/−25 |
| #95 small | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 1 | 0/1 | 1.0 | $0.14 | 74.7 min | — | — | — | — | 8 (0.75) | +191/−36 |
| #95 small | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.4 (0.0–1.0, sd 0.5) | $0.81 ($0.00–$2.98, sd $1.16) | 51.2 min (41.2 min–61.5 min, sd 8.4 min) | 4.8 (4.0–5.0, sd 0.4) | 4.2 (4.0–5.0, sd 0.4) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +175/−24 |
| #95 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 1.0 (1.0–1.0, sd 0.0) | $1.87 ($1.48–$2.11, sd $0.27) | 11.9 min (8.9 min–17.2 min, sd 3.7 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +163/−24 |
| #95 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 4 | 3/4 | 0.8 (0.0–1.0, sd 0.4) | $1.45 ($0.00–$2.40, sd $0.92) | 23.8 min (7.9 min–47.3 min, sd 14.5 min) | 4.7 (4.0–5.0, sd 0.5) | 4.7 (4.0–5.0, sd 0.5) | 4.3 (4.0–5.0, sd 0.5) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +174/−27 |
| #95 small | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 4/5 | 1.2 (1.0–2.0, sd 0.4) | $1.99 ($0.97–$2.78, sd $0.68) | 34.4 min (9.0 min–73.1 min, sd 29.1 min) | 4.0 (3.0–5.0, sd 0.6) | 4.4 (3.0–5.0, sd 0.8) | 3.8 (3.0–4.0, sd 0.4) | — | 8 (8–8, sd 0) (0.75 (0.75–0.75, sd 0.00)) | +167/−24 |
| #95 small | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #95 small | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.32 | 2.4 min | 1.0 | 1.0 | 1.0 | 0/1 | 2 (0.00) | +210/−0 |
| #144 large | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.19 ($0.00–$0.45, sd $0.17) | 10.6 min (1.8 min–23.8 min, sd 10.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1/5 | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +344/−0 |
| #144 large | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.24 | 13.9 min | 1.0 | 1.0 | 1.0 | 0/1 | 2 (0.00) | +239/−0 |
| #144 large | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 3 | 0/3 | 0.0 (0.0–0.0, sd 0.0) | $0.04 ($0.00–$0.06, sd $0.03) | 15.1 min (11.5 min–22.1 min, sd 4.9 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/3 | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +117/−0 |
| #144 large | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.08 ($0.00–$0.16, sd $0.06) | 14.1 min (11.2 min–21.3 min, sd 3.7 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 2 (2–2, sd 0) (0.00 (0.00–0.00, sd 0.00)) | +158/−0 |
| #144 large | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 37.9 min | 1.0 | 1.0 | 1.0 | 0/1 | 3 (0.04) | +306/−0 |
| #144 large | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.40 ($0.22–$0.79, sd $0.22) | 19.0 min (17.7 min–20.3 min, sd 0.9 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 2/5 | 3 (3–3, sd 0) (0.04 (0.04–0.04, sd 0.00)) | +337/−25 |
| #144 large | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 39.9 min | 1.0 | 1.0 | 1.0 | 0/1 | 3 (0.04) | +342/−63 |
| #144 large | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.27 ($0.00–$1.34, sd $0.53) | 32.7 min (6.8 min–41.3 min, sd 13.0 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 2 (2–3, sd 0) (0.02 (0.00–0.04, sd 0.02)) | +201/−13 |
| #144 large | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.29 | 17.2 min | 1.0 | 1.0 | 1.0 | 0/1 | 3 (0.04) | +189/−0 |
| #144 large | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.29 ($0.22–$0.32, sd $0.04) | 6.2 min (1.2 min–14.4 min, sd 5.9 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 3 (2–3, sd 0) (0.02 (0.00–0.04, sd 0.02)) | +210/−13 |
| #144 large | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.06 ($0.04–$0.09, sd $0.02) | 2.6 min (1.1 min–4.2 min, sd 1.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1/5 | 2 (2–3, sd 0) (0.02 (0.00–0.04, sd 0.02)) | +165/−25 |
| #144 large | dod | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.08 ($0.06–$0.12, sd $0.02) | 41.1 min (1.7 min–188.9 min, sd 73.9 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1/5 | 3 (2–3, sd 0) (0.03 (0.00–0.04, sd 0.02)) | +217/−38 |
| #144 large | dod | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $3.44 ($0.05–$16.12, sd $6.35) | 2.2 min (1.4 min–3.6 min, sd 0.9 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 3 (2–3, sd 0) (0.02 (0.00–0.04, sd 0.02)) | +183/−25 |
| #144 large | dod | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $1.35 | 8.1 min | 1.0 | 1.0 | 1.0 | 0/1 | 3 (0.04) | +323/−64 |
| #144 large | dod | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.40 ($1.22–$1.70, sd $0.19) | 7.0 min (2.4 min–8.4 min, sd 2.3 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1/5 | 3 (3–3, sd 0) (0.04 (0.04–0.04, sd 0.00)) | +316/−63 |
| #144 large | dod | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $1.28 ($0.87–$1.57, sd $0.25) | 7.3 min (7.1 min–7.6 min, sd 0.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 3 (3–3, sd 0) (0.04 (0.04–0.04, sd 0.00)) | +280/−50 |
| #144 large | dod | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.45 | 1.3 min | 1.0 | 1.0 | 1.0 | 1/1 | 3 (0.04) | +170/−63 |
| #144 large | dod | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.79 ($0.57–$1.00, sd $0.16) | 7.2 min (2.4 min–10.2 min, sd 3.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 3 (3–4, sd 0) (0.05 (0.04–0.08, sd 0.02)) | +255/−51 |
| #144 large | dod | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.86 ($0.71–$1.10, sd $0.13) | 9.7 min (8.9 min–11.9 min, sd 1.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 3/5 | 3 (3–4, sd 0) (0.05 (0.04–0.08, sd 0.02)) | +266/−50 |
| #144 large | dod | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $2.03 | 10.7 min | 1.0 | 1.0 | 2.0 | 1/1 | 4 (0.08) | +413/−63 |
| #144 large | dod | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $2.19 ($1.60–$2.81, sd $0.45) | 12.0 min (8.0 min–14.1 min, sd 2.4 min) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 1.2 (1.0–2.0, sd 0.4) | 3/5 | 4 (4–5, sd 0) (0.08 (0.07–0.08, sd 0.00)) | +403/−51 |
| #144 large | dod | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $2.40 ($1.88–$2.76, sd $0.33) | 10.4 min (10.1 min–11.0 min, sd 0.3 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | 3/5 | 5 (3–6, sd 1) (0.07 (0.04–0.07, sd 0.01)) | +429/−51 |
| #144 large | dod | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.03 ($0.01–$0.07, sd $0.02) | 2.4 min (0.9 min–5.0 min, sd 1.7 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1/5 | 3 (3–4, sd 0) (0.05 (0.04–0.08, sd 0.02)) | +114/−13 |
| #144 large | dod | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.06 ($0.04–$0.08, sd $0.01) | 5.0 min (2.6 min–6.2 min, sd 1.3 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1/5 | 3 (3–4, sd 0) (0.05 (0.04–0.08, sd 0.02)) | +213/−13 |
| #144 large | dod | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.03 ($0.02–$0.05, sd $0.01) | 3.2 min (1.9 min–5.4 min, sd 1.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1/5 | 3 (3–3, sd 0) (0.04 (0.04–0.04, sd 0.00)) | +149/−28 |
| #144 large | dod | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $1.12 | 12.4 min | 1.0 | 1.0 | 1.0 | 1/1 | 3 (0.04) | +303/−1 |
| #144 large | dod | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.68 ($0.55–$0.81, sd $0.10) | 8.3 min (6.8 min–10.3 min, sd 1.5 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 3/5 | 3 (3–3, sd 0) (0.04 (0.04–0.04, sd 0.00)) | +268/−51 |
| #144 large | dod | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.94 ($0.55–$1.44, sd $0.30) | 8.5 min (6.7 min–11.8 min, sd 2.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 3/5 | 3 (3–3, sd 0) (0.04 (0.04–0.04, sd 0.00)) | +318/−50 |
| #144 large | dod | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.26 | 3.9 min | 1.0 | 1.0 | 1.0 | 1/1 | 4 (0.08) | +385/−63 |
| #144 large | dod | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.38 ($0.28–$0.62, sd $0.12) | 5.7 min (5.4 min–6.0 min, sd 0.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.4 (1.0–2.0, sd 0.5) | 5/5 | 4 (4–5, sd 0) (0.08 (0.07–0.08, sd 0.00)) | +354/−38 |
| #144 large | dod | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.35 ($0.30–$0.42, sd $0.05) | 6.5 min (5.1 min–10.8 min, sd 2.2 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 5/5 | 4 (4–6, sd 1) (0.08 (0.07–0.08, sd 0.00)) | +366/−63 |
| #144 large | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.55 | 19.3 min | 1.0 | 1.0 | 1.0 | 0/1 | 3 (0.04) | +425/−69 |
| #144 large | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.20 ($0.02–$0.45, sd $0.15) | 14.6 min (1.6 min–34.0 min, sd 12.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 4 (3–6, sd 1) (0.06 (0.00–0.15, sd 0.05)) | +317/−38 |
| #144 large | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.14 ($0.00–$0.44, sd $0.18) | 25.4 min (3.0 min–33.4 min, sd 11.5 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 5 (4–7, sd 1) (0.10 (0.07–0.19, sd 0.05)) | +475/−68 |
| #144 large | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | no-traceability | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | short | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.66 | 47.5 min | — | — | — | 0/1 | 3 (0.04) | +384/−63 |
| #144 large | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 1 | 0/1 | 0.0 | $0.00 | 47.7 min | — | — | — | 0/1 | 3 (0.04) | +214/−0 |
| #144 large | dod | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.67 ($0.00–$1.73, sd $0.65) | 23.5 min (8.1 min–37.4 min, sd 13.1 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 3 (2–3, sd 0) (0.02 (0.00–0.04, sd 0.02)) | +376/−38 |
| #144 large | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $4.28 | 52.1 min | — | — | — | 0/1 | 3 (0.04) | +405/−63 |
| #144 large | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 4 | 0/4 | 0.0 (0.0–0.0, sd 0.0) | $0.76 ($0.00–$3.06, sd $1.32) | 61.6 min (45.8 min–92.8 min, sd 18.7 min) | — | — | — | 1/4 | 3 (3–4, sd 0) (0.05 (0.04–0.08, sd 0.02)) | +466/−33 |
| #144 large | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.86 ($0.00–$2.26, sd $0.95) | 39.9 min (26.5 min–45.4 min, sd 6.8 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 0/5 | 3 (3–3, sd 0) (0.04 (0.04–0.04, sd 0.00)) | +363/−26 |
| #144 large | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | dod | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.99 | 7.2 min | 2.0 | 2.0 | 2.0 | — | 11 (0.35) | +423/−16 |
| #144 large | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.4 (0.0–1.0, sd 0.5) | $0.18 ($0.00–$0.73, sd $0.28) | 23.8 min (5.4 min–36.3 min, sd 10.1 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 13 (12–13, sd 0) (0.31 (0.28–0.32, sd 0.02)) | +440/−38 |
| #144 large | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.17 | 2.9 min | 2.0 | 2.0 | 2.0 | — | 13 (0.32) | +370/−23 |
| #144 large | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $0.02 ($0.02–$0.02, sd $0.00) | 12.3 min (12.1 min–12.6 min, sd 0.2 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 12 (11–12, sd 0) (0.29 (0.29–0.30, sd 0.00)) | +388/−22 |
| #144 large | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.05 ($0.02–$0.18, sd $0.07) | 9.9 min (2.7 min–12.7 min, sd 3.7 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 13 (12–13, sd 0) (0.31 (0.29–0.32, sd 0.01)) | +406/−32 |
| #144 large | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.10 | 19.6 min | 2.0 | 2.0 | 2.0 | — | 14 (0.31) | +403/−52 |
| #144 large | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $0.43 ($0.10–$0.75, sd $0.28) | 12.3 min (2.0 min–34.2 min, sd 12.9 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 14 (13–14, sd 0) (0.30 (0.28–0.31, sd 0.02)) | +439/−72 |
| #144 large | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.11 | 19.2 min | 2.0 | 2.0 | 2.0 | — | 14 (0.36) | +431/−33 |
| #144 large | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.8 (0.0–1.0, sd 0.4) | $0.40 ($0.00–$1.24, sd $0.44) | 25.5 min (18.7 min–40.1 min, sd 7.6 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 12 (12–12, sd 0) (0.29 (0.29–0.29, sd 0.00)) | +407/−34 |
| #144 large | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.26 | 2.0 min | 2.0 | 2.0 | 2.0 | — | 12 (0.29) | +395/−32 |
| #144 large | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.29 ($0.23–$0.33, sd $0.04) | 8.2 min (1.6 min–33.6 min, sd 12.7 min) | 2.0 (2.0–2.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | — | 12 (12–12, sd 0) (0.29 (0.29–0.29, sd 0.00)) | +392/−32 |
| #144 large | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.07 ($0.05–$0.10, sd $0.02) | 2.6 min (1.9 min–3.3 min, sd 0.6 min) | 2.0 (2.0–2.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 2.0 (2.0–2.0, sd 0.0) | — | 12 (12–12, sd 0) (0.29 (0.29–0.29, sd 0.00)) | +413/−37 |
| #144 large | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.06 ($0.06–$0.08, sd $0.01) | 3.5 min (1.8 min–7.0 min, sd 1.8 min) | 2.0 (2.0–2.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | — | 12 (10–13, sd 1) (0.30 (0.29–0.32, sd 0.01)) | +410/−28 |
| #144 large | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 1/5 | 0.8 (0.0–1.0, sd 0.4) | $0.08 ($0.04–$0.14, sd $0.03) | 2.9 min (1.7 min–4.6 min, sd 1.0 min) | 2.6 (2.0–5.0, sd 1.2) | 2.6 (2.0–5.0, sd 1.2) | 2.6 (2.0–5.0, sd 1.2) | — | 15 (10–25, sd 5) (0.42 (0.28–0.96, sd 0.27)) | +529/−35 |
| #144 large | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $1.38 | 2.7 min | 2.0 | 2.0 | 2.0 | — | 12 (0.29) | +411/−33 |
| #144 large | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $1.05 ($0.92–$1.17, sd $0.10) | 2.1 min (1.9 min–2.5 min, sd 0.2 min) | 2.0 (2.0–2.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | — | 13 (12–14, sd 1) (0.32 (0.29–0.36, sd 0.03)) | +402/−31 |
| #144 large | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.81 ($0.51–$1.27, sd $0.26) | 1.7 min (1.2 min–2.5 min, sd 0.5 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 11 (10–17, sd 3) (0.34 (0.31–0.46, sd 0.06)) | +408/−20 |
| #144 large | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.57 | 2.3 min | 2.0 | 2.0 | 2.0 | — | 11 (0.30) | +388/−18 |
| #144 large | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.47 ($0.37–$0.63, sd $0.09) | 3.1 min (2.8 min–3.4 min, sd 0.2 min) | 2.0 (2.0–2.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | — | 12 (10–12, sd 1) (0.29 (0.29–0.31, sd 0.01)) | +413/−36 |
| #144 large | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.44 ($0.33–$0.63, sd $0.10) | 4.8 min (2.0 min–13.5 min, sd 4.4 min) | 2.0 (2.0–2.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 2.0 (2.0–2.0, sd 0.0) | — | 13 (11–16, sd 2) (0.30 (0.28–0.38, sd 0.04)) | +408/−33 |
| #144 large | repair-build | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $1.12 | 1.8 min | 2.0 | 2.0 | 2.0 | — | 14 (0.31) | +489/−123 |
| #144 large | repair-build | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $1.33 ($1.23–$1.45, sd $0.08) | 4.7 min (2.3 min–12.8 min, sd 4.1 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 14 (14–15, sd 0) (0.32 (0.31–0.34, sd 0.02)) | +422/−60 |
| #144 large | repair-build | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 2/5 | 0.6 (0.0–1.0, sd 0.5) | $1.32 ($1.10–$1.55, sd $0.15) | 16.7 min (10.6 min–20.3 min, sd 4.3 min) | 2.0 (2.0–2.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | — | 14 (14–15, sd 0) (0.32 (0.31–0.34, sd 0.01)) | +421/−58 |
| #144 large | repair-build | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.04 ($0.03–$0.05, sd $0.01) | 4.3 min (2.9 min–7.0 min, sd 1.6 min) | 2.0 (2.0–2.0, sd 0.0) | 1.6 (1.0–2.0, sd 0.5) | 2.0 (2.0–2.0, sd 0.0) | — | 13 (12–14, sd 1) (0.31 (0.29–0.36, sd 0.03)) | +383/−29 |
| #144 large | repair-build | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.04 ($0.01–$0.07, sd $0.02) | 3.9 min (1.5 min–7.1 min, sd 1.9 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 13 (10–17, sd 3) (0.33 (0.29–0.37, sd 0.03)) | +417/−28 |
| #144 large | repair-build | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $4.63 ($3.11–$7.12, sd $1.41) | 3.8 min (2.7 min–5.7 min, sd 1.0 min) | 1.6 (1.0–2.0, sd 0.5) | 1.4 (1.0–2.0, sd 0.5) | 2.0 (2.0–2.0, sd 0.0) | — | 11 (8–16, sd 3) (0.28 (0.23–0.38, sd 0.05)) | +394/−25 |
| #144 large | repair-build | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.59 | 7.0 min | 2.0 | 2.0 | 2.0 | — | 14 (0.36) | +419/−41 |
| #144 large | repair-build | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.52 ($0.34–$0.89, sd $0.19) | 7.7 min (3.4 min–9.9 min, sd 2.4 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 13 (12–16, sd 1) (0.35 (0.29–0.38, sd 0.04)) | +421/−36 |
| #144 large | repair-build | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.51 ($0.41–$0.65, sd $0.08) | 6.1 min (3.6 min–9.5 min, sd 2.2 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 13 (12–14, sd 1) (0.34 (0.29–0.36, sd 0.03)) | +412/−33 |
| #144 large | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.16 | 2.5 min | 2.0 | 2.0 | 2.0 | — | 14 (0.31) | +490/−123 |
| #144 large | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.18 ($0.15–$0.19, sd $0.01) | 1.8 min (1.7 min–2.0 min, sd 0.1 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 14 (14–14, sd 0) (0.31 (0.31–0.31, sd 0.00)) | +477/−109 |
| #144 large | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 1/5 | 0.8 (0.0–1.0, sd 0.4) | $0.19 ($0.15–$0.21, sd $0.02) | 8.8 min (5.3 min–12.4 min, sd 2.8 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 14 (14–14, sd 0) (0.31 (0.31–0.31, sd 0.00)) | +449/−83 |
| #144 large | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 2 | 0/2 | 1.0 (1.0–1.0, sd 0.0) | $0.99 ($0.56–$1.42, sd $0.43) | 5.9 min (4.8 min–6.9 min, sd 1.1 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 15 (14–15, sd 1) (0.35 (0.34–0.36, sd 0.01)) | +454/−60 |
| #144 large | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 0/5 | 0.8 (0.0–1.0, sd 0.4) | $0.60 ($0.00–$1.00, sd $0.34) | 12.2 min (5.6 min–33.7 min, sd 10.8 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 20 (18–23, sd 2) (0.45 (0.42–0.48, sd 0.02)) | +589/−96 |
| #144 large | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $1.01 ($0.82–$1.23, sd $0.14) | 10.6 min (7.9 min–17.0 min, sd 3.3 min) | 2.8 (2.0–4.0, sd 1.0) | 3.0 (2.0–4.0, sd 0.6) | 3.2 (2.0–4.0, sd 0.7) | — | 19 (18–20, sd 1) (0.48 (0.47–0.50, sd 0.01)) | +639/−120 |
| #144 large | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 2 | 0/2 | 1.0 (1.0–1.0, sd 0.0) | $3.05 ($2.60–$3.49, sd $0.44) | 19.3 min (10.3 min–28.3 min, sd 9.0 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 15 (14–16, sd 1) (0.34 (0.31–0.38, sd 0.03)) | +475/−106 |
| #144 large | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 2 | 0/2 | 1.0 (1.0–1.0, sd 0.0) | $2.80 ($2.67–$2.93, sd $0.13) | 14.1 min (13.1 min–15.2 min, sd 1.1 min) | 1.5 (1.0–2.0, sd 0.5) | 1.5 (1.0–2.0, sd 0.5) | 2.0 (2.0–2.0, sd 0.0) | — | 10 (8–12, sd 2) (0.26 (0.23–0.29, sd 0.03)) | +378/−23 |
| #144 large | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 0/3 | 1.0 (1.0–1.0, sd 0.0) | $2.58 ($1.73–$3.66, sd $0.81) | 17.7 min (12.8 min–24.3 min, sd 4.8 min) | 1.7 (1.0–2.0, sd 0.5) | 1.7 (1.0–2.0, sd 0.5) | 2.0 (2.0–2.0, sd 0.0) | — | 11 (8–12, sd 2) (0.27 (0.23–0.29, sd 0.03)) | +396/−35 |
| #144 large | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.11 | 25.9 min | — | — | — | — | 11 (0.30) | +425/−22 |
| #144 large | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 1 | 1/1 | 0.0 | $3.68 | 45.0 min | — | — | — | — | 11 (0.30) | +401/−22 |
| #144 large | repair-build | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 1.0 (1.0–1.0, sd 0.0) | $0.85 ($0.06–$2.28, sd $0.96) | 22.8 min (10.9 min–32.4 min, sd 8.4 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 10 (10–11, sd 0) (0.30 (0.30–0.31, sd 0.01)) | +416/−19 |
| #144 large | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 2 | 2/2 | 0.0 (0.0–0.0, sd 0.0) | $3.66 ($3.13–$4.19, sd $0.53) | 19.1 min (15.8 min–22.4 min, sd 3.3 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 10 (10–10, sd 0) (0.31 (0.31–0.31, sd 0.00)) | +352/−17 |
| #144 large | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 4 | 2/4 | 0.5 (0.0–1.0, sd 0.5) | $3.27 ($2.20–$5.25, sd $1.18) | 20.8 min (12.2 min–45.1 min, sd 14.1 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 14 (10–21, sd 5) (0.30 (0.25–0.32, sd 0.03)) | +431/−56 |
| #144 large | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 3/5 | 0.4 (0.0–1.0, sd 0.5) | $2.80 ($1.05–$7.03, sd $2.19) | 13.9 min (5.8 min–30.5 min, sd 8.5 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 11 (10–12, sd 1) (0.33 (0.31–0.35, sd 0.02)) | +411/−30 |
| #144 large | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | repair-build | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 23.6 min | 2.0 | 2.0 | 2.0 | — | 10 (0.26) | +449/−8 |
| #144 large | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 5 | 1/5 | 1.6 (0.0–7.0, sd 2.7) | $0.62 ($0.00–$2.86, sd $1.13) | 34.5 min (24.9 min–59.7 min, sd 13.0 min) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | — | 12 (10–15, sd 2) (0.24 (0.21–0.26, sd 0.02)) | +490/−40 |
| #144 large | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 2.0 | $0.16 | 24.8 min | 2.0 | 2.0 | 2.0 | — | 13 (0.28) | +438/−32 |
| #144 large | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 2 | 0/2 | 1.5 (1.0–2.0, sd 0.5) | $0.11 ($0.07–$0.15, sd $0.04) | 51.2 min (33.5 min–68.9 min, sd 17.7 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | — | 11 (11–11, sd 0) (0.21 (0.21–0.21, sd 0.00)) | +371/−46 |
| #144 large | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.6 (0.0–1.0, sd 0.5) | $0.04 ($0.00–$0.08, sd $0.04) | 30.9 min (21.1 min–44.6 min, sd 8.7 min) | 1.2 (1.0–2.0, sd 0.4) | 1.2 (1.0–2.0, sd 0.4) | 1.2 (1.0–2.0, sd 0.4) | — | 8 (6–15, sd 3) (0.21 (0.15–0.30, sd 0.05)) | +310/−12 |
| #144 large | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 38.6 min | 2.0 | 2.0 | 2.0 | — | 11 (0.25) | +432/−6 |
| #144 large | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 0/5 | 0.8 (0.0–3.0, sd 1.2) | $0.44 ($0.00–$1.75, sd $0.68) | 46.0 min (34.2 min–61.0 min, sd 11.9 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 17 (11–22, sd 4) (0.23 (0.21–0.26, sd 0.02)) | +564/−106 |
| #144 large | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 39.7 min | 2.0 | 2.0 | 2.0 | — | 11 (0.30) | +519/−71 |
| #144 large | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 5 | 1/5 | 1.4 (0.0–6.0, sd 2.3) | $2.18 ($0.00–$9.88, sd $3.87) | 43.8 min (36.5 min–58.6 min, sd 7.7 min) | 2.0 (2.0–2.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | — | 13 (10–18, sd 3) (0.28 (0.25–0.31, sd 0.02)) | +532/−71 |
| #144 large | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 0/1 | 5.0 | $1.23 | 43.6 min | 2.0 | 2.0 | 2.0 | — | 20 (0.26) | +646/−196 |
| #144 large | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 5 | 4/5 | 5.4 (1.0–8.0, sd 2.4) | $1.10 ($0.17–$2.21, sd $0.65) | 74.5 min (34.6 min–103.4 min, sd 24.3 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 17 (15–20, sd 2) (0.28 (0.26–0.30, sd 0.02)) | +563/−137 |
| #144 large | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `glm-5.3-flash` (claude) | unknown (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 1/5 | 11.0 (7.0–12.0, sd 2.0) | $0.71 ($0.41–$0.93, sd $0.20) | 41.8 min (17.2 min–54.3 min, sd 13.8 min) | 2.4 (2.0–3.0, sd 0.5) | 3.0 (2.0–4.0, sd 0.9) | 2.4 (2.0–3.0, sd 0.5) | — | 25 (19–30, sd 4) (0.32 (0.25–0.42, sd 0.07)) | +848/−187 |
| #144 large | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 2/5 | 10.2 (5.0–12.0, sd 2.6) | $0.68 ($0.34–$0.89, sd $0.18) | 55.6 min (35.0 min–70.7 min, sd 15.5 min) | 2.6 (2.0–4.0, sd 0.8) | 3.6 (3.0–5.0, sd 0.8) | 2.6 (2.0–4.0, sd 0.8) | — | 25 (21–27, sd 2) (0.36 (0.31–0.45, sd 0.06)) | +859/−179 |
| #144 large | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 2/5 | 9.6 (5.0–12.0, sd 3.0) | $0.71 ($0.31–$0.93, sd $0.22) | 32.2 min (15.8 min–46.6 min, sd 12.2 min) | 2.0 (2.0–2.0, sd 0.0) | 2.6 (2.0–3.0, sd 0.5) | 2.0 (2.0–2.0, sd 0.0) | — | 24 (17–30, sd 5) (0.36 (0.26–0.44, sd 0.06)) | +849/−179 |
| #144 large | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 7.0 | $6.33 | 33.7 min | 2.0 | 2.0 | 2.0 | — | 22 (0.24) | +671/−181 |
| #144 large | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 4.4 (2.0–7.0, sd 1.9) | $5.47 ($3.27–$8.61, sd $1.95) | 49.9 min (27.9 min–81.3 min, sd 23.9 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 19 (14–21, sd 2) (0.27 (0.25–0.31, sd 0.02)) | +621/−160 |
| #144 large | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 4/5 | 7.0 (3.0–12.0, sd 3.0) | $5.06 ($3.02–$6.13, sd $1.14) | 56.4 min (30.9 min–78.2 min, sd 16.7 min) | 2.0 (2.0–2.0, sd 0.0) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (2.0–2.0, sd 0.0) | — | 16 (14–21, sd 2) (0.26 (0.24–0.30, sd 0.02)) | +621/−125 |
| #144 large | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 1/1 | 5.0 | $2.92 | 40.8 min | 2.0 | 2.0 | 2.0 | — | 20 (0.26) | +640/−198 |
| #144 large | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 5/5 | 8.8 (5.0–12.0, sd 2.8) | $4.04 ($2.96–$5.14, sd $0.88) | 77.3 min (43.8 min–106.1 min, sd 21.1 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 20 (18–22, sd 1) (0.26 (0.24–0.27, sd 0.01)) | +670/−189 |
| #144 large | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 5 | 4/5 | 7.4 (5.0–12.0, sd 2.4) | $2.86 ($1.86–$4.14, sd $0.76) | 81.0 min (27.3 min–155.2 min, sd 47.1 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 19 (14–20, sd 2) (0.26 (0.26–0.27, sd 0.00)) | +646/−177 |
| #144 large | tdd-round | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 3.0 | $5.80 | 36.7 min | 1.0 | 1.0 | 1.0 | — | 14 (0.15) | +354/−50 |
| #144 large | tdd-round | `gpt-6-astra` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 1/5 | 1.8 (0.0–3.0, sd 1.2) | $3.90 ($0.86–$6.46, sd $2.01) | 33.9 min (1.7 min–75.3 min, sd 24.3 min) | 1.2 (1.0–2.0, sd 0.4) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | — | 11 (3–18, sd 5) (0.13 (0.04–0.20, sd 0.05)) | +365/−48 |
| #144 large | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.67 ($0.50–$0.75, sd $0.09) | 18.8 min (10.2 min–22.9 min, sd 4.4 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | — | 3 (3–3, sd 0) (0.04 (0.04–0.04, sd 0.00)) | +236/−0 |
| #144 large | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 5 | 2/5 | 4.6 (1.0–11.0, sd 3.4) | $0.14 ($0.05–$0.24, sd $0.06) | 24.3 min (8.1 min–43.7 min, sd 12.1 min) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | — | 14 (6–20, sd 5) (0.29 (0.11–0.46, sd 0.11)) | +488/−76 |
| #144 large | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 2/5 | 6.0 (1.0–12.0, sd 3.7) | $0.19 ($0.06–$0.40, sd $0.11) | 30.3 min (11.7 min–45.6 min, sd 12.1 min) | 1.8 (1.0–2.0, sd 0.4) | 2.0 (1.0–3.0, sd 0.6) | 2.0 (2.0–2.0, sd 0.0) | — | 17 (7–25, sd 6) (0.30 (0.19–0.44, sd 0.08)) | +566/−77 |
| #144 large | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 5 | 2/5 | 3.0 (1.0–7.0, sd 2.3) | $0.10 ($0.03–$0.23, sd $0.08) | 11.8 min (3.1 min–25.9 min, sd 8.9 min) | 1.4 (1.0–2.0, sd 0.5) | 1.4 (1.0–2.0, sd 0.5) | 1.4 (1.0–2.0, sd 0.5) | — | 12 (6–22, sd 6) (0.22 (0.15–0.28, sd 0.05)) | +419/−45 |
| #144 large | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 0/1 | 1.0 | $0.96 | 20.2 min | 1.0 | 1.0 | 1.0 | — | 7 (0.15) | +322/−1 |
| #144 large | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | Lore on Utopia | baseline | 5 | 3/5 | 2.2 (1.0–4.0, sd 1.2) | $1.64 ($0.66–$2.42, sd $0.69) | 23.9 min (8.9 min–36.4 min, sd 12.3 min) | 1.6 (1.0–2.0, sd 0.5) | 1.6 (1.0–2.0, sd 0.5) | 1.6 (1.0–2.0, sd 0.5) | — | 13 (8–17, sd 4) (0.21 (0.14–0.27, sd 0.05)) | +470/−54 |
| #144 large | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 5 | 5/5 | 3.8 (2.0–5.0, sd 1.0) | $1.97 ($1.49–$2.57, sd $0.35) | 36.8 min (28.0 min–56.4 min, sd 10.1 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 16 (13–17, sd 2) (0.26 (0.24–0.32, sd 0.03)) | +592/−111 |
| #144 large | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 0/1 | 2.0 | $0.70 | 20.6 min | 1.0 | 1.0 | 1.0 | — | 13 (0.16) | +363/−57 |
| #144 large | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | Lore on Utopia | baseline | 5 | 1/5 | 1.6 (1.0–3.0, sd 0.8) | $0.58 ($0.37–$0.91, sd $0.19) | 13.9 min (12.1 min–17.6 min, sd 2.1 min) | 1.2 (1.0–2.0, sd 0.4) | 1.0 (1.0–1.0, sd 0.0) | 1.2 (1.0–2.0, sd 0.4) | — | 11 (7–17, sd 4) (0.17 (0.14–0.21, sd 0.02)) | +365/−47 |
| #144 large | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 5 | 0/5 | 0.0 (0.0–0.0, sd 0.0) | $0.14 ($0.11–$0.16, sd $0.02) | 7.5 min (5.2 min–10.3 min, sd 2.3 min) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | 1.0 (1.0–1.0, sd 0.0) | — | 3 (3–3, sd 0) (0.04 (0.04–0.04, sd 0.00)) | +236/−0 |
| #144 large | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 2 | 1/2 | 9.5 (7.0–12.0, sd 2.5) | $6.34 ($4.48–$8.19, sd $1.85) | 53.3 min (37.9 min–68.6 min, sd 15.4 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 35 (22–47, sd 13) (0.34 (0.29–0.39, sd 0.05)) | +1016/−218 |
| #144 large | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 5 | 2/5 | 6.0 (0.0–12.0, sd 4.9) | $4.55 ($0.00–$11.25, sd $3.82) | 74.4 min (33.7 min–134.4 min, sd 38.0 min) | 1.8 (1.0–2.0, sd 0.4) | 2.2 (2.0–3.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | — | 33 (22–67, sd 17) (0.33 (0.18–0.48, sd 0.10)) | +971/−357 |
| #144 large | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 3/5 | 7.4 (1.0–12.0, sd 4.6) | $7.77 ($1.03–$14.11, sd $5.02) | 64.2 min (18.4 min–124.4 min, sd 36.6 min) | 2.6 (2.0–4.0, sd 0.8) | 2.6 (2.0–4.0, sd 0.8) | 2.6 (2.0–4.0, sd 0.8) | — | 25 (15–39, sd 9) (0.32 (0.30–0.38, sd 0.03)) | +832/−210 |
| #144 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 2 | 0/2 | 4.5 (3.0–6.0, sd 1.5) | $13.42 ($13.04–$13.79, sd $0.37) | 59.5 min (57.5 min–61.6 min, sd 2.1 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 18 (14–22, sd 4) (0.29 (0.28–0.31, sd 0.02)) | +611/−168 |
| #144 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 2 | 2/2 | 4.5 (4.0–5.0, sd 0.5) | $9.88 ($8.21–$11.55, sd $1.67) | 50.4 min (50.4 min–50.5 min, sd 0.0 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 25 (20–30, sd 5) (0.23 (0.20–0.26, sd 0.03)) | +708/−194 |
| #144 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 2.3 (2.0–3.0, sd 0.5) | $9.23 ($4.97–$13.04, sd $3.31) | 35.0 min (26.9 min–40.7 min, sd 5.9 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 18 (14–20, sd 3) (0.28 (0.26–0.31, sd 0.02)) | +691/−170 |
| #144 large | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 0/1 | 0.0 | $0.00 | 72.7 min | — | — | — | — | 24 (0.20) | +715/−197 |
| #144 large | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | Lore on Utopia | baseline | 1 | 0/1 | 0.0 | $0.00 | 44.4 min | — | — | — | — | 28 (0.18) | +710/−194 |
| #144 large | tdd-round | `gemini-3.8-flash` (gemini) | high (gemini-cli default) | without Lore | baseline | 5 | 0/5 | 0.4 (0.0–2.0, sd 0.8) | $0.41 ($0.00–$2.06, sd $0.82) | 65.3 min (37.5 min–110.0 min, sd 25.0 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 18 (13–19, sd 2) (0.24 (0.23–0.28, sd 0.02)) | +610/−124 |
| #144 large | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 2 | 2/2 | 2.5 (2.0–3.0, sd 0.5) | $7.19 ($6.95–$7.43, sd $0.24) | 35.9 min (31.8 min–40.1 min, sd 4.2 min) | 3.0 (3.0–3.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 15 (15–15, sd 0) (0.30 (0.30–0.30, sd 0.00)) | +533/−30 |
| #144 large | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 4 | 2/4 | 2.3 (0.0–4.0, sd 1.8) | $4.71 ($0.00–$8.79, sd $3.53) | 59.8 min (31.7 min–131.0 min, sd 41.4 min) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | 2.0 (2.0–2.0, sd 0.0) | — | 22 (20–24, sd 1) (0.23 (0.22–0.24, sd 0.01)) | +699/−151 |
| #144 large | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 5 | 4/5 | 2.0 (0.0–3.0, sd 1.3) | $6.06 ($0.00–$9.08, sd $3.30) | 55.8 min (28.0 min–138.7 min, sd 41.8 min) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | 1.8 (1.0–2.0, sd 0.4) | — | 19 (9–25, sd 5) (0.24 (0.18–0.26, sd 0.03)) | +624/−120 |
| #144 large | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | Lore on Utopia | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #144 large | tdd-round | `gemini-4-carbon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |

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
| #37 medium | dod | `claude-haiku-4-5-20251001` (claude) | with Lore | station_done ×1 |
| #37 medium | dod | `claude-haiku-4-5-20251001` (claude) | without Lore | station_done ×3, retry_budget ×2 |
| #37 medium | dod | `claude-haiku-5-5` (claude) | with Lore | station_done ×1 |
| #37 medium | dod | `claude-haiku-5-5` (claude) | Lore on Utopia | station_done ×1, retry_budget ×1, dod_scoped_out ×1 |
| #37 medium | dod | `claude-haiku-5-5` (claude) | without Lore | station_done ×5 |
| #37 medium | dod | `claude-opus-5-5` (claude) | with Lore | station_done ×1 |
| #37 medium | dod | `claude-opus-5-5` (claude) | without Lore | station_done ×5 |
| #37 medium | dod | `claude-sonnet-4-6` (claude) | with Lore | station_done ×1 |
| #37 medium | dod | `claude-sonnet-4-6` (claude) | without Lore | retry_budget ×3, station_done ×2 |
| #37 medium | dod | `claude-sonnet-5-5` (claude) | with Lore | station_done ×1 |
| #37 medium | dod | `claude-sonnet-5-5` (claude) | without Lore | station_done ×5 |
| #37 medium | dod | `gpt-5.6-luna` (codex) | with Lore | station_done ×5 |
| #37 medium | dod | `gpt-5.6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #37 medium | dod | `gpt-5.6-luna` (codex) | without Lore | station_done ×5 |
| #37 medium | dod | `gpt-5.6-sol` (codex) | with Lore | station_done ×1 |
| #37 medium | dod | `gpt-5.6-sol` (codex) | Lore on Utopia | station_done ×4, dod_scoped_out ×1 |
| #37 medium | dod | `gpt-5.6-sol` (codex) | without Lore | dod_scoped_out ×1, station_done ×4 |
| #37 medium | dod | `gpt-5.6-terra` (codex) | with Lore | station_done ×1 |
| #37 medium | dod | `gpt-5.6-terra` (codex) | Lore on Utopia | dod_scoped_out ×1, station_done ×4 |
| #37 medium | dod | `gpt-5.6-terra` (codex) | without Lore | station_done ×5 |
| #37 medium | dod | `gpt-6-astra` (codex) | with Lore | station_done ×1 |
| #37 medium | dod | `gpt-6-astra` (codex) | Lore on Utopia | dod_scoped_out ×4, station_done ×1 |
| #37 medium | dod | `gpt-6-astra` (codex) | without Lore | station_done ×2, dod_scoped_out ×3 |
| #37 medium | dod | `gpt-6-luna` (codex) | with Lore | station_done ×5 |
| #37 medium | dod | `gpt-6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #37 medium | dod | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #37 medium | dod | `gpt-6-sol` (codex) | with Lore | station_done ×1 |
| #37 medium | dod | `gpt-6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #37 medium | dod | `gpt-6-sol` (codex) | without Lore | station_done ×5 |
| #37 medium | dod | `gpt-6.1-sol` (codex) | with Lore | station_done ×1 |
| #37 medium | dod | `gpt-6.1-sol` (codex) | Lore on Utopia | station_done ×5 |
| #37 medium | dod | `gpt-6.1-sol` (codex) | without Lore | station_done ×5 |
| #37 medium | dod | `gemini-3-flash-preview` (gemini) | with Lore | station_done ×1 |
| #37 medium | dod | `gemini-3-flash-preview` (gemini) | Lore on Utopia | retry_budget ×2, station_done ×3 |
| #37 medium | dod | `gemini-3-flash-preview` (gemini) | without Lore | retry_budget ×2, station_done ×3 |
| #37 medium | dod | `gemini-3.8-flash` (gemini) | with Lore | station_done ×1 |
| #37 medium | dod | `gemini-3.8-flash` (gemini) | Lore on Utopia | retry_budget ×1 |
| #37 medium | dod | `gemini-3.8-flash` (gemini) | without Lore | retry_budget ×2, station_done ×3 |
| #37 medium | dod | `gemini-4-argon` (gemini) | with Lore | retry_budget ×1 |
| #37 medium | dod | `gemini-4-argon` (gemini) | Lore on Utopia | retry_budget ×2, station_done ×2 |
| #37 medium | dod | `gemini-4-argon` (gemini) | without Lore | station_done ×2, retry_budget ×3 |
| #37 medium | repair-build | `claude-haiku-4-5-20251001` (claude) | with Lore | station_done ×1 |
| #37 medium | repair-build | `claude-haiku-4-5-20251001` (claude) | without Lore | station_done ×3, retry_budget ×2 |
| #37 medium | repair-build | `claude-haiku-5-5` (claude) | with Lore | station_done ×1 |
| #37 medium | repair-build | `claude-haiku-5-5` (claude) | Lore on Utopia | station_done ×3 |
| #37 medium | repair-build | `claude-haiku-5-5` (claude) | without Lore | station_done ×5 |
| #37 medium | repair-build | `claude-opus-5-5` (claude) | with Lore | station_done ×1 |
| #37 medium | repair-build | `claude-opus-5-5` (claude) | without Lore | station_done ×5 |
| #37 medium | repair-build | `claude-sonnet-4-6` (claude) | with Lore | station_done ×1 |
| #37 medium | repair-build | `claude-sonnet-4-6` (claude) | without Lore | station_done ×4, green ×1 |
| #37 medium | repair-build | `claude-sonnet-5-5` (claude) | with Lore | station_done ×1 |
| #37 medium | repair-build | `claude-sonnet-5-5` (claude) | without Lore | station_done ×5 |
| #37 medium | repair-build | `gpt-5.6-luna` (codex) | with Lore | station_done ×5 |
| #37 medium | repair-build | `gpt-5.6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #37 medium | repair-build | `gpt-5.6-luna` (codex) | without Lore | station_done ×5 |
| #37 medium | repair-build | `gpt-5.6-sol` (codex) | with Lore | station_done ×1 |
| #37 medium | repair-build | `gpt-5.6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #37 medium | repair-build | `gpt-5.6-sol` (codex) | without Lore | station_done ×5 |
| #37 medium | repair-build | `gpt-5.6-terra` (codex) | with Lore | station_done ×1 |
| #37 medium | repair-build | `gpt-5.6-terra` (codex) | Lore on Utopia | station_done ×5 |
| #37 medium | repair-build | `gpt-5.6-terra` (codex) | without Lore | station_done ×5 |
| #37 medium | repair-build | `gpt-6-astra` (codex) | with Lore | station_done ×1 |
| #37 medium | repair-build | `gpt-6-astra` (codex) | Lore on Utopia | station_done ×5 |
| #37 medium | repair-build | `gpt-6-astra` (codex) | without Lore | station_done ×5 |
| #37 medium | repair-build | `gpt-6-luna` (codex) | with Lore | station_done ×5 |
| #37 medium | repair-build | `gpt-6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #37 medium | repair-build | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #37 medium | repair-build | `gpt-6-sol` (codex) | with Lore | station_done ×1 |
| #37 medium | repair-build | `gpt-6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #37 medium | repair-build | `gpt-6-sol` (codex) | without Lore | station_done ×5 |
| #37 medium | repair-build | `gpt-6.1-sol` (codex) | with Lore | station_done ×1 |
| #37 medium | repair-build | `gpt-6.1-sol` (codex) | Lore on Utopia | station_done ×4, green ×1 |
| #37 medium | repair-build | `gpt-6.1-sol` (codex) | without Lore | station_done ×5 |
| #37 medium | repair-build | `gemini-3-flash-preview` (gemini) | with Lore | station_done ×3 |
| #37 medium | repair-build | `gemini-3-flash-preview` (gemini) | Lore on Utopia | station_done ×5 |
| #37 medium | repair-build | `gemini-3-flash-preview` (gemini) | without Lore | station_done ×5 |
| #37 medium | repair-build | `gemini-3.1-pro-preview` (gemini) | with Lore | station_done ×3 |
| #37 medium | repair-build | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | station_done ×3 |
| #37 medium | repair-build | `gemini-3.1-pro-preview` (gemini) | without Lore | station_done ×3 |
| #37 medium | repair-build | `gemini-3.8-flash` (gemini) | with Lore | station_done ×1 |
| #37 medium | repair-build | `gemini-3.8-flash` (gemini) | Lore on Utopia | station_done ×1 |
| #37 medium | repair-build | `gemini-3.8-flash` (gemini) | without Lore | station_done ×5 |
| #37 medium | repair-build | `gemini-4-argon` (gemini) | with Lore | station_done ×1, green ×2 |
| #37 medium | repair-build | `gemini-4-argon` (gemini) | Lore on Utopia | green ×3, station_done ×1 |
| #37 medium | repair-build | `gemini-4-argon` (gemini) | without Lore | green ×1, station_done ×4 |
| #37 medium | tdd-round | `claude-haiku-4-5-20251001` (claude) | with Lore | retry_budget ×1 |
| #37 medium | tdd-round | `claude-haiku-4-5-20251001` (claude) | without Lore | retry_budget ×5 |
| #37 medium | tdd-round | `claude-haiku-5-5` (claude) | with Lore | retry_budget ×1 |
| #37 medium | tdd-round | `claude-haiku-5-5` (claude) | Lore on Utopia | retry_budget ×3 |
| #37 medium | tdd-round | `claude-haiku-5-5` (claude) | without Lore | retry_budget ×5 |
| #37 medium | tdd-round | `claude-opus-5-5` (claude) | with Lore | retry_budget ×1 |
| #37 medium | tdd-round | `claude-opus-5-5` (claude) | without Lore | retry_budget ×3, green ×2 |
| #37 medium | tdd-round | `claude-sonnet-4-6` (claude) | with Lore | retry_budget ×1 |
| #37 medium | tdd-round | `claude-sonnet-4-6` (claude) | without Lore | retry_budget ×5 |
| #37 medium | tdd-round | `claude-sonnet-5-5` (claude) | with Lore | green ×1 |
| #37 medium | tdd-round | `claude-sonnet-5-5` (claude) | without Lore | retry_budget ×1, green ×3, round_budget ×1 |
| #37 medium | tdd-round | `glm-5.3-flash` (claude) | without Lore | green ×4, retry_budget ×1 |
| #37 medium | tdd-round | `gpt-5.6-luna` (codex) | with Lore | green ×2, round_budget ×3 |
| #37 medium | tdd-round | `gpt-5.6-luna` (codex) | Lore on Utopia | round_budget ×4, green ×1 |
| #37 medium | tdd-round | `gpt-5.6-luna` (codex) | without Lore | round_budget ×3, green ×2 |
| #37 medium | tdd-round | `gpt-5.6-sol` (codex) | with Lore | green ×1 |
| #37 medium | tdd-round | `gpt-5.6-sol` (codex) | Lore on Utopia | green ×3, round_budget ×2 |
| #37 medium | tdd-round | `gpt-5.6-sol` (codex) | without Lore | green ×4, round_budget ×1 |
| #37 medium | tdd-round | `gpt-5.6-terra` (codex) | with Lore | green ×1 |
| #37 medium | tdd-round | `gpt-5.6-terra` (codex) | Lore on Utopia | green ×4, round_budget ×1 |
| #37 medium | tdd-round | `gpt-5.6-terra` (codex) | without Lore | green ×5 |
| #37 medium | tdd-round | `gpt-6-astra` (codex) | with Lore | retry_budget ×1 |
| #37 medium | tdd-round | `gpt-6-astra` (codex) | Lore on Utopia | green ×3, retry_budget ×2 |
| #37 medium | tdd-round | `gpt-6-astra` (codex) | without Lore | retry_budget ×5 |
| #37 medium | tdd-round | `gpt-6-luna` (codex) | with Lore | green ×4, round_budget ×1 |
| #37 medium | tdd-round | `gpt-6-luna` (codex) | Lore on Utopia | green ×4, round_budget ×1 |
| #37 medium | tdd-round | `gpt-6-luna` (codex) | without Lore | retry_budget ×4, green ×1 |
| #37 medium | tdd-round | `gpt-6-sol` (codex) | with Lore | green ×1 |
| #37 medium | tdd-round | `gpt-6-sol` (codex) | Lore on Utopia | green ×4, round_budget ×1 |
| #37 medium | tdd-round | `gpt-6-sol` (codex) | without Lore | green ×3, round_budget ×2 |
| #37 medium | tdd-round | `gpt-6.1-sol` (codex) | with Lore | green ×1 |
| #37 medium | tdd-round | `gpt-6.1-sol` (codex) | Lore on Utopia | green ×4, retry_budget ×1 |
| #37 medium | tdd-round | `gpt-6.1-sol` (codex) | without Lore | retry_budget ×5 |
| #37 medium | tdd-round | `gemini-3-flash-preview` (gemini) | with Lore | round_budget ×2, green ×1 |
| #37 medium | tdd-round | `gemini-3-flash-preview` (gemini) | Lore on Utopia | green ×1, round_budget ×2, retry_budget ×2 |
| #37 medium | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | round_budget ×4, retry_budget ×1 |
| #37 medium | tdd-round | `gemini-3.1-pro-preview` (gemini) | with Lore | retry_budget ×1, green ×2 |
| #37 medium | tdd-round | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×2, station_done ×1 |
| #37 medium | tdd-round | `gemini-3.1-pro-preview` (gemini) | without Lore | retry_budget ×2, round_budget ×1 |
| #37 medium | tdd-round | `gemini-3.8-flash` (gemini) | with Lore | retry_budget ×1 |
| #37 medium | tdd-round | `gemini-3.8-flash` (gemini) | Lore on Utopia | retry_budget ×1 |
| #37 medium | tdd-round | `gemini-3.8-flash` (gemini) | without Lore | retry_budget ×5 |
| #37 medium | tdd-round | `gemini-4-argon` (gemini) | with Lore | green ×3 |
| #37 medium | tdd-round | `gemini-4-argon` (gemini) | Lore on Utopia | green ×3, retry_budget ×1 |
| #37 medium | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×4, retry_budget ×1 |
| #93 small | baseline | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×1 |
| #93 small | dod | `claude-fable-5-1` (claude) | without Lore | station_done ×1 |
| #93 small | dod | `claude-haiku-4-5-20251001` (claude) | with Lore | station_done ×5 |
| #93 small | dod | `claude-haiku-4-5-20251001` (claude) | Lore on Utopia | station_done ×5 |
| #93 small | dod | `claude-haiku-4-5-20251001` (claude) | without Lore | station_done ×5 |
| #93 small | dod | `claude-haiku-5-5` (claude) | with Lore | station_done ×5 |
| #93 small | dod | `claude-haiku-5-5` (claude) | Lore on Utopia | station_done ×5 |
| #93 small | dod | `claude-haiku-5-5` (claude) | without Lore | station_done ×5 |
| #93 small | dod | `claude-opus-5-5` (claude) | with Lore | station_done ×1 |
| #93 small | dod | `claude-opus-5-5` (claude) | without Lore | station_done ×5 |
| #93 small | dod | `claude-sonnet-4-6` (claude) | with Lore | station_done ×1 |
| #93 small | dod | `claude-sonnet-4-6` (claude) | without Lore | station_done ×2, retry_budget ×3 |
| #93 small | dod | `claude-sonnet-5-5` (claude) | with Lore | station_done ×1 |
| #93 small | dod | `claude-sonnet-5-5` (claude) | without Lore | station_done ×5 |
| #93 small | dod | `gpt-5.6-luna` (codex) | with Lore | station_done ×5 |
| #93 small | dod | `gpt-5.6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #93 small | dod | `gpt-5.6-luna` (codex) | without Lore | station_done ×5 |
| #93 small | dod | `gpt-5.6-sol` (codex) | with Lore | station_done ×1 |
| #93 small | dod | `gpt-5.6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #93 small | dod | `gpt-5.6-sol` (codex) | without Lore | station_done ×5 |
| #93 small | dod | `gpt-5.6-terra` (codex) | with Lore | station_done ×1 |
| #93 small | dod | `gpt-5.6-terra` (codex) | Lore on Utopia | station_done ×5 |
| #93 small | dod | `gpt-5.6-terra` (codex) | without Lore | station_done ×5 |
| #93 small | dod | `gpt-6-astra` (codex) | with Lore | station_done ×1 |
| #93 small | dod | `gpt-6-astra` (codex) | Lore on Utopia | station_done ×5 |
| #93 small | dod | `gpt-6-astra` (codex) | without Lore | station_done ×5 |
| #93 small | dod | `gpt-6-luna` (codex) | with Lore | station_done ×5 |
| #93 small | dod | `gpt-6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #93 small | dod | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #93 small | dod | `gpt-6-sol` (codex) | with Lore | station_done ×1 |
| #93 small | dod | `gpt-6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #93 small | dod | `gpt-6-sol` (codex) | without Lore | station_done ×5 |
| #93 small | dod | `gpt-6.1-sol` (codex) | with Lore | station_done ×1 |
| #93 small | dod | `gpt-6.1-sol` (codex) | Lore on Utopia | station_done ×5 |
| #93 small | dod | `gpt-6.1-sol` (codex) | without Lore | station_done ×5 |
| #93 small | dod | `gemini-3-flash-preview` (gemini) | with Lore | station_done ×1 |
| #93 small | dod | `gemini-3-flash-preview` (gemini) | Lore on Utopia | station_done ×4, retry_budget ×1 |
| #93 small | dod | `gemini-3-flash-preview` (gemini) | without Lore | station_done ×4, retry_budget ×1 |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | without Lore | station_done ×1 |
| #93 small | dod | `gemini-3.1-pro-preview` (gemini) | without Lore | station_done ×1 |
| #93 small | dod | `gemini-3.8-flash` (gemini) | with Lore | station_done ×1 |
| #93 small | dod | `gemini-3.8-flash` (gemini) | Lore on Utopia | station_done ×2 |
| #93 small | dod | `gemini-3.8-flash` (gemini) | without Lore | station_done ×4, retry_budget ×1 |
| #93 small | dod | `gemini-4-argon` (gemini) | with Lore | station_done ×1 |
| #93 small | dod | `gemini-4-argon` (gemini) | Lore on Utopia | retry_budget ×1, station_done ×4 |
| #93 small | dod | `gemini-4-argon` (gemini) | without Lore | station_done ×3, retry_budget ×2 |
| #93 small | repair-build | `claude-haiku-4-5-20251001` (claude) | with Lore | green ×3, station_done ×2 |
| #93 small | repair-build | `claude-haiku-4-5-20251001` (claude) | Lore on Utopia | station_done ×2, green ×2 |
| #93 small | repair-build | `claude-haiku-4-5-20251001` (claude) | without Lore | green ×3, station_done ×2 |
| #93 small | repair-build | `claude-haiku-5-5` (claude) | with Lore | green ×5 |
| #93 small | repair-build | `claude-haiku-5-5` (claude) | Lore on Utopia | green ×3, station_done ×1 |
| #93 small | repair-build | `claude-haiku-5-5` (claude) | without Lore | green ×4, station_done ×1 |
| #93 small | repair-build | `claude-opus-5-5` (claude) | with Lore | green ×1 |
| #93 small | repair-build | `claude-opus-5-5` (claude) | without Lore | station_done ×2, green ×3 |
| #93 small | repair-build | `claude-sonnet-4-6` (claude) | with Lore | station_done ×1 |
| #93 small | repair-build | `claude-sonnet-4-6` (claude) | without Lore | green ×4, station_done ×1 |
| #93 small | repair-build | `claude-sonnet-5-5` (claude) | with Lore | station_done ×1 |
| #93 small | repair-build | `claude-sonnet-5-5` (claude) | without Lore | green ×2, station_done ×3 |
| #93 small | repair-build | `gpt-5.6-luna` (codex) | with Lore | station_done ×2, green ×3 |
| #93 small | repair-build | `gpt-5.6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #93 small | repair-build | `gpt-5.6-luna` (codex) | without Lore | station_done ×2, green ×3 |
| #93 small | repair-build | `gpt-5.6-sol` (codex) | with Lore | station_done ×1, green ×2 |
| #93 small | repair-build | `gpt-5.6-sol` (codex) | Lore on Utopia | green ×4, station_done ×1 |
| #93 small | repair-build | `gpt-5.6-sol` (codex) | without Lore | green ×4, station_done ×1 |
| #93 small | repair-build | `gpt-5.6-terra` (codex) | with Lore | green ×2, station_done ×1 |
| #93 small | repair-build | `gpt-5.6-terra` (codex) | Lore on Utopia | green ×3, station_done ×2 |
| #93 small | repair-build | `gpt-5.6-terra` (codex) | without Lore | station_done ×5 |
| #93 small | repair-build | `gpt-6-astra` (codex) | with Lore | green ×3 |
| #93 small | repair-build | `gpt-6-astra` (codex) | Lore on Utopia | green ×5 |
| #93 small | repair-build | `gpt-6-astra` (codex) | without Lore | green ×5 |
| #93 small | repair-build | `gpt-6-luna` (codex) | with Lore | station_done ×4, green ×1 |
| #93 small | repair-build | `gpt-6-luna` (codex) | Lore on Utopia | station_done ×4, green ×1 |
| #93 small | repair-build | `gpt-6-luna` (codex) | without Lore | station_done ×3, green ×2 |
| #93 small | repair-build | `gpt-6-sol` (codex) | with Lore | station_done ×2, green ×1 |
| #93 small | repair-build | `gpt-6-sol` (codex) | Lore on Utopia | station_done ×2, green ×3 |
| #93 small | repair-build | `gpt-6-sol` (codex) | without Lore | green ×3, station_done ×2 |
| #93 small | repair-build | `gpt-6.1-sol` (codex) | with Lore | green ×3 |
| #93 small | repair-build | `gpt-6.1-sol` (codex) | Lore on Utopia | green ×5 |
| #93 small | repair-build | `gpt-6.1-sol` (codex) | without Lore | green ×5 |
| #93 small | repair-build | `gemini-3-flash-preview` (gemini) | with Lore | green ×5 |
| #93 small | repair-build | `gemini-3-flash-preview` (gemini) | Lore on Utopia | green ×2, station_done ×3 |
| #93 small | repair-build | `gemini-3-flash-preview` (gemini) | without Lore | green ×5 |
| #93 small | repair-build | `gemini-3.1-pro-preview` (gemini) | with Lore | green ×5 |
| #93 small | repair-build | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×5 |
| #93 small | repair-build | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×4, station_done ×1 |
| #93 small | repair-build | `gemini-3.8-flash` (gemini) | with Lore | green ×1 |
| #93 small | repair-build | `gemini-3.8-flash` (gemini) | Lore on Utopia | green ×2 |
| #93 small | repair-build | `gemini-3.8-flash` (gemini) | without Lore | green ×5 |
| #93 small | repair-build | `gemini-4-argon` (gemini) | with Lore | green ×5 |
| #93 small | repair-build | `gemini-4-argon` (gemini) | Lore on Utopia | green ×5 |
| #93 small | repair-build | `gemini-4-argon` (gemini) | without Lore | green ×5 |
| #93 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | with Lore | green ×5 |
| #93 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | Lore on Utopia | green ×4 |
| #93 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | without Lore | green ×5 |
| #93 small | tdd-round | `claude-haiku-5-5` (claude) | with Lore | green ×4, retry_budget ×1 |
| #93 small | tdd-round | `claude-haiku-5-5` (claude) | Lore on Utopia | green ×3, retry_budget ×1 |
| #93 small | tdd-round | `claude-haiku-5-5` (claude) | without Lore | green ×4, retry_budget ×1 |
| #93 small | tdd-round | `claude-opus-5-5` (claude) | with Lore | retry_budget ×1 |
| #93 small | tdd-round | `claude-opus-5-5` (claude) | without Lore | green ×3, retry_budget ×2 |
| #93 small | tdd-round | `claude-sonnet-4-6` (claude) | with Lore | green ×1 |
| #93 small | tdd-round | `claude-sonnet-4-6` (claude) | without Lore | retry_budget ×5 |
| #93 small | tdd-round | `claude-sonnet-5-5` (claude) | with Lore | station_done ×1 |
| #93 small | tdd-round | `claude-sonnet-5-5` (claude) | without Lore | green ×5 |
| #93 small | tdd-round | `glm-5.3-flash` (claude) | without Lore | green ×5 |
| #93 small | tdd-round | `gpt-5.6-luna` (codex) | with Lore | green ×5 |
| #93 small | tdd-round | `gpt-5.6-luna` (codex) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gpt-5.6-luna` (codex) | without Lore | green ×4, station_done ×1 |
| #93 small | tdd-round | `gpt-5.6-sol` (codex) | with Lore | green ×3 |
| #93 small | tdd-round | `gpt-5.6-sol` (codex) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gpt-5.6-sol` (codex) | without Lore | green ×5 |
| #93 small | tdd-round | `gpt-5.6-terra` (codex) | with Lore | green ×3 |
| #93 small | tdd-round | `gpt-5.6-terra` (codex) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gpt-5.6-terra` (codex) | without Lore | green ×5 |
| #93 small | tdd-round | `gpt-6-astra` (codex) | with Lore | green ×3 |
| #93 small | tdd-round | `gpt-6-astra` (codex) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gpt-6-astra` (codex) | without Lore | retry_budget ×5 |
| #93 small | tdd-round | `gpt-6-luna` (codex) | with Lore | green ×5 |
| #93 small | tdd-round | `gpt-6-luna` (codex) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gpt-6-luna` (codex) | without Lore | green ×3, retry_budget ×2 |
| #93 small | tdd-round | `gpt-6-sol` (codex) | with Lore | green ×3 |
| #93 small | tdd-round | `gpt-6-sol` (codex) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gpt-6-sol` (codex) | without Lore | green ×5 |
| #93 small | tdd-round | `gpt-6.1-sol` (codex) | with Lore | green ×3 |
| #93 small | tdd-round | `gpt-6.1-sol` (codex) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gpt-6.1-sol` (codex) | without Lore | retry_budget ×5 |
| #93 small | tdd-round | `gemini-3-flash-preview` (gemini) | with Lore | green ×5 |
| #93 small | tdd-round | `gemini-3-flash-preview` (gemini) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | green ×5 |
| #93 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | with Lore | green ×5 |
| #93 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×5 |
| #93 small | tdd-round | `gemini-3.8-flash` (gemini) | with Lore | retry_budget ×1 |
| #93 small | tdd-round | `gemini-3.8-flash` (gemini) | Lore on Utopia | green ×1, retry_budget ×1 |
| #93 small | tdd-round | `gemini-3.8-flash` (gemini) | without Lore | retry_budget ×2, green ×3 |
| #93 small | tdd-round | `gemini-4-argon` (gemini) | with Lore | green ×5 |
| #93 small | tdd-round | `gemini-4-argon` (gemini) | Lore on Utopia | green ×5 |
| #93 small | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×5 |
| #94 small | dod | `claude-haiku-4-5-20251001` (claude) | with Lore | station_done ×1 |
| #94 small | dod | `claude-haiku-4-5-20251001` (claude) | without Lore | station_done ×5 |
| #94 small | dod | `claude-haiku-5-5` (claude) | with Lore | station_done ×1 |
| #94 small | dod | `claude-haiku-5-5` (claude) | Lore on Utopia | station_done ×4 |
| #94 small | dod | `claude-haiku-5-5` (claude) | without Lore | station_done ×5 |
| #94 small | dod | `claude-opus-5-5` (claude) | with Lore | station_done ×1 |
| #94 small | dod | `claude-opus-5-5` (claude) | without Lore | station_done ×5 |
| #94 small | dod | `claude-sonnet-4-6` (claude) | with Lore | station_done ×1 |
| #94 small | dod | `claude-sonnet-4-6` (claude) | without Lore | station_done ×5 |
| #94 small | dod | `claude-sonnet-5-5` (claude) | with Lore | station_done ×1 |
| #94 small | dod | `claude-sonnet-5-5` (claude) | without Lore | station_done ×5 |
| #94 small | dod | `gpt-5.6-luna` (codex) | with Lore | station_done ×5 |
| #94 small | dod | `gpt-5.6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #94 small | dod | `gpt-5.6-luna` (codex) | without Lore | station_done ×5 |
| #94 small | dod | `gpt-5.6-sol` (codex) | with Lore | station_done ×1 |
| #94 small | dod | `gpt-5.6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #94 small | dod | `gpt-5.6-sol` (codex) | without Lore | station_done ×5 |
| #94 small | dod | `gpt-5.6-terra` (codex) | with Lore | station_done ×1 |
| #94 small | dod | `gpt-5.6-terra` (codex) | Lore on Utopia | station_done ×5 |
| #94 small | dod | `gpt-5.6-terra` (codex) | without Lore | station_done ×5 |
| #94 small | dod | `gpt-6-astra` (codex) | with Lore | station_done ×1 |
| #94 small | dod | `gpt-6-astra` (codex) | Lore on Utopia | station_done ×5 |
| #94 small | dod | `gpt-6-astra` (codex) | without Lore | station_done ×5 |
| #94 small | dod | `gpt-6-luna` (codex) | with Lore | station_done ×5 |
| #94 small | dod | `gpt-6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #94 small | dod | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #94 small | dod | `gpt-6-sol` (codex) | with Lore | station_done ×1 |
| #94 small | dod | `gpt-6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #94 small | dod | `gpt-6-sol` (codex) | without Lore | station_done ×5 |
| #94 small | dod | `gpt-6.1-sol` (codex) | with Lore | station_done ×1 |
| #94 small | dod | `gpt-6.1-sol` (codex) | Lore on Utopia | station_done ×5 |
| #94 small | dod | `gpt-6.1-sol` (codex) | without Lore | station_done ×5 |
| #94 small | dod | `gemini-3-flash-preview` (gemini) | with Lore | station_done ×1 |
| #94 small | dod | `gemini-3-flash-preview` (gemini) | Lore on Utopia | station_done ×4, retry_budget ×1 |
| #94 small | dod | `gemini-3-flash-preview` (gemini) | without Lore | station_done ×3, retry_budget ×2 |
| #94 small | dod | `gemini-3.8-flash` (gemini) | with Lore | retry_budget ×1 |
| #94 small | dod | `gemini-3.8-flash` (gemini) | Lore on Utopia | station_done ×2 |
| #94 small | dod | `gemini-3.8-flash` (gemini) | without Lore | retry_budget ×1, station_done ×4 |
| #94 small | dod | `gemini-4-argon` (gemini) | with Lore | station_done ×1 |
| #94 small | dod | `gemini-4-argon` (gemini) | Lore on Utopia | station_done ×5 |
| #94 small | dod | `gemini-4-argon` (gemini) | without Lore | station_done ×5 |
| #94 small | repair-build | `claude-haiku-4-5-20251001` (claude) | with Lore | station_done ×4, green ×1 |
| #94 small | repair-build | `claude-haiku-4-5-20251001` (claude) | Lore on Utopia | green ×1, station_done ×5 |
| #94 small | repair-build | `claude-haiku-4-5-20251001` (claude) | without Lore | station_done ×5 |
| #94 small | repair-build | `claude-haiku-5-5` (claude) | with Lore | station_done ×5 |
| #94 small | repair-build | `claude-haiku-5-5` (claude) | Lore on Utopia | station_done ×6 |
| #94 small | repair-build | `claude-haiku-5-5` (claude) | without Lore | station_done ×5 |
| #94 small | repair-build | `claude-opus-5-5` (claude) | with Lore | station_done ×1 |
| #94 small | repair-build | `claude-opus-5-5` (claude) | without Lore | station_done ×5 |
| #94 small | repair-build | `claude-sonnet-4-6` (claude) | with Lore | station_done ×1 |
| #94 small | repair-build | `claude-sonnet-4-6` (claude) | without Lore | station_done ×5 |
| #94 small | repair-build | `claude-sonnet-5-5` (claude) | with Lore | station_done ×1 |
| #94 small | repair-build | `claude-sonnet-5-5` (claude) | without Lore | station_done ×5 |
| #94 small | repair-build | `gpt-5.6-luna` (codex) | with Lore | station_done ×5 |
| #94 small | repair-build | `gpt-5.6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #94 small | repair-build | `gpt-5.6-luna` (codex) | without Lore | station_done ×5 |
| #94 small | repair-build | `gpt-5.6-sol` (codex) | with Lore | station_done ×1 |
| #94 small | repair-build | `gpt-5.6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #94 small | repair-build | `gpt-5.6-sol` (codex) | without Lore | station_done ×5 |
| #94 small | repair-build | `gpt-5.6-terra` (codex) | with Lore | station_done ×1 |
| #94 small | repair-build | `gpt-5.6-terra` (codex) | Lore on Utopia | station_done ×5 |
| #94 small | repair-build | `gpt-5.6-terra` (codex) | without Lore | station_done ×5 |
| #94 small | repair-build | `gpt-6-astra` (codex) | with Lore | green ×1 |
| #94 small | repair-build | `gpt-6-astra` (codex) | Lore on Utopia | green ×5 |
| #94 small | repair-build | `gpt-6-astra` (codex) | without Lore | green ×5 |
| #94 small | repair-build | `gpt-6-luna` (codex) | with Lore | station_done ×5 |
| #94 small | repair-build | `gpt-6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #94 small | repair-build | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #94 small | repair-build | `gpt-6-sol` (codex) | with Lore | station_done ×1 |
| #94 small | repair-build | `gpt-6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #94 small | repair-build | `gpt-6-sol` (codex) | without Lore | station_done ×5 |
| #94 small | repair-build | `gpt-6.1-sol` (codex) | with Lore | green ×1 |
| #94 small | repair-build | `gpt-6.1-sol` (codex) | Lore on Utopia | green ×2, station_done ×3 |
| #94 small | repair-build | `gpt-6.1-sol` (codex) | without Lore | green ×5 |
| #94 small | repair-build | `gemini-3-flash-preview` (gemini) | with Lore | green ×1, station_done ×2 |
| #94 small | repair-build | `gemini-3-flash-preview` (gemini) | Lore on Utopia | station_done ×4, green ×1 |
| #94 small | repair-build | `gemini-3-flash-preview` (gemini) | without Lore | green ×3, station_done ×2 |
| #94 small | repair-build | `gemini-3.1-pro-preview` (gemini) | with Lore | station_done ×3 |
| #94 small | repair-build | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | station_done ×3 |
| #94 small | repair-build | `gemini-3.1-pro-preview` (gemini) | without Lore | station_done ×3 |
| #94 small | repair-build | `gemini-3.8-flash` (gemini) | with Lore | green ×1 |
| #94 small | repair-build | `gemini-3.8-flash` (gemini) | Lore on Utopia | station_done ×2 |
| #94 small | repair-build | `gemini-3.8-flash` (gemini) | without Lore | green ×2, station_done ×3 |
| #94 small | repair-build | `gemini-4-argon` (gemini) | with Lore | green ×3 |
| #94 small | repair-build | `gemini-4-argon` (gemini) | Lore on Utopia | green ×4, station_done ×1 |
| #94 small | repair-build | `gemini-4-argon` (gemini) | without Lore | green ×3, station_done ×2 |
| #94 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | with Lore | green ×5 |
| #94 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | Lore on Utopia | green ×6 |
| #94 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | without Lore | green ×5 |
| #94 small | tdd-round | `claude-haiku-5-5` (claude) | with Lore | retry_budget ×4, green ×1 |
| #94 small | tdd-round | `claude-haiku-5-5` (claude) | Lore on Utopia | retry_budget ×5 |
| #94 small | tdd-round | `claude-haiku-5-5` (claude) | without Lore | retry_budget ×3, green ×2 |
| #94 small | tdd-round | `claude-opus-5-5` (claude) | with Lore | green ×1 |
| #94 small | tdd-round | `claude-opus-5-5` (claude) | without Lore | green ×2, retry_budget ×3 |
| #94 small | tdd-round | `claude-sonnet-4-6` (claude) | with Lore | retry_budget ×1 |
| #94 small | tdd-round | `claude-sonnet-4-6` (claude) | without Lore | retry_budget ×4, green ×1 |
| #94 small | tdd-round | `claude-sonnet-5-5` (claude) | with Lore | station_done ×1 |
| #94 small | tdd-round | `claude-sonnet-5-5` (claude) | without Lore | green ×5 |
| #94 small | tdd-round | `glm-5.3-flash` (claude) | without Lore | green ×5 |
| #94 small | tdd-round | `gpt-5.6-luna` (codex) | with Lore | green ×5 |
| #94 small | tdd-round | `gpt-5.6-luna` (codex) | Lore on Utopia | green ×5 |
| #94 small | tdd-round | `gpt-5.6-luna` (codex) | without Lore | green ×3, station_done ×1, retry_budget ×1 |
| #94 small | tdd-round | `gpt-5.6-sol` (codex) | with Lore | green ×1 |
| #94 small | tdd-round | `gpt-5.6-sol` (codex) | Lore on Utopia | green ×4, retry_budget ×1 |
| #94 small | tdd-round | `gpt-5.6-sol` (codex) | without Lore | green ×5 |
| #94 small | tdd-round | `gpt-5.6-terra` (codex) | with Lore | retry_budget ×1 |
| #94 small | tdd-round | `gpt-5.6-terra` (codex) | Lore on Utopia | green ×5 |
| #94 small | tdd-round | `gpt-5.6-terra` (codex) | without Lore | green ×4, retry_budget ×1 |
| #94 small | tdd-round | `gpt-6-astra` (codex) | with Lore | retry_budget ×1 |
| #94 small | tdd-round | `gpt-6-astra` (codex) | Lore on Utopia | retry_budget ×4, green ×1 |
| #94 small | tdd-round | `gpt-6-astra` (codex) | without Lore | retry_budget ×5 |
| #94 small | tdd-round | `gpt-6-luna` (codex) | with Lore | retry_budget ×4, green ×1 |
| #94 small | tdd-round | `gpt-6-luna` (codex) | Lore on Utopia | green ×2, retry_budget ×3 |
| #94 small | tdd-round | `gpt-6-luna` (codex) | without Lore | green ×4, retry_budget ×1 |
| #94 small | tdd-round | `gpt-6-sol` (codex) | with Lore | retry_budget ×1 |
| #94 small | tdd-round | `gpt-6-sol` (codex) | Lore on Utopia | retry_budget ×2, green ×3 |
| #94 small | tdd-round | `gpt-6-sol` (codex) | without Lore | green ×3, retry_budget ×2 |
| #94 small | tdd-round | `gpt-6.1-sol` (codex) | with Lore | retry_budget ×1 |
| #94 small | tdd-round | `gpt-6.1-sol` (codex) | Lore on Utopia | retry_budget ×3, green ×2 |
| #94 small | tdd-round | `gpt-6.1-sol` (codex) | without Lore | retry_budget ×3, green ×2 |
| #94 small | tdd-round | `gemini-3-flash-preview` (gemini) | with Lore | green ×3 |
| #94 small | tdd-round | `gemini-3-flash-preview` (gemini) | Lore on Utopia | green ×4, retry_budget ×1 |
| #94 small | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | green ×4, retry_budget ×1 |
| #94 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | with Lore | green ×3 |
| #94 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×3 |
| #94 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×3 |
| #94 small | tdd-round | `gemini-3.8-flash` (gemini) | with Lore | green ×1 |
| #94 small | tdd-round | `gemini-3.8-flash` (gemini) | Lore on Utopia | retry_budget ×1 |
| #94 small | tdd-round | `gemini-3.8-flash` (gemini) | without Lore | green ×3, retry_budget ×2 |
| #94 small | tdd-round | `gemini-4-argon` (gemini) | with Lore | green ×2, retry_budget ×1 |
| #94 small | tdd-round | `gemini-4-argon` (gemini) | Lore on Utopia | green ×3, retry_budget ×2 |
| #94 small | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×5 |
| #95 small | dod | `claude-haiku-4-5-20251001` (claude) | with Lore | station_done ×1 |
| #95 small | dod | `claude-haiku-4-5-20251001` (claude) | without Lore | station_done ×5 |
| #95 small | dod | `claude-haiku-5-5` (claude) | with Lore | station_done ×1 |
| #95 small | dod | `claude-haiku-5-5` (claude) | Lore on Utopia | station_done ×3, retry_budget ×1 |
| #95 small | dod | `claude-haiku-5-5` (claude) | without Lore | station_done ×5 |
| #95 small | dod | `claude-opus-5-5` (claude) | with Lore | station_done ×1 |
| #95 small | dod | `claude-opus-5-5` (claude) | without Lore | station_done ×5 |
| #95 small | dod | `claude-sonnet-4-6` (claude) | with Lore | station_done ×1 |
| #95 small | dod | `claude-sonnet-4-6` (claude) | without Lore | station_done ×5 |
| #95 small | dod | `claude-sonnet-5-5` (claude) | with Lore | station_done ×1 |
| #95 small | dod | `claude-sonnet-5-5` (claude) | without Lore | station_done ×5 |
| #95 small | dod | `gpt-5.6-luna` (codex) | with Lore | station_done ×5 |
| #95 small | dod | `gpt-5.6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #95 small | dod | `gpt-5.6-luna` (codex) | without Lore | station_done ×5 |
| #95 small | dod | `gpt-5.6-sol` (codex) | with Lore | station_done ×1 |
| #95 small | dod | `gpt-5.6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #95 small | dod | `gpt-5.6-sol` (codex) | without Lore | station_done ×5 |
| #95 small | dod | `gpt-5.6-terra` (codex) | with Lore | station_done ×1 |
| #95 small | dod | `gpt-5.6-terra` (codex) | Lore on Utopia | station_done ×5 |
| #95 small | dod | `gpt-5.6-terra` (codex) | without Lore | station_done ×5 |
| #95 small | dod | `gpt-6-astra` (codex) | with Lore | station_done ×1 |
| #95 small | dod | `gpt-6-astra` (codex) | Lore on Utopia | station_done ×5 |
| #95 small | dod | `gpt-6-astra` (codex) | without Lore | station_done ×4, dod_scoped_out ×1 |
| #95 small | dod | `gpt-6-luna` (codex) | with Lore | station_done ×5 |
| #95 small | dod | `gpt-6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #95 small | dod | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #95 small | dod | `gpt-6-sol` (codex) | with Lore | station_done ×1 |
| #95 small | dod | `gpt-6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #95 small | dod | `gpt-6-sol` (codex) | without Lore | station_done ×5 |
| #95 small | dod | `gpt-6.1-sol` (codex) | with Lore | station_done ×1 |
| #95 small | dod | `gpt-6.1-sol` (codex) | Lore on Utopia | station_done ×5 |
| #95 small | dod | `gpt-6.1-sol` (codex) | without Lore | station_done ×5 |
| #95 small | dod | `gemini-3-flash-preview` (gemini) | with Lore | station_done ×1 |
| #95 small | dod | `gemini-3-flash-preview` (gemini) | Lore on Utopia | retry_budget ×1, station_done ×4 |
| #95 small | dod | `gemini-3-flash-preview` (gemini) | without Lore | station_done ×4, retry_budget ×1 |
| #95 small | dod | `gemini-3.8-flash` (gemini) | with Lore | station_done ×1 |
| #95 small | dod | `gemini-3.8-flash` (gemini) | Lore on Utopia | station_done ×1 |
| #95 small | dod | `gemini-3.8-flash` (gemini) | without Lore | station_done ×4, retry_budget ×1 |
| #95 small | dod | `gemini-4-argon` (gemini) | with Lore | station_done ×1 |
| #95 small | dod | `gemini-4-argon` (gemini) | Lore on Utopia | station_done ×5 |
| #95 small | dod | `gemini-4-argon` (gemini) | without Lore | station_done ×5 |
| #95 small | repair-build | `claude-haiku-4-5-20251001` (claude) | with Lore | retry_budget ×1 |
| #95 small | repair-build | `claude-haiku-4-5-20251001` (claude) | without Lore | retry_budget ×1, green ×4 |
| #95 small | repair-build | `claude-haiku-5-5` (claude) | with Lore | station_done ×1 |
| #95 small | repair-build | `claude-haiku-5-5` (claude) | Lore on Utopia | green ×2, station_done ×2 |
| #95 small | repair-build | `claude-haiku-5-5` (claude) | without Lore | green ×5 |
| #95 small | repair-build | `claude-opus-5-5` (claude) | with Lore | station_done ×1 |
| #95 small | repair-build | `claude-opus-5-5` (claude) | without Lore | green ×3, station_done ×2 |
| #95 small | repair-build | `claude-sonnet-4-6` (claude) | with Lore | green ×1 |
| #95 small | repair-build | `claude-sonnet-4-6` (claude) | without Lore | green ×4, station_done ×1 |
| #95 small | repair-build | `claude-sonnet-5-5` (claude) | with Lore | green ×1 |
| #95 small | repair-build | `claude-sonnet-5-5` (claude) | without Lore | station_done ×1, green ×4 |
| #95 small | repair-build | `gpt-5.6-luna` (codex) | with Lore | green ×3, station_done ×2 |
| #95 small | repair-build | `gpt-5.6-luna` (codex) | Lore on Utopia | station_done ×4, green ×1 |
| #95 small | repair-build | `gpt-5.6-luna` (codex) | without Lore | green ×3, station_done ×2 |
| #95 small | repair-build | `gpt-5.6-sol` (codex) | with Lore | green ×1 |
| #95 small | repair-build | `gpt-5.6-sol` (codex) | Lore on Utopia | green ×5 |
| #95 small | repair-build | `gpt-5.6-sol` (codex) | without Lore | green ×5 |
| #95 small | repair-build | `gpt-5.6-terra` (codex) | with Lore | green ×1 |
| #95 small | repair-build | `gpt-5.6-terra` (codex) | Lore on Utopia | green ×5 |
| #95 small | repair-build | `gpt-5.6-terra` (codex) | without Lore | green ×4, station_done ×1 |
| #95 small | repair-build | `gpt-6-astra` (codex) | with Lore | green ×1 |
| #95 small | repair-build | `gpt-6-astra` (codex) | Lore on Utopia | green ×5 |
| #95 small | repair-build | `gpt-6-astra` (codex) | without Lore | green ×5 |
| #95 small | repair-build | `gpt-6-luna` (codex) | with Lore | station_done ×3, green ×2 |
| #95 small | repair-build | `gpt-6-luna` (codex) | Lore on Utopia | green ×5 |
| #95 small | repair-build | `gpt-6-luna` (codex) | without Lore | station_done ×3, green ×2 |
| #95 small | repair-build | `gpt-6-sol` (codex) | with Lore | green ×1 |
| #95 small | repair-build | `gpt-6-sol` (codex) | Lore on Utopia | green ×5 |
| #95 small | repair-build | `gpt-6-sol` (codex) | without Lore | green ×5 |
| #95 small | repair-build | `gpt-6.1-sol` (codex) | with Lore | green ×1 |
| #95 small | repair-build | `gpt-6.1-sol` (codex) | Lore on Utopia | green ×5 |
| #95 small | repair-build | `gpt-6.1-sol` (codex) | without Lore | station_done ×1, green ×4 |
| #95 small | repair-build | `gemini-3-flash-preview` (gemini) | with Lore | station_done ×2, green ×1 |
| #95 small | repair-build | `gemini-3-flash-preview` (gemini) | Lore on Utopia | green ×5 |
| #95 small | repair-build | `gemini-3-flash-preview` (gemini) | without Lore | green ×2, station_done ×3 |
| #95 small | repair-build | `gemini-3.1-pro-preview` (gemini) | with Lore | green ×3 |
| #95 small | repair-build | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×3 |
| #95 small | repair-build | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×3 |
| #95 small | repair-build | `gemini-3.8-flash` (gemini) | with Lore | green ×1 |
| #95 small | repair-build | `gemini-3.8-flash` (gemini) | Lore on Utopia | green ×1 |
| #95 small | repair-build | `gemini-3.8-flash` (gemini) | without Lore | green ×5 |
| #95 small | repair-build | `gemini-4-argon` (gemini) | with Lore | green ×2, station_done ×1 |
| #95 small | repair-build | `gemini-4-argon` (gemini) | Lore on Utopia | station_done ×4 |
| #95 small | repair-build | `gemini-4-argon` (gemini) | without Lore | station_done ×5 |
| #95 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | with Lore | retry_budget ×1 |
| #95 small | tdd-round | `claude-haiku-4-5-20251001` (claude) | without Lore | retry_budget ×4, green ×1 |
| #95 small | tdd-round | `claude-haiku-5-5` (claude) | with Lore | retry_budget ×1 |
| #95 small | tdd-round | `claude-haiku-5-5` (claude) | Lore on Utopia | green ×1, retry_budget ×2 |
| #95 small | tdd-round | `claude-haiku-5-5` (claude) | without Lore | retry_budget ×2, green ×3 |
| #95 small | tdd-round | `claude-opus-5-5` (claude) | with Lore | green ×1 |
| #95 small | tdd-round | `claude-opus-5-5` (claude) | without Lore | green ×2, retry_budget ×3 |
| #95 small | tdd-round | `claude-sonnet-4-6` (claude) | with Lore | retry_budget ×1 |
| #95 small | tdd-round | `claude-sonnet-4-6` (claude) | without Lore | retry_budget ×5 |
| #95 small | tdd-round | `claude-sonnet-5-5` (claude) | with Lore | green ×1 |
| #95 small | tdd-round | `claude-sonnet-5-5` (claude) | without Lore | green ×5 |
| #95 small | tdd-round | `glm-5.3-flash` (claude) | without Lore | green ×5 |
| #95 small | tdd-round | `gpt-5.6-luna` (codex) | with Lore | green ×5 |
| #95 small | tdd-round | `gpt-5.6-luna` (codex) | Lore on Utopia | green ×5 |
| #95 small | tdd-round | `gpt-5.6-luna` (codex) | without Lore | green ×5 |
| #95 small | tdd-round | `gpt-5.6-sol` (codex) | with Lore | green ×1 |
| #95 small | tdd-round | `gpt-5.6-sol` (codex) | Lore on Utopia | green ×5 |
| #95 small | tdd-round | `gpt-5.6-sol` (codex) | without Lore | green ×5 |
| #95 small | tdd-round | `gpt-5.6-terra` (codex) | with Lore | green ×1 |
| #95 small | tdd-round | `gpt-5.6-terra` (codex) | Lore on Utopia | green ×5 |
| #95 small | tdd-round | `gpt-5.6-terra` (codex) | without Lore | green ×5 |
| #95 small | tdd-round | `gpt-6-astra` (codex) | with Lore | green ×1 |
| #95 small | tdd-round | `gpt-6-astra` (codex) | Lore on Utopia | green ×5 |
| #95 small | tdd-round | `gpt-6-astra` (codex) | without Lore | green ×2, retry_budget ×3 |
| #95 small | tdd-round | `gpt-6-luna` (codex) | with Lore | green ×5 |
| #95 small | tdd-round | `gpt-6-luna` (codex) | Lore on Utopia | green ×5 |
| #95 small | tdd-round | `gpt-6-luna` (codex) | without Lore | green ×3, retry_budget ×2 |
| #95 small | tdd-round | `gpt-6-sol` (codex) | with Lore | green ×1 |
| #95 small | tdd-round | `gpt-6-sol` (codex) | Lore on Utopia | green ×4, retry_budget ×1 |
| #95 small | tdd-round | `gpt-6-sol` (codex) | without Lore | green ×5 |
| #95 small | tdd-round | `gpt-6.1-sol` (codex) | with Lore | green ×1 |
| #95 small | tdd-round | `gpt-6.1-sol` (codex) | Lore on Utopia | green ×5 |
| #95 small | tdd-round | `gpt-6.1-sol` (codex) | without Lore | green ×2, retry_budget ×3 |
| #95 small | tdd-round | `gemini-3-flash-preview` (gemini) | with Lore | green ×3 |
| #95 small | tdd-round | `gemini-3-flash-preview` (gemini) | Lore on Utopia | green ×4, retry_budget ×1 |
| #95 small | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | green ×4, retry_budget ×1 |
| #95 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | with Lore | green ×3 |
| #95 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×3 |
| #95 small | tdd-round | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×3 |
| #95 small | tdd-round | `gemini-3.8-flash` (gemini) | with Lore | green ×1 |
| #95 small | tdd-round | `gemini-3.8-flash` (gemini) | Lore on Utopia | retry_budget ×1 |
| #95 small | tdd-round | `gemini-3.8-flash` (gemini) | without Lore | retry_budget ×5 |
| #95 small | tdd-round | `gemini-4-argon` (gemini) | with Lore | green ×3 |
| #95 small | tdd-round | `gemini-4-argon` (gemini) | Lore on Utopia | green ×3, retry_budget ×1 |
| #95 small | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×4, retry_budget ×1 |
| #144 large | dod | `claude-haiku-4-5-20251001` (claude) | with Lore | station_done ×1 |
| #144 large | dod | `claude-haiku-4-5-20251001` (claude) | without Lore | retry_budget ×2, station_done ×3 |
| #144 large | dod | `claude-haiku-5-5` (claude) | with Lore | station_done ×1 |
| #144 large | dod | `claude-haiku-5-5` (claude) | Lore on Utopia | station_done ×2, retry_budget ×1 |
| #144 large | dod | `claude-haiku-5-5` (claude) | without Lore | station_done ×4, retry_budget ×1 |
| #144 large | dod | `claude-opus-5-5` (claude) | with Lore | retry_budget ×1 |
| #144 large | dod | `claude-opus-5-5` (claude) | without Lore | station_done ×5 |
| #144 large | dod | `claude-sonnet-4-6` (claude) | with Lore | retry_budget ×1 |
| #144 large | dod | `claude-sonnet-4-6` (claude) | without Lore | retry_budget ×4, station_done ×1 |
| #144 large | dod | `claude-sonnet-5-5` (claude) | with Lore | station_done ×1 |
| #144 large | dod | `claude-sonnet-5-5` (claude) | without Lore | station_done ×5 |
| #144 large | dod | `gpt-5.6-luna` (codex) | with Lore | station_done ×5 |
| #144 large | dod | `gpt-5.6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | dod | `gpt-5.6-luna` (codex) | without Lore | station_done ×5 |
| #144 large | dod | `gpt-5.6-sol` (codex) | with Lore | station_done ×1 |
| #144 large | dod | `gpt-5.6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | dod | `gpt-5.6-sol` (codex) | without Lore | station_done ×5 |
| #144 large | dod | `gpt-5.6-terra` (codex) | with Lore | station_done ×1 |
| #144 large | dod | `gpt-5.6-terra` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | dod | `gpt-5.6-terra` (codex) | without Lore | station_done ×5 |
| #144 large | dod | `gpt-6-astra` (codex) | with Lore | station_done ×1 |
| #144 large | dod | `gpt-6-astra` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | dod | `gpt-6-astra` (codex) | without Lore | station_done ×5 |
| #144 large | dod | `gpt-6-luna` (codex) | with Lore | station_done ×5 |
| #144 large | dod | `gpt-6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | dod | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #144 large | dod | `gpt-6-sol` (codex) | with Lore | station_done ×1 |
| #144 large | dod | `gpt-6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | dod | `gpt-6-sol` (codex) | without Lore | station_done ×5 |
| #144 large | dod | `gpt-6.1-sol` (codex) | with Lore | station_done ×1 |
| #144 large | dod | `gpt-6.1-sol` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | dod | `gpt-6.1-sol` (codex) | without Lore | station_done ×5 |
| #144 large | dod | `gemini-3-flash-preview` (gemini) | with Lore | station_done ×1 |
| #144 large | dod | `gemini-3-flash-preview` (gemini) | Lore on Utopia | retry_budget ×1, station_done ×4 |
| #144 large | dod | `gemini-3-flash-preview` (gemini) | without Lore | retry_budget ×3, station_done ×2 |
| #144 large | dod | `gemini-3.8-flash` (gemini) | with Lore | station_done ×1 |
| #144 large | dod | `gemini-3.8-flash` (gemini) | Lore on Utopia | retry_budget ×1 |
| #144 large | dod | `gemini-3.8-flash` (gemini) | without Lore | retry_budget ×2, station_done ×3 |
| #144 large | dod | `gemini-4-argon` (gemini) | with Lore | station_done ×1 |
| #144 large | dod | `gemini-4-argon` (gemini) | Lore on Utopia | retry_budget ×3, station_done ×1 |
| #144 large | dod | `gemini-4-argon` (gemini) | without Lore | station_done ×3, retry_budget ×2 |
| #144 large | repair-build | `claude-haiku-4-5-20251001` (claude) | with Lore | station_done ×1 |
| #144 large | repair-build | `claude-haiku-4-5-20251001` (claude) | without Lore | retry_budget ×3, station_done ×2 |
| #144 large | repair-build | `claude-haiku-5-5` (claude) | with Lore | station_done ×1 |
| #144 large | repair-build | `claude-haiku-5-5` (claude) | Lore on Utopia | station_done ×3 |
| #144 large | repair-build | `claude-haiku-5-5` (claude) | without Lore | station_done ×5 |
| #144 large | repair-build | `claude-opus-5-5` (claude) | with Lore | station_done ×1 |
| #144 large | repair-build | `claude-opus-5-5` (claude) | without Lore | green ×3, station_done ×2 |
| #144 large | repair-build | `claude-sonnet-4-6` (claude) | with Lore | station_done ×1 |
| #144 large | repair-build | `claude-sonnet-4-6` (claude) | without Lore | station_done ×4, retry_budget ×1 |
| #144 large | repair-build | `claude-sonnet-5-5` (claude) | with Lore | station_done ×1 |
| #144 large | repair-build | `claude-sonnet-5-5` (claude) | without Lore | station_done ×5 |
| #144 large | repair-build | `gpt-5.6-luna` (codex) | with Lore | station_done ×5 |
| #144 large | repair-build | `gpt-5.6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | repair-build | `gpt-5.6-luna` (codex) | without Lore | green ×1, station_done ×4 |
| #144 large | repair-build | `gpt-5.6-sol` (codex) | with Lore | station_done ×1 |
| #144 large | repair-build | `gpt-5.6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | repair-build | `gpt-5.6-sol` (codex) | without Lore | station_done ×5 |
| #144 large | repair-build | `gpt-5.6-terra` (codex) | with Lore | station_done ×1 |
| #144 large | repair-build | `gpt-5.6-terra` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | repair-build | `gpt-5.6-terra` (codex) | without Lore | station_done ×5 |
| #144 large | repair-build | `gpt-6-astra` (codex) | with Lore | station_done ×1 |
| #144 large | repair-build | `gpt-6-astra` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | repair-build | `gpt-6-astra` (codex) | without Lore | green ×2, station_done ×3 |
| #144 large | repair-build | `gpt-6-luna` (codex) | with Lore | station_done ×5 |
| #144 large | repair-build | `gpt-6-luna` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | repair-build | `gpt-6-luna` (codex) | without Lore | station_done ×5 |
| #144 large | repair-build | `gpt-6-sol` (codex) | with Lore | station_done ×1 |
| #144 large | repair-build | `gpt-6-sol` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | repair-build | `gpt-6-sol` (codex) | without Lore | station_done ×5 |
| #144 large | repair-build | `gpt-6.1-sol` (codex) | with Lore | station_done ×1 |
| #144 large | repair-build | `gpt-6.1-sol` (codex) | Lore on Utopia | station_done ×5 |
| #144 large | repair-build | `gpt-6.1-sol` (codex) | without Lore | station_done ×4, green ×1 |
| #144 large | repair-build | `gemini-3-flash-preview` (gemini) | with Lore | station_done ×2 |
| #144 large | repair-build | `gemini-3-flash-preview` (gemini) | Lore on Utopia | station_done ×4, retry_budget ×1 |
| #144 large | repair-build | `gemini-3-flash-preview` (gemini) | without Lore | station_done ×5 |
| #144 large | repair-build | `gemini-3.1-pro-preview` (gemini) | with Lore | station_done ×2 |
| #144 large | repair-build | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | station_done ×2 |
| #144 large | repair-build | `gemini-3.1-pro-preview` (gemini) | without Lore | station_done ×3 |
| #144 large | repair-build | `gemini-3.8-flash` (gemini) | with Lore | station_done ×1 |
| #144 large | repair-build | `gemini-3.8-flash` (gemini) | Lore on Utopia | green ×1 |
| #144 large | repair-build | `gemini-3.8-flash` (gemini) | without Lore | station_done ×5 |
| #144 large | repair-build | `gemini-4-argon` (gemini) | with Lore | green ×2 |
| #144 large | repair-build | `gemini-4-argon` (gemini) | Lore on Utopia | station_done ×2, green ×2 |
| #144 large | repair-build | `gemini-4-argon` (gemini) | without Lore | green ×3, station_done ×2 |
| #144 large | tdd-round | `claude-haiku-4-5-20251001` (claude) | with Lore | retry_budget ×1 |
| #144 large | tdd-round | `claude-haiku-4-5-20251001` (claude) | without Lore | retry_budget ×4, green ×1 |
| #144 large | tdd-round | `claude-haiku-5-5` (claude) | with Lore | retry_budget ×1 |
| #144 large | tdd-round | `claude-haiku-5-5` (claude) | Lore on Utopia | retry_budget ×2 |
| #144 large | tdd-round | `claude-haiku-5-5` (claude) | without Lore | retry_budget ×5 |
| #144 large | tdd-round | `claude-opus-5-5` (claude) | with Lore | retry_budget ×1 |
| #144 large | tdd-round | `claude-opus-5-5` (claude) | without Lore | retry_budget ×5 |
| #144 large | tdd-round | `claude-sonnet-4-6` (claude) | with Lore | retry_budget ×1 |
| #144 large | tdd-round | `claude-sonnet-4-6` (claude) | without Lore | retry_budget ×4, green ×1 |
| #144 large | tdd-round | `claude-sonnet-5-5` (claude) | with Lore | retry_budget ×1 |
| #144 large | tdd-round | `claude-sonnet-5-5` (claude) | without Lore | green ×4, retry_budget ×1 |
| #144 large | tdd-round | `gpt-5.6-luna` (codex) | with Lore | round_budget ×4, green ×1 |
| #144 large | tdd-round | `gpt-5.6-luna` (codex) | Lore on Utopia | green ×2, round_budget ×2, retry_budget ×1 |
| #144 large | tdd-round | `gpt-5.6-luna` (codex) | without Lore | green ×2, round_budget ×3 |
| #144 large | tdd-round | `gpt-5.6-sol` (codex) | with Lore | green ×1 |
| #144 large | tdd-round | `gpt-5.6-sol` (codex) | Lore on Utopia | green ×5 |
| #144 large | tdd-round | `gpt-5.6-sol` (codex) | without Lore | green ×4, round_budget ×1 |
| #144 large | tdd-round | `gpt-5.6-terra` (codex) | with Lore | green ×1 |
| #144 large | tdd-round | `gpt-5.6-terra` (codex) | Lore on Utopia | green ×5 |
| #144 large | tdd-round | `gpt-5.6-terra` (codex) | without Lore | round_budget ×1, green ×4 |
| #144 large | tdd-round | `gpt-6-astra` (codex) | with Lore | retry_budget ×1 |
| #144 large | tdd-round | `gpt-6-astra` (codex) | Lore on Utopia | retry_budget ×4, green ×1 |
| #144 large | tdd-round | `gpt-6-astra` (codex) | without Lore | retry_budget ×5 |
| #144 large | tdd-round | `gpt-6-luna` (codex) | with Lore | green ×2, retry_budget ×3 |
| #144 large | tdd-round | `gpt-6-luna` (codex) | Lore on Utopia | green ×2, retry_budget ×2, round_budget ×1 |
| #144 large | tdd-round | `gpt-6-luna` (codex) | without Lore | retry_budget ×3, green ×2 |
| #144 large | tdd-round | `gpt-6-sol` (codex) | with Lore | retry_budget ×1 |
| #144 large | tdd-round | `gpt-6-sol` (codex) | Lore on Utopia | green ×3, retry_budget ×2 |
| #144 large | tdd-round | `gpt-6-sol` (codex) | without Lore | green ×5 |
| #144 large | tdd-round | `gpt-6.1-sol` (codex) | with Lore | retry_budget ×1 |
| #144 large | tdd-round | `gpt-6.1-sol` (codex) | Lore on Utopia | retry_budget ×4, green ×1 |
| #144 large | tdd-round | `gpt-6.1-sol` (codex) | without Lore | retry_budget ×5 |
| #144 large | tdd-round | `gemini-3-flash-preview` (gemini) | with Lore | green ×1, round_budget ×1 |
| #144 large | tdd-round | `gemini-3-flash-preview` (gemini) | Lore on Utopia | round_budget ×1, green ×2, retry_budget ×2 |
| #144 large | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | green ×3, retry_budget ×1, round_budget ×1 |
| #144 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | with Lore | retry_budget ×1, station_done ×1 |
| #144 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | Lore on Utopia | green ×2 |
| #144 large | tdd-round | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×3 |
| #144 large | tdd-round | `gemini-3.8-flash` (gemini) | with Lore | retry_budget ×1 |
| #144 large | tdd-round | `gemini-3.8-flash` (gemini) | Lore on Utopia | retry_budget ×1 |
| #144 large | tdd-round | `gemini-3.8-flash` (gemini) | without Lore | retry_budget ×5 |
| #144 large | tdd-round | `gemini-4-argon` (gemini) | with Lore | green ×2 |
| #144 large | tdd-round | `gemini-4-argon` (gemini) | Lore on Utopia | green ×2, retry_budget ×2 |
| #144 large | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×4, retry_budget ×1 |

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

