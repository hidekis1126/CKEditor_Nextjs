'use client'
import React, { useEffect, useState } from 'react';

const MyEditor = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [ClassicEditor, setClassicEditor] = useState(null);
  const [CKEditor, setCKEditor] = useState(null);

  useEffect(() => {
    import('../ckeditor5-40.2.0-qu3sxnrthue/build/ckeditor.js')
      .then(editorModule => {
        setClassicEditor(() => editorModule.default);
        setEditorLoaded(true);
      });
    import('@ckeditor/ckeditor5-react')
      .then(ckeditorModule => {
        setCKEditor(() => ckeditorModule.CKEditor);
      });
  }, []);

  return (
    editorLoaded && ClassicEditor && CKEditor ? (
      <div style={{ height: '500px', width: '800px' }}>
        <CKEditor
          editor={ ClassicEditor }
          data="<p>Hello from CKEditor 5!</p>"
          onInit={ editor => {
            console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
            const data = editor.getData();
            console.log( { event, editor, data } );
          } }
          onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
          } }
        />
      </div>
    ) : (
      <div>Loading...</div>
    )
  );
};

export default MyEditor;
