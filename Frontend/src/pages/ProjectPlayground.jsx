import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useEffect } from "react";
import { useTreeStructureStore } from "../stores/treeStructureStore";
import { useEditorSocketStore } from "../stores/editorSocketStore";
import {io} from "socket.io-client";
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTerminal";
export const ProjectPlayground = () => {
     const {projectId:projectIdFromUrl} = useParams();

     const {setProjectId,projectId} = useTreeStructureStore();

     const {setEditorSocket} = useEditorSocketStore();
     useEffect(() => {
          if(projectIdFromUrl){
          setProjectId(projectIdFromUrl);
          const editorSocketConnection = io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
               query:{
                    projectId:projectIdFromUrl
               },
          });
          setEditorSocket(editorSocketConnection);
          }
          
     },[setProjectId,projectIdFromUrl,setEditorSocket]);
     return (
          <>
               <div style={{display:"flex"}}>
               {projectId && (
                         <div
                              style={{
                                   paddingRight:"10px",
                                   paddingTop:"0.3vh",
                                   overflowY:"auto",
                                   minWidth:"250px",
                                   maxWidth:"25%",
                                   height:"99.7vh",
                                   backgroundColor:"#333254"
                              }}>
                                   <TreeStructure />
                         </div>
                    )} 
                    <EditorComponent />
               </div>
               
               
               <EditorButton isActive={true}/>
               <EditorButton isActive={false}/>
               <BrowserTerminal/>
          </>
     )
}