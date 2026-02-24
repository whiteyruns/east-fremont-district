export function cn(...inputs: string[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}
