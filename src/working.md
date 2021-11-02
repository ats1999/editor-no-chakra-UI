```js
import React, { useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import katex from "katex";
import "katex/dist/contrib/mhchem.js";
import "katex/dist/katex.min.css";

/**
 * Get  html repersentation of asci Tex
 * @param {String} str asci Tex
 * @returns {String} str html Tex
 */
function renderMath(str) {
  const html = katex.renderToString(str, {
    throwOnError: false,
    displayMode: true,
  });
  return html;
}

/**
 * Get html from the complete string
 * @param {String} str text
 * @returns {String} str rendered html combined with input
 */
function getInlineMath(str) {
  let prevIdx = 0;
  let nextIdx = -1;
  while (true) {
    prevIdx = str.indexOf("$", prevIdx);
    nextIdx = str.indexOf("$", prevIdx + 1);
    if (nextIdx == -1 || prevIdx == -1) break;

    str = str.replace(
      str.substr(prevIdx, nextIdx - prevIdx + 1),
      renderMath(str.substr(prevIdx + 1, nextIdx - prevIdx - 1))
    );
    if (nextIdx !== -1) prevIdx = nextIdx + 1;
  }

  return str;
}

const customHTMLRenderer = {
  text(node) {
    return {
      type: "html",
      content: getInlineMath(node.literal),
    };
  },
};
function App() {
  const editorRef = useRef(null);
  const [html, setHtml] = useState("");
  const handleChange = () => {
    if (!editorRef) return null;

    setHtml(editorRef.current.getInstance().getHTML());
  };
  return (
    <div className="App">
      <Editor
        ref={editorRef}
        onChange={handleChange}
        // onKeydown
        customHTMLRenderer={customHTMLRenderer}
        autofocus={false}
        previewStyle="vertical"
      />
      <h1>HTML - Target</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default App;

```