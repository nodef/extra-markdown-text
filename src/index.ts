// CODE-BLOCK
// ----------

/** Regex for code block: [language, fenced-body, indented-body]. */
const RCODEBLOCK = /^ {0,3}```(\w*)\s*\n([\s\S]*?)^ {0,3}```[ \t]*\n|((?:^(?: {4}|\t)[\s\S]*?\n)+)/gm;


/**
 * Unindent code block with 4 spaces or a tab.
 * @param txt code block
 * @returns unindented code block
 */
function unindentCodeBlock(txt: string): string {
  return txt.replace(/^( {4}|\t)/gm, '');
}


/**
 * Code block match function.
 * @param full full code block
 * @param language code block language
 * @param body code block body
 */
export type CodeBlockMatchFunction = (full: string, language: string, body: string) => void;

/**
 * Match code blocks in markdown text.
 * @param txt markdown text
 * @param fn match function
 */
export function forEachCodeBlock(txt: string, fn: CodeBlockMatchFunction): void {
  var m = null;
  while ((m = RCODEBLOCK.exec(txt)) != null)
    fn(m[0], m[1] || '', m[2] != null? m[2] : unindentCodeBlock(m[3]));
}


/** Code block. */
export interface CodeBlock {
  /** Full code block. */
  full: string,
  /** Code block language. */
  language: string,
  /** Code block body. */
  body: string,
}

/**
 * Get code blocks in markdown text.
 * @param txt markdown text
 * @returns code blocks
 */
export function codeBlocks(txt: string): CodeBlock[] {
  var a = [];
  forEachCodeBlock(txt, (full, language, body) => a.push({full, language, body}));
  return a;
}


/**
 * Code block replace function.
 * @param full full code block
 * @param language code block language
 * @param body code block body
 * @returns updated code block
 */
export type CodeBlockReplaceFunction = (full: string, language: string, body: string) => string;

/**
 * Replace code blocks in markdown text.
 * @param txt markdown text
 * @param fn replace function
 * @returns updated markdown text
 */
export function replaceCodeBlocks(txt: string, fn: CodeBlockReplaceFunction): string {
  return txt.replace(RCODEBLOCK, (m, p1, p2, p3) => {
    return fn(m, p1 || '', p2 != null? p2 : unindentCodeBlock(p3));
  });
}


/**
 * Tag code blocks in markdown text and remove them.
 * @param txt markdown text
 * @returns [updated markdown text, tags]
 */
export function tagCodeBlocks(txt: string): [string, Map<string, string>] {
  var tags = new Map(), i = -1;
  var txt  = replaceCodeBlocks(txt, full => {
    var k  = `AUTO_CODE_BLOCK_${++i}`;
    tags.set(k, full);
    return '```\n' + `${k}\n` + '```\n';
  });
  return [txt, tags];
}


/**
 * Untag code blocks in markdown text by adding them back.
 * @param txt markdown text
 * @param tags tags
 * @returns updated markdown text
 */
export function untagCodeBlocks(txt: string, tags: Map<string, string>): string {
  for (var [tag, full] of tags)
    txt = txt.replace('```\n' + `${tag}\n` + '```\n', full);
  return txt;
}




// LINK
// ----

/** Regex for link: [name, url, reference]. */
const RLINK = /!?\[(.*?)\](?:\((.*?)\)| ?\[(.*?)\]|(?!:))/gm;


/**
 * Link match function.
 * @param full full link
 * @param name link name
 * @param reference link reference
 * @param url link url
 */
export type LinkMatchFunction = (full: string, name: string, reference: string, url: string) => void;

/**
 * Match links in markdown text.
 * @param txt markdown text
 * @param fn match function
 */
export function forEachLink(txt: string, fn: LinkMatchFunction): void {
  var txt = replaceCodeBlocks(txt, () => ''), m = null;
  while ((m = RLINK.exec(txt)) != null)
    if (!m[0].startsWith('!')) fn(m[0], m[1], m[3] || '', m[2] || '');
}


/** Link. */
export interface Link {
  /** Full link. */
  full: string,
  /** Link name. */
  name: string,
  /** Link reference. */
  reference: string,
  /** Link URL. */
  url: string,
}

/**
 * Get links in markdown text.
 * @param txt markdown text
 * @returns links
 */
export function links(txt: string): Link[] {
  var a = [];
  forEachLink(txt, (full, name, reference, url) => a.push({full, name, reference, url}));
  return a;
}


/**
 * Link replace function.
 * @param full full link
 * @param name link name
 * @param ref link reference
 * @param url link url
 * @returns updated link
 */
export type LinkReplaceFunction = (full: string, name: string, reference: string, url: string) => string;

