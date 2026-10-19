// At most N agent runs per harness at a time, however many loops are in flight: one claude, one gemini and one codex run side by side.
import type { Harness } from "../core/harness-names.js";

export class HarnessLanes {
  private readonly running: Record<Harness, number> = { claude: 0, gemini: 0, codex: 0 };
  private readonly waiting: Record<Harness, Array<() => void>> = { claude: [], gemini: [], codex: [] };

  constructor(private readonly perHarness: number) {}

  async run<T>(harness: Harness, work: () => Promise<T>): Promise<T> {
    if (this.running[harness] >= this.perHarness) {
      await new Promise<void>((resolve) => this.waiting[harness].push(resolve));
    }
    this.running[harness] += 1;
    try {
      return await work();
    } finally {
      this.running[harness] -= 1;
      this.waiting[harness].shift()?.();
    }
  }
}

export const UNLIMITED = new HarnessLanes(Number.POSITIVE_INFINITY);
