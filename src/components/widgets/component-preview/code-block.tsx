import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

export interface CodeBlockProps
  extends React.TextareaHTMLAttributes<HTMLDivElement> {
  language?: string;
  value: string;
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ language, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}>
        <Editor
          value={value}
          onValueChange={() => {}}
          highlight={(code) => highlight(code, languages.js, language || 'js')}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </div>
    );
  },
);

CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };
