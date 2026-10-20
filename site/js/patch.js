// Unified `git diff` output split into files and hunks, so two branches' changes can be laid side by side file by file.
const FILE_HEADER = /^diff --git a\/(.+) b\/(.+)$/;
const HUNK_HEADER = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/;
const TEST_PATH = /(\.(test|spec)\.[cm]?[jt]sx?$)|(^|\/)(test|tests|__tests__)\//;

export const isTestPath = (path) => TEST_PATH.test(path);

function newFile(oldPath, path) {
  return { path, oldPath, status: oldPath === path ? 'modified' : 'renamed', additions: 0, deletions: 0, binary: false, hunks: [] };
}

export function parsePatch(text) {
  const files = [];
  let file = null;
  let hunk = null;
  let oldNo = 0;
  let newNo = 0;

  for (const line of text.split('\n')) {
    const header = line.match(FILE_HEADER);
    if (header) {
      file = newFile(header[1], header[2]);
      hunk = null;
      files.push(file);
    } else if (!file) {
      continue;
    } else if (HUNK_HEADER.test(line)) {
      const [, oldStart, newStart] = line.match(HUNK_HEADER);
      [oldNo, newNo] = [Number(oldStart), Number(newStart)];
      hunk = { header: line, lines: [] };
      file.hunks.push(hunk);
    } else if (!hunk) {
      if (line.startsWith('new file mode')) file.status = 'added';
      else if (line.startsWith('deleted file mode')) file.status = 'deleted';
      else if (line.startsWith('Binary files')) file.binary = true;
    } else if (line.startsWith('+')) {
      hunk.lines.push({ kind: '+', text: line.slice(1), oldNo: null, newNo: newNo++ });
      file.additions += 1;
    } else if (line.startsWith('-')) {
      hunk.lines.push({ kind: '-', text: line.slice(1), oldNo: oldNo++, newNo: null });
      file.deletions += 1;
    } else if (line.startsWith(' ')) {
      hunk.lines.push({ kind: ' ', text: line.slice(1), oldNo: oldNo++, newNo: newNo++ });
    }
  }
  return files;
}
