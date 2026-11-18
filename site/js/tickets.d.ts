export function setTickets(tickets?: { number: number; title: string; size: string }[]): void;
export function ticketTitle(number: number): string | null;
export function shortTitle(title: string, max?: number): string;
export function ticketName(number: number, size?: string | null, options?: { short?: boolean }): string;
