import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react";
import { useEditorSocketStore } from "../../../stores/editorSocketStore";
import { useActiveFileTabStore } from "../../../stores/activeFileTabStore";
export const EditorComponent = () => {
     const [editorState, setEditorState] = useState({
          theme:null
     });
     const { editorSocket } = useEditorSocketStore();
     const { activeFileTab, setActiveFileTab} = useActiveFileTabStore();
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
     editorSocket?.on("readFileSuccess", (data) => {
          console.log("readFileSuccess",data);
          setActiveFileTab(data.path,data.value);
     });

     useEffect(() =>{
          themeDownload();
     },[]);
     
     return (
     <>
          {editorState.theme &&
               <Editor
                    height="100vh"
                    width="100%"
                    defaultLanguage={undefined}
                    defaultValue="// Welcome to the Play-Ground!"
                    options={{
                         fontSize: 18,
                         fontFamily: "monospace",
                    }}
                    value={activeFileTab?.value ? activeFileTab.value : "// Welcome to the Play-Ground!"}
                    onMount={handleEditorTheme}
               />
          }
     </>
  )
}

export default EditorComponent