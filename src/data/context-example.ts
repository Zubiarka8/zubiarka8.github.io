// Synthetic code for explaining selection; this is not MCP output.
export const exampleLines = [
  'const currency = "EUR";',
  'const taxRate = 0.21;',
  '',
  'export function calculateTotal(price) {',
  '  return price * (1 + taxRate);',
  '}',
  '',
  'export function formatPrice(price) {',
  '  return `${price.toFixed(2)} ${currency}`;',
  '}',
  '',
  'export function invoiceLabel(id) {',
  '  return `Invoice ${id}`;',
  '}',
] as const;
export const relevantLineNumbers = [2, 4, 5, 6] as const;
export type ContextView = 'full' | 'focused';

export function selectExampleLines(view: ContextView) {
  return exampleLines.map((code, index) => ({
    code,
    number: index + 1,
    relevant: relevantLineNumbers.some((number) => number === index + 1),
  })).filter((line) => view === 'full' || line.relevant);
}
