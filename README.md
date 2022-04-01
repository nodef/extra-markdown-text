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

| Property      | Description                      |
| ------------- | -------------------------------- |
| [filename]    | Get file name without extension. |
| [symbolname]  | Get symbol name for file.        |
| [keywordname] | Get keyword name for file.       |

<br>
<br>

[![](https://img.youtube.com/vi/8oXhShuIjrQ/maxresdefault.jpg)](https://www.youtube.com/watch?v=8oXhShuIjrQ)


[filename]: https://nodef.github.io/extra-markdown-text/modules.html#filename
[symbolname]: https://nodef.github.io/extra-markdown-text/modules.html#symbolname
[keywordname]: https://nodef.github.io/extra-markdown-text/modules.html#keywordname
