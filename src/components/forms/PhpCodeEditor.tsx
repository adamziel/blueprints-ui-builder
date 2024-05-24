import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/php/php';

const PhpCodeEditor = () => {
  const [code, setCode] = useState('<?php\n\necho "Hello, World!";\n\n?>');

  return (
    <div>
      <CodeMirror
        value={code}
        options={{
          mode: 'php',
          theme: 'material',
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        onChange={(editor, data, value) => {
          // You can handle changes here if needed
        }}
      />
    </div>
  );
};

export default PhpCodeEditor;
