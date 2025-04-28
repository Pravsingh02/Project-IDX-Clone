import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react";
import { useActiveFileTabStore } from "../../../stores/activeFileTabStore";
import { useEditorSocketStore } from "../../../stores/editorSocketStore";
import { extensionToFileType } from "../../../utils/extensionToFileType";
export const EditorComponent = () => {
     let timeId = null;
     const [editorState, setEditorState] = useState({
          theme:null
     });
     const { editorSocket } = useEditorSocketStore();
     const { activeFileTab } = useActiveFileTabStore();
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

     function handleChange(value,e) {
          if(timeId != null){
               clearTimeout(timeId);
          }

          timeId = setTimeout(() =>{
               const editorContent = value;
               console.log("Sending writeFile event");
               
               editorSocket?.emit("writeFile", {
                    data: editorContent,
                    pathToFileFolder: activeFileTab.path,
               });
          },2000);
     }
          
     // editorSocket?.on("readFileSuccess", (data) => {
     //      console.log("readFileSuccess",data);
     //      setActiveFileTab(data.path,data.value);
     // });

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
                    language={extensionToFileType(activeFileTab?.extension)}
                    onChange={handleChange}
                    value={activeFileTab?.value ? activeFileTab.value : "// Welcome to the Play-Ground!"}
                    onMount={handleEditorTheme}
               />
          }
     </>
  )
}

export default EditorComponent