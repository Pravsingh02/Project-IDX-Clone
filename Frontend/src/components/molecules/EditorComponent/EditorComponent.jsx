import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react";
export const EditorComponent = () => {
     const [editorState, setEditorState] = useState({
          theme:null
     });
     async function themeDownload() {
          const response = await fetch('/Dracula.json');
          const data = await response.json();
          setEditorState({...editorState,theme:data});
     }
     function handleEditorTheme(editor,monaco)
     {
          monaco.editor.defineTheme('dracula',editorState.theme);
          monaco.editor.setTheme('dracula');
     }
     useEffect(() =>{
          themeDownload();
     },[]);
     return (
     <>
          {editorState.theme &&
               <Editor
               height="90vh"
               defaultLanguage="javascript"
               defaultValue="// some comment"
               theme="vs-dark"
               options={{
                    fontSize: 16,
                    lineNumbers: "on",
                    minimap: {
                    enabled: true,
                    },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
               }}
               onMount={handleEditorTheme}
               />
          }
     </>
  )
}

export default EditorComponent