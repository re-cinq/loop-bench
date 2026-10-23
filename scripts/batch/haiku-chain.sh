#!/usr/bin/env bash
# Haiku cells for tickets 93 and 94. A pass that stops on an infrastructure error (a usage limit or a login that ran out) deletes the cells it cut short, waits an hour and runs again, until a pass ends without one. Detached from any Claude Code session.
cd "$(dirname "$0")/../.."
H=claude/claude-haiku-5-5,claude/claude-haiku-4-5-20251001

drop_cut_short_cells() {
  find results/halengine -type d -name 'rep-*' | while read -r d; do [ -f "$d/loop.json" ] || rm -rf "$d"; done
}

for attempt in $(seq 1 48); do
  stopped=""
  for t in 93 94; do
    echo "== attempt $attempt, ticket $t $(date +%H:%M)"
    out=$(npx tsx src/cli.ts run --ticket $t --station tdd-round,repair-build --replicates 3 --parallel 1 --per-harness 1 --agent "$H" 2>&1)
    echo "$out"
    echo "$out" | grep -q "stopping:" && { stopped=1; break; }
  done
  [ -z "$stopped" ] && { echo "== haiku chain done $(date +%H:%M)"; exit 0; }
  drop_cut_short_cells
  echo "== stopped on an infrastructure error $(date +%H:%M), trying again in an hour"
  sleep 3600
done
echo "== haiku chain gave up after 48 attempts $(date +%H:%M)"
