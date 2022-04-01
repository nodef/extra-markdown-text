Utility methods for Markdown text.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-markdown-text),
🌐 [Web](https://www.npmjs.com/package/extra-markdown-text.web),
📜 [Files](https://unpkg.com/extra-markdown-text/),
📰 [Docs](https://nodef.github.io/extra-markdown-text/).

This package is available in both *Node.js* and *Web* formats. The web format
is exposed as `extra_markdown_text` standalone variable and can be loaded from
[jsDelivr CDN].

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

[jsDelivr CDN]: https://cdn.jsdelivr.net/npm/extra-markdown-text.web/index.js

<br>

```javascript
const path = require('extra-markdown-text');

function main() {
  path.filename('/home/user/file+name.txt');
  // → file+name

  path.symbolname('/home/user/file+name.txt');
  // → file_name

  path.symbolname('/home/user/file+name.txt');
  // → file-name
}
main();
```

<br>
<br>


## Index

| Property | Description |
|  ----  |  ----  |
| [forEachCodeBlock] | Match code blocks in markdown text. |
| [codeBlocks] | Get code blocks in markdown text. |
| [replaceCodeBlocks] | Replace code blocks in markdown text. |
| [tagCodeBlocks] | Tag code blocks in markdown text and remove them. |
| [untagCodeBlocks] | Untag code blocks in markdown text by adding them back. |
| [forEachLink] | Match links in markdown text. |
| [links] | Get links in markdown text. |
| [replaceLinks] | Replace links in markdown text. |
| [forEachLinkReference] | Match link references in markdown text. |
| [linkReferences] | Get link references in markdown text. |
| [replaceLinkReferences] | Replace link references in markdown text. |
| [forEachTable] | Match tables in markdown text. |
| [tables] | Get tables in markdown text. |
| [replaceTables] | Replace tables in markdown text. |

<br>
<br>

[![](https://img.youtube.com/vi/bJirgZjBqNg/maxresdefault.jpg)](https://www.youtube.com/watch?v=bJirgZjBqNg)

[forEachCodeBlock]: https://nodef.github.io/extra-markdown-text/modules.html#forEachCodeBlock
[codeBlocks]: https://nodef.github.io/extra-markdown-text/modules.html#codeBlocks
[replaceCodeBlocks]: https://nodef.github.io/extra-markdown-text/modules.html#replaceCodeBlocks
[tagCodeBlocks]: https://nodef.github.io/extra-markdown-text/modules.html#tagCodeBlocks
[untagCodeBlocks]: https://nodef.github.io/extra-markdown-text/modules.html#untagCodeBlocks
[forEachLink]: https://nodef.github.io/extra-markdown-text/modules.html#forEachLink
[links]: https://nodef.github.io/extra-markdown-text/modules.html#links
[replaceLinks]: https://nodef.github.io/extra-markdown-text/modules.html#replaceLinks
[forEachLinkReference]: https://nodef.github.io/extra-markdown-text/modules.html#forEachLinkReference
[linkReferences]: https://nodef.github.io/extra-markdown-text/modules.html#linkReferences
[replaceLinkReferences]: https://nodef.github.io/extra-markdown-text/modules.html#replaceLinkReferences
[forEachTable]: https://nodef.github.io/extra-markdown-text/modules.html#forEachTable
[tables]: https://nodef.github.io/extra-markdown-text/modules.html#tables
[replaceTables]: https://nodef.github.io/extra-markdown-text/modules.html#replaceTables
