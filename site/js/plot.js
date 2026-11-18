// Inline-SVG building blocks: a linear scale, axes with ticks, and a point marked by harness (shape and colour both, for colour-blind readers).
import { svg } from './lib.js';

export function scale([d0, d1], [r0, r1]) {
  const span = d1 - d0 || 1;
  return (v) => r0 + ((v - d0) / span) * (r1 - r0);
}

/** Pads a data extent by 8% each side, so no point sits on an axis. */
export function extent(values, { zero = false } = {}) {
  const lo = zero ? 0 : Math.min(...values);
  const hi = Math.max(...values);
  const pad = (hi - lo || Math.abs(hi) || 1) * 0.08;
  return [zero ? 0 : lo - pad, hi + pad];
}

export function ticks([lo, hi], count = 5) {
  const step = (hi - lo) / (count - 1);
  return Array.from({ length: count }, (_, i) => lo + i * step);
}

/** The tick label for each value, or null where it would repeat the label before it. */
export function distinctLabels(values, format) {
  const labels = values.map(format);
  return labels.map((label, index) => (index > 0 && label === labels[index - 1] ? null : label));
}

export function yAxis({ y, domain, left, right, format, label }) {
  const labels = distinctLabels(ticks(domain), format);
  return svg('g', {}, [
    ...ticks(domain).map((v, index) => svg('g', {}, [
      svg('line', { class: 'grid-line', x1: left, x2: right, y1: y(v), y2: y(v) }),
      svg('text', { x: left - 6, y: y(v) + 3, 'text-anchor': 'end' }, labels[index]),
    ])),
    label ? svg('text', { x: left, y: y(domain[1]) - 10 }, label) : null,
  ]);
}

export function xAxis({ x, domain, top, bottom, format, label, right }) {
  const labels = distinctLabels(ticks(domain), format);
  return svg('g', {}, [
    svg('line', { class: 'axis', x1: x(domain[0]), x2: x(domain[1]), y1: bottom, y2: bottom }),
    ...ticks(domain).map((v, index) => svg('g', {}, [
      svg('line', { class: 'grid-line', x1: x(v), x2: x(v), y1: top, y2: bottom }),
      svg('text', { x: x(v), y: bottom + 14, 'text-anchor': 'middle' }, labels[index]),
    ])),
    label ? svg('text', { x: right, y: bottom + 30, 'text-anchor': 'end' }, label) : null,
  ]);
}

/** Claude a square, Codex a circle, Gemini a diamond, GLM a triangle; hollow with no KB, solid with Lore, faded with Lore on Utopia. */
export function point({ cx, cy, harness, context = 'lore-mcp', r = 5, title }) {
  const cls = `pt-${harness} kb-${context}`;
  const shape = harness === 'claude'
    ? svg('rect', { class: cls, x: cx - r, y: cy - r, width: r * 2, height: r * 2 })
    : harness === 'gemini'
      ? svg('polygon', { class: cls, points: `${cx},${cy - r * 1.3} ${cx + r * 1.3},${cy} ${cx},${cy + r * 1.3} ${cx - r * 1.3},${cy}` })
      : harness === 'glm'
        ? svg('polygon', { class: cls, points: `${cx},${cy - r * 1.3} ${cx + r * 1.2},${cy + r} ${cx - r * 1.2},${cy + r}` })
        : svg('circle', { class: cls, cx, cy, r });
  if (title) shape.append(svg('title', {}, title));
  return shape;
}

const spanOf = (label) => (label.anchor === 'end' ? [label.x - label.width, label.x] : [label.x, label.x + label.width]);
const overlapsHorizontally = (a, b) => spanOf(a)[0] < spanOf(b)[1] && spanOf(b)[0] < spanOf(a)[1];

/** Pushes labels down until none overlaps another; each label is {x, y, width, anchor}. */
export function separateLabels(labels, lineHeight = 15) {
  const placed = [];
  for (const label of [...labels].sort((a, b) => a.y - b.y)) {
    const blockers = placed.filter((other) => overlapsHorizontally(other, label) && label.y - other.y < lineHeight);
    placed.push({ ...label, y: Math.max(label.y, ...blockers.map((other) => other.y + lineHeight)) });
  }
  return placed;
}
