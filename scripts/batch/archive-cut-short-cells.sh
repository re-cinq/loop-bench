#!/usr/bin/env bash
# Moves the cells a stopped pass cut short (no loop.json) out of results, so a rerun starts them clean while the paid-for transcripts stay under artifacts/interrupted.
# Usage: archive-cut-short-cells.sh <agent folder glob>, e.g. 'claude-claude-haiku-*'
cd "$(dirname "$0")/../.."
stamp=$(date +%Y%m%d-%H%M%S)

find results -type d -path "*/$1/*/rep-*" -name 'rep-*' | while read -r cell; do
  [ -f "$cell/loop.json" ] && continue
  target="artifacts/interrupted/${cell#results/}/$stamp"
  mkdir -p "$(dirname "$target")" && mv "$cell" "$target" && echo "== archived cut-short $cell to $target"
done
