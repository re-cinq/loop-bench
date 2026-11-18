export interface Label { x: number; y: number; width: number; anchor: string; [field: string]: unknown }
export function separateLabels(labels: Label[], lineHeight?: number): Label[];
export function distinctLabels(values: number[], format: (value: number) => string): (string | null)[];
