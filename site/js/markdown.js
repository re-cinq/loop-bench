// Enough markdown for conclusions.md: paragraphs, bullet lists, **bold**, _italic_, `code` and [links](url).
export function esc(text) {
  return String(text ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function inline(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])_([^_]+)_(?=[\s).,:;]|$)/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

export function mdToHtml(md) {
  const out = [];
  let open = null;
  const close = () => { if (open) out.push(open === 'ul' ? '</ul>' : '</p>'); open = null; };

  for (const raw of md.split('\n')) {
    const line = raw.trim();
    const bullet = line.match(/^[-*] (.+)$/);
    const heading = line.match(/^(#{1,4}) (.+)$/);
    if (!line) close();
    else if (heading) { close(); out.push(`<h3>${inline(heading[2])}</h3>`); }
    else if (bullet) {
      if (open !== 'ul') { close(); out.push('<ul>'); open = 'ul'; }
      out.push(`<li>${inline(bullet[1])}</li>`);
    } else {
      if (open !== 'p') { close(); out.push('<p>'); open = 'p'; }
      else out.push(' ');
      out.push(inline(line));
    }
  }
  close();
  return out.join('');
}