/**
 * Replace links in markdown text.
 * @param txt markdown text
 * @param fn replace function
 * @returns updated markdown text
 */
export function replaceLinks(txt: string, fn: LinkReplaceFunction): string {
  var [txt, tags] = tagCodeBlocks(txt);
  txt = txt.replace(RLINK, (m, p1, p2, p3) => {
    return m.startsWith('!')? m : fn(m, p1, p3 || '', p2 || '');
  });
  return untagCodeBlocks(txt, tags);
}




// LINK-REFERENCE
// --------------

/** Regex for link references: [name, url, title]. */
const RLINKREFERENCE = /^[ \t]*\[(.*?)\]:[ \t]*<?([>\S]*?)>?(?:[ \t]*['"(](.*?)['")])?[ \t]*$/gm;


/**
 * Link reference match function.
 * @param full full link reference
 * @param name link reference name
 * @param url link reference url
 * @param title link reference title
 */
export type LinkReferenceMatchFunction = (full: string, name: string, url: string, title: string) => void;

/**
 * Match link references in markdown text.
 * @param txt markdown text
 * @param fn match function
 */
export function forEachLinkReference(txt: string, fn: LinkReferenceMatchFunction): void {
  var txt = replaceCodeBlocks(txt, () => ''), m = null;
  while ((m = RLINKREFERENCE.exec(txt)) != null)
    fn(m[0], m[1], m[2], m[3] || '');
}


/** Link reference. */
export interface LinkReference {
  /** Full link reference. */
  full: string,
  /** Link reference name. */
  name: string,
  /** Link reference URL. */
  url: string,
  /** Link reference title. */
  title: string,
}

/**
 * Get link references in markdown text.
 * @param txt markdown text
 * @returns links
 */
export function linkReferences(txt: string): LinkReference[] {
  var a = [];
  forEachLinkReference(txt, (full, name, url, title) => a.push({full, name, url, title}));
  return a;
}


/**
 * Link reference replace function.
 * @param full full link reference
 * @param name link reference name
 * @param url link reference url
 * @param title link reference title
 * @returns updated link reference
 */
export type LinkReferenceReplaceFunction = (full: string, name: string, url: string, title: string) => string;

/**
 * Replace link references in markdown text.
 * @param txt markdown text
 * @param fn replace function
 * @returns updated markdown text
 */
export function replaceLinkReferences(txt: string, fn: LinkReferenceReplaceFunction): string {
  var [txt, tags] = tagCodeBlocks(txt);
  txt = txt.replace(RLINKREFERENCE, (m, p1, p2, p3) => fn(m, p1, p2, p3 || ''));
  return untagCodeBlocks(txt, tags);
}




// TABLE
// -----

/** Regex for table. */
const RTABLE = /.*?\n.*?(?:\|[ \t]*---|---[ \t]*\|)[\s\S]*?(?:\n(?=[ \t]*\n)|$)/g;


/**
 * Get table rows from full table.
 * @param full full table
 * @returns table rows
 */
function tableRows(full: string): string[][] {
  var rows = [];
  var ls = full.trim().split('\n');
  ls.splice(1, 1);
  for (var l of ls)
    rows.push(l.replace(/(^\s*\|)|(\|\s*$)/g, '').split('|'));
  return rows;
}


/**
 * Table match function.
 * @param full full table
 * @param rows all rows of table
 */
export type TableMatchFunction = (full: string, rows: string[][]) => void;

/**
 * Match tables in markdown text.
 * @param txt markdown text
 * @param fn match function
 */
export function forEachTable(txt: string, fn: TableMatchFunction): void {
  var txt = replaceCodeBlocks(txt, () => ''), m = null;
  while ((m = RTABLE.exec(txt)) != null)
    fn(m[0], tableRows(m[0]));
}


/** Table. */
export interface Table {
  /** Full table. */
  full: string,
  /** Rows of table. */
  rows: string[][],
}

/**
 * Get tables in markdown text.
 * @param txt markdown text
 * @returns tables
 */
export function tables(txt: string): Table[] {
  var a = [];
  forEachTable(txt, (full, rows) => a.push({full, rows}));
  return a;
}


/**
 * Table replace function.
 * @param full full table
 * @param rows all rows of table
 */
export type TableReplaceFunction = (full: string, rows: string[][]) => string;

/**
 * Replace tables in markdown text.
 * @param txt markdown text
 * @param fn replace function
 * @returns updated markdown text
 */
export function replaceTables(txt: string, fn: TableReplaceFunction): string {
  var [txt, tags] = tagCodeBlocks(txt);
  txt = txt.replace(RTABLE, m => fn(m, tableRows(m)));
  return untagCodeBlocks(txt, tags);
}
