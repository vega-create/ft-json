export interface Tool { name: string; slug: string; description: string; icon: string; category: string; }
export interface Category { id: string; name: string; icon: string; }

export const categories: Category[] = [
  { id: 'json', name: 'JSON Tools', icon: '📋' },
  { id: 'encode', name: 'Encode / Decode', icon: '🔄' },
  { id: 'web', name: 'Web Dev Tools', icon: '🌐' },
  { id: 'format', name: 'Formatters', icon: '✨' },
];

export const tools: Tool[] = [
  { name: 'JSON Formatter', slug: 'json-formatter', description: 'Format and beautify JSON with syntax highlighting.', icon: '🎨', category: 'json' },
  { name: 'JSON Validator', slug: 'json-validator', description: 'Validate JSON and see detailed error messages.', icon: '✅', category: 'json' },
  { name: 'JSON Minifier', slug: 'json-minifier', description: 'Minify JSON by removing whitespace and formatting.', icon: '📦', category: 'json' },
  { name: 'JSON to CSV', slug: 'json-to-csv', description: 'Convert JSON arrays to CSV format.', icon: '📊', category: 'json' },
  { name: 'Base64 Encode/Decode', slug: 'base64', description: 'Encode text to Base64 or decode Base64 to text.', icon: '🔐', category: 'encode' },
  { name: 'URL Encode/Decode', slug: 'url-encode', description: 'Encode or decode URL-safe strings.', icon: '🔗', category: 'encode' },
  { name: 'HTML Entity Encode', slug: 'html-entity', description: 'Encode/decode HTML entities and special characters.', icon: '📝', category: 'encode' },
  { name: 'JWT Decoder', slug: 'jwt-decoder', description: 'Decode and inspect JWT tokens without verification.', icon: '🎫', category: 'encode' },
  { name: 'Regex Tester', slug: 'regex-tester', description: 'Test regular expressions with real-time matching.', icon: '🔍', category: 'web' },
  { name: 'HTTP Status Codes', slug: 'http-status', description: 'Quick reference for all HTTP status codes.', icon: '📡', category: 'web' },
  { name: 'CSS Minifier', slug: 'css-minifier', description: 'Minify CSS by removing whitespace and comments.', icon: '🎭', category: 'format' },
  { name: 'SQL Formatter', slug: 'sql-formatter', description: 'Format and beautify SQL queries.', icon: '🗄️', category: 'format' },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(t => t.category === categoryId);
}
