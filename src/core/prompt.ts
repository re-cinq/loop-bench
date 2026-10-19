// The station prompt as the CLI receives it: the verbatim body, its placeholder filled, the pod's /workspace pointed at this run's directory, and a header naming the repository and ticket.
import { createHash } from "node:crypto";

export interface PromptHeader {
  repo: string;
  ticketNumber: number;
  ticketTitle: string;
}

export interface BuiltPrompt {
  prompt: string;
  sha256Verbatim: string;
  sha256Sent: string;
}

const FRONTMATTER = /^---\n[\s\S]*?\n---\n/;
// `/workspace` as a path: followed by a slash, a backtick, whitespace, punctuation or the end. The prose word "workspace" (as in "workspace build") has no leading slash and stays.
const WORKSPACE_PATH = /\/workspace(?=[/`\s.,;:)]|$)/g;

export function stripFrontmatter(markdown: string): string {
  return markdown.replace(FRONTMATTER, "");
}

export function fillTicketPath(body: string, ticketPath: string): string {
  return body.replaceAll("{ticket_path}", ticketPath);
}

export function localizeWorkspacePaths(body: string, workspaceDir: string): string {
  return body.replace(WORKSPACE_PATH, workspaceDir);
}

export function withTaskHeader(body: string, header: PromptHeader): string {
  return `Repository: ${header.repo}\nTicket: #${header.ticketNumber} ${header.ticketTitle}\n\n${body}`;
}

export function placeholdersIn(body: string): string[] {
  return [...new Set([...body.matchAll(/\{([a-z_]+)\}/g)].map((match) => match[1] ?? ""))];
}

export function buildStationPrompt(input: {
  markdown: string;
  workspaceDir: string;
  ticketPath: string;
  header: PromptHeader;
}): BuiltPrompt {
  const verbatim = stripFrontmatter(input.markdown);
  const prompt = withTaskHeader(
    localizeWorkspacePaths(fillTicketPath(verbatim, input.ticketPath), input.workspaceDir),
    input.header,
  );

  return { prompt, sha256Verbatim: sha256(verbatim), sha256Sent: sha256(prompt) };
}

export function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}
