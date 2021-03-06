import React, { useState } from "react";

import MDE from "mde10";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/chart/dist/toastui-chart.css";
import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

// theme
//https://github.com/PrismJS/prism-themes/tree/master/themes
import "prismjs/themes/prism-okaidia.css";
import "katex/dist/katex.min.css";
import "mde10/dist/toast.css";

const App = () => {
  const [html, setHtml] = useState("");
  return (
    <div>
      <MDE getHTML={(html) => setHtml(html, "[][]\n\n")} theme="light" />

      <h1>HTML - Output</h1>
      <div className="toastui-editor-contents " dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
export default App;
