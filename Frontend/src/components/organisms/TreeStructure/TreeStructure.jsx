import { useEffect } from "react";
import { useTreeStructureStore } from "../../../stores/treeStructureStore"
import { TreeNode } from "../../molecules/TreeNode/TreeNode";
import { useFileConextMenuStore } from "../../../stores/fileContextMenuStore";
import { FileContextMenu } from "../../molecules/ContextMenu/FileContextMenu";
import { useFolderContextMenuStore } from "../../../stores/folderContextMenuStore";
import { FolderContextMenu } from "../../molecules/ContextMenu/FolderContextMenu";

export const TreeStructure = () => {
     const {treeStructure, setTreeStructure} = useTreeStructureStore();
     const {
          file,
          isOpen : isFileContextOpen,
          x:fileContextX,
          y:fileContextY,
     } = useFileConextMenuStore();
     const {
          folder,
          isOpen : isFolderContextOpen,
          x:folderContextX,
          y:folderContextY,
     } = useFolderContextMenuStore();
     useEffect(() => {
          if(treeStructure){
               console.log("tree:",treeStructure);
          }
          else{
               setTreeStructure();
          }
     }, [setTreeStructure,treeStructure]);
     return(
          <>
          {isFileContextOpen && fileContextX && fileContextY  && (
               <FileContextMenu
                    x={fileContextX}
                    y={fileContextY}
                    path={file}
               />
          )}
          {isFolderContextOpen && folderContextX && folderContextY  && (
               <FolderContextMenu
                    x={folderContextX}
                    y={folderContextY}
                    path={folder}
               />
          )}

               <TreeNode
               fileFolderData={treeStructure}
               />
               
          </>
     )
}
