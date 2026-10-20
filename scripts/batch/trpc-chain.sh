#!/usr/bin/env bash
# trpc #3768: dependencies, the Gemini seed loop, its starting branches, then the Gemini tdd-round and repair-build cells. Detached from any Claude Code session.
cd "$(dirname "$0")/../.."
G=gemini/gemini-4-argon,gemini/gemini-3-flash-preview,gemini/gemini-3.1-pro-preview
echo "== prepare $(date +%H:%M)"; npx tsx src/cli.ts prepare --experiment experiments/trpc.yaml 2>&1 | tail -2
S=results/trpc-seed/3768/baseline/gemini-gemini-4-argon/none/rep-1
[ -f "$S/loop.json" ] || { echo "== seed $(date +%H:%M)"; npx tsx src/cli.ts run --experiment experiments/trpc-seed.yaml --station baseline --parallel 1 --per-harness 2 --exclude claude 2>&1; }
for kind in dod red; do [ -f artifacts/trpc/3768/$kind/branch.bundle ] || npx tsx src/cli.ts make-artifact --experiment experiments/trpc.yaml --ticket 3768 --kind $kind --from-cell "$S" 2>&1 | tail -1; done
if [ -f artifacts/trpc/3768/dod/branch.bundle ] && [ -f artifacts/trpc/3768/red/branch.bundle ]; then
  echo "== cells $(date +%H:%M)"
  npx tsx src/cli.ts run --experiment experiments/trpc.yaml --station tdd-round,repair-build --replicates 3 --parallel 5 --per-harness 4 --exclude claude --agent "$G" 2>&1
else
  echo "== no starting branches for trpc #3768, cells not started"
fi
echo "== trpc chain done $(date +%H:%M)"
