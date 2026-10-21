#!/usr/bin/env bash
# Gemini cells for #37, then the #144 seed, its starting branches and its cells. Detached from any Claude Code session.
cd "$(dirname "$0")/../.."
G=gemini/gemini-4-argon,gemini/gemini-3-flash-preview,gemini/gemini-3.1-pro-preview
echo "== ticket 37 $(date +%H:%M)"
npx tsx src/cli.ts run --ticket 37 --station tdd-round,repair-build --replicates 3 --parallel 3 --per-harness 2 --exclude claude --agent "$G" 2>&1
S=results/halengine-seed-large/144/baseline/gemini-gemini-4-argon/none/rep-1
if [ ! -f "$S/loop.json" ]; then echo "== #144 seed $(date +%H:%M)"; npx tsx src/cli.ts run --experiment experiments/halengine-seed-large.yaml --parallel 1 --per-harness 2 --exclude claude 2>&1; fi
[ -f artifacts/halengine/144/dod/branch.bundle ] || npx tsx src/cli.ts make-artifact --ticket 144 --kind dod --from-cell "$S" 2>&1 | tail -1
[ -f artifacts/halengine/144/red/branch.bundle ] || npx tsx src/cli.ts make-artifact --ticket 144 --kind red --from-cell "$S" 2>&1 | tail -1
if [ -f artifacts/halengine/144/dod/branch.bundle ] && [ -f artifacts/halengine/144/red/branch.bundle ]; then
  echo "== ticket 144 $(date +%H:%M)"
  npx tsx src/cli.ts run --ticket 144 --station tdd-round,repair-build --replicates 3 --parallel 3 --per-harness 2 --exclude claude --agent "$G" 2>&1
else
  echo "== no starting branches for #144, cells not started"
fi
echo "== gemini chain done $(date +%H:%M)"
