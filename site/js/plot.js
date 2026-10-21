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

export function yAxis({ y, domain, left, right, format, label }) {
  return svg('g', {}, [
    ...ticks(domain).map((v) => svg('g', {}, [
      svg('line', { class: 'grid-line', x1: left, x2: right, y1: y(v), y2: y(v) }),
      svg('text', { x: left - 6, y: y(v) + 3, 'text-anchor': 'end' }, format(v)),
    ])),
    label ? svg('text', { x: left, y: y(domain[1]) - 10 }, label) : null,
  ]);
}

export function xAxis({ x, domain, top, bottom, format, label, right }) {
  return svg('g', {}, [
    svg('line', { class: 'axis', x1: x(domain[0]), x2: x(domain[1]), y1: bottom, y2: bottom }),
    ...ticks(domain).map((v) => svg('g', {}, [
      svg('line', { class: 'grid-line', x1: x(v), x2: x(v), y1: top, y2: bottom }),
      svg('text', { x: x(v), y: bottom + 14, 'text-anchor': 'middle' }, format(v)),
    ])),
    label ? svg('text', { x: right, y: bottom + 30, 'text-anchor': 'end' }, label) : null,
  ]);
}

/** Claude a square, Codex a circle, Gemini a diamond, GLM a triangle; hollow when the run had no Lore. */
export function point({ cx, cy, harness, hollow, r = 5, title }) {
  const cls = `pt-${harness} ${hollow ? 'hollow' : ''}`;
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
