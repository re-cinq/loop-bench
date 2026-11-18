// Ticket titles from bench.tickets, shared by every page that names a ticket.
let titles = new Map();

export function setTickets(tickets = []) {
  titles = new Map(tickets.map((ticket) => [ticket.number, ticket.title]));
}

export const ticketTitle = (number) => titles.get(number) ?? null;

/** The title cut at a word boundary with an ellipsis when it is longer than max. */
export function shortTitle(title, max = 30) {
  if (title.length <= max) return title;
  const cut = title.slice(0, max - 1);
  const atWord = cut.lastIndexOf(' ') > max / 2 ? cut.slice(0, cut.lastIndexOf(' ')) : cut;
  return `${atWord.trimEnd()}…`;
}

/** "#93 Report usage across every tool round (small)": number, title when known, size when known. */
export function ticketName(number, size = null, { short = false } = {}) {
  const title = ticketTitle(number);
  const named = title ? `#${number} ${short ? shortTitle(title) : title}` : `#${number}`;
  return size ? `${named} (${size})` : named;
}
