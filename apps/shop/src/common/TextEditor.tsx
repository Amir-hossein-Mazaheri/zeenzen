import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'shop-editor/build/ckeditor';

interface TextEditorProps {
  defaultValue?: string;
  onChange: (data: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ defaultValue, onChange }) => {
  return (
    <div>
      <CKEditor
        editor={Editor}
        data={defaultValue}
        onChange={(event, editor) => onChange(editor.getData())}
      />
    </div>
  );
};

export default TextEditor;
