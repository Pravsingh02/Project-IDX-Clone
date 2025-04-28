import { useEditorSocketStore } from "../../../stores/editorSocketStore";
import { useFolderContextMenuStore } from "../../../stores/folderContextMenuStore";
import './FileContextMenu.css';
export const FolderContextMenu = ({
     x,
     y,
     path
}) => {
     const { editorSocket } = useEditorSocketStore();
     const { setIsOpen } = useFolderContextMenuStore();
     function handleFolderDelete(e) {
          e.preventDefault();
          console.log("Deleting folder at path:", path);
          editorSocket.emit("deleteFolder", {
               pathToFileFolder: path,
          });
     }
     return (
          <div
               onMouseLeave={() => {
                    console.log("Mouse left context menu");
                    setIsOpen(false);
               }}
               className="fileContextOptionsWrapper"
               style={{
                    width: "120px",
                    position: "fixed",
                    left: x,
                    top: y,
                    border: "1.5px solid black"
               }}
          >
               <button className="fileContextButton"
                    onClick={handleFolderDelete}
               >
                    delete Folder
               </button>
               <button className="fileContextButton">
                    Rename Folder
               </button>
          </div>
     )
}