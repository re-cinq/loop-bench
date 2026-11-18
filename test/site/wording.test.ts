import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import * as words from "../../site/js/words.js";

const SITE = join(import.meta.dirname, "../../site");
const BANNED = /\b(stations?|cells?|dod|tdd(-round)?|repair-build|lore-mcp|lore-utopia|dominated|jaccard|ofat|replicates?|harness(es)?|loops?)\b/gi;
const TOOLTIP_ONLY_TECHNICAL_NAMES = ["results.js"];

const pagesOf = () => readdirSync(SITE).filter((name) => name.endsWith(".html")).sort();
const scriptsOf = () => readdirSync(join(SITE, "js")).filter((name) => name.endsWith(".js")).sort();
const bannedWordsIn = (text: string) => [...new Set([...text.matchAll(BANNED)].map((match) => match[0].toLowerCase()))];

function visibleText(html: string): string {
  const body = html.replace(/<(script|style|head)[\s\S]*?<\/\1>/gi, " ");
  return body.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
}

const CLASS_KEY_BEFORE = /\bclass:\s*$/;
const TITLE_KEY_BEFORE = /\btitle:\s*$/;
const QUOTES = ["'", '"', "`"];

/** Every quoted string of a script, comments skipped and class lists (after `class:`) left out; text inside `${}` of a template is scanned too. */
export function stringLiterals(source: string, { skipTooltips = false } = {}): string[] {
  const found: string[] = [];
  let position = 0;

  const isTemplateExpressionStart = (quote: string) => quote === "`" && source[position] === "$" && source[position + 1] === "{";

  function readQuoted(quote: string): void {
    const before = source.slice(Math.max(0, position - 12), position);
    const isSkipped = CLASS_KEY_BEFORE.test(before) || (skipTooltips && TITLE_KEY_BEFORE.test(before));
    const keep = (text: string) => { if (!isSkipped) found.push(text); };
    let text = "";
    position += 1;
    while (position < source.length && source[position] !== quote) {
      if (source[position] === "\\") position += 1;
      if (isTemplateExpressionStart(quote)) {
        keep(text);
        text = "";
        position += 2;
        readCode("}");
        continue;
      }
      text += source[position];
      position += 1;
    }
    position += 1;
    keep(text);
  }

  const startsWith = (marker: string) => source.startsWith(marker, position);

  function readCode(closer: string | null): void {
    let depth = 0;
    while (position < source.length) {
      const char = source[position] ?? "";
      const closesExpression = char === "}" && closer !== null && depth === 0;
      if (closesExpression) { position += 1; return; }
      depth += Number(char === "{") - Number(char === "}");
      const lineEnd = source.indexOf("\n", position);
      if (startsWith("//")) { position = lineEnd < 0 ? source.length : lineEnd; continue; }
      if (startsWith("/*")) { position = source.indexOf("*/", position) + 2; continue; }
      if (QUOTES.includes(char)) { readQuoted(char); continue; }
      position += 1;
    }
  }

  readCode(null);
  return found;
}

const hitsIn = (texts: string[]) => texts.flatMap((text) => bannedWordsIn(text).map((word) => `${word}: ${text}`));
const phrasesIn = (source: string, options = {}) => stringLiterals(source, options).filter((text) => text.includes(" "));
const stringValues = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (value && typeof value === "object") return Object.values(value).flatMap(stringValues);
  return [];
};

describe("reader-facing wording", () => {
  it.each(pagesOf())("%s has no banned word in its visible text", (page) => {
    expect(bannedWordsIn(visibleText(readFileSync(join(SITE, page), "utf8")))).toEqual([]);
  });

  it.each(scriptsOf())("%s has no banned word in its phrases", (script) => {
    const skipTooltips = TOOLTIP_ONLY_TECHNICAL_NAMES.includes(script);
    expect(hitsIn(phrasesIn(readFileSync(join(SITE, "js", script), "utf8"), { skipTooltips }))).toEqual([]);
  });

  it("words.js has no banned word in any label or explanation", () => {
    expect(hitsIn(stringValues({ ...words }))).toEqual([]);
  });

  it("finds the phrases of a script and skips comments, keys and words without a space", () => {
    const source = "// a station here\nconst a = { key: 'dod', text: `works in ${count} runs`, other: \"two words\" };";
    expect(phrasesIn(source)).toEqual(["works in ", " runs", "two words"]);
  });

  it("leaves out a class list that names a banned word", () => {
    expect(phrasesIn("el('div', { class: 'pair-cell absent', title: 'a tip' })")).toEqual(["a tip"]);
  });

  it("skips the text of title keys only when tooltips are allowed technical names", () => {
    const source = "el('th', { title: 'dominated: a tip', label: 'works well' })";
    expect([phrasesIn(source, { skipTooltips: true }), phrasesIn(source)]).toEqual([["works well"], ["dominated: a tip", "works well"]]);
  });

  it("flags a banned word and ignores a word that merely contains one", () => {
    expect([bannedWordsIn("each station is a cell"), bannedWordsIn("cellular stationary")]).toEqual([["station", "cell"], []]);
  });
});
