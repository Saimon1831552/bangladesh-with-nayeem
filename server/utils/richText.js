// Admin-entered rich text (titles, excerpts, descriptions) is stored as HTML so
// bold words, fonts, sizes and colors show on the site exactly as entered.

// Removes anything that could run code; all visual formatting is kept.
const sanitizeRichHtml = (value) => String(value ?? '')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<\s*(script|style|iframe|object|embed|link|meta|form|textarea|button|select)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
  .replace(/<\s*\/?\s*(script|style|iframe|object|embed|link|meta|form|textarea|button|select|input|base)[^>]*>/gi, '')
  .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/\s(href|src|action|formaction|xlink:href)\s*=\s*(["'])\s*(javascript|vbscript|data:text\/html)[\s\S]*?\2/gi, '')
  .replace(/\sstyle\s*=\s*(["'])[^"']*(expression\s*\(|javascript:|url\s*\(\s*['"]?\s*javascript)[^"']*\1/gi, '');

// For fields that are optional: keep null/undefined as null, sanitize the rest.
const sanitizeOptional = (value) => (value === null || value === undefined ? null : sanitizeRichHtml(value));

// Formatted HTML is much longer than the plain text it shows: a 40-character
// title copied from Google Docs can be 300+ characters of HTML. Columns that were
// created as VARCHAR(255) / TEXT would cut it off or reject the save, so widen
// them once. Already-wide columns are left untouched.
const RANK = { char: 0, varchar: 0, tinytext: 1, text: 2, mediumtext: 3, longtext: 4 };
const readyByTable = new Map();

function ensureRichTextColumns(pool, table, columns) {
  if (!readyByTable.has(table)) {
    const ready = (async () => {
      const [rows] = await pool.query(
        `SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
        [table]
      );
      const existing = new Map(rows.map(row => [row.COLUMN_NAME, row]));
      for (const [column, wanted] of Object.entries(columns)) {
        const info = existing.get(column);
        if (!info) continue;
        const current = String(info.DATA_TYPE).toLowerCase();
        if (current in RANK && RANK[current] < RANK[wanted.toLowerCase()]) {
          const nullability = info.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL';
          try {
            await pool.query(`ALTER TABLE \`${table}\` MODIFY \`${column}\` ${wanted.toUpperCase()} ${nullability}`);
          } catch (err) {
            console.error(`Could not widen ${table}.${column} for rich text:`, err.message);
          }
        }
      }
    })().catch(err => {
      readyByTable.delete(table); // try again on the next request
      console.error(`Rich text column check failed for ${table}:`, err.message);
    });
    readyByTable.set(table, ready);
  }
  return readyByTable.get(table);
}

module.exports = { sanitizeRichHtml, sanitizeOptional, ensureRichTextColumns };
