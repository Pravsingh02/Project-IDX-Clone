import { useEditorSocketStore } from "../../../stores/editorSocketStore";
import { useFileConextMenuStore } from "../../../stores/fileContextMenuStore";
import './FileContextMenu.css';
export const FileContextMenu = ({
     x,
     y,
     path
     }) => {
          const {editorSocket} = useEditorSocketStore();
          const { setIsOpen } = useFileConextMenuStore();
     function handleFileDelete(e) {
          e.preventDefault();
          console.log("Deleting file at path:", path);
          editorSocket.emit("deleteFile", {
               pathToFileFolder: path,
          });
     }
     return(
          <div
               onMouseLeave={() =>{
                    console.log("Mouse left context menu");
                    setIsOpen(false);
               }}
               className="fileContextOptionsWrapper"
               style={{
                    width:"120px",
                    position:"fixed",
                    left: x,
                    top: y,
                    border:"1.5px solid black"
               }}
          >
               <button className="fileContextButton"
                    onClick={handleFileDelete}
               >
                    delete File
               </button>
               <button className="fileContextButton">
                    Rename File
               </button>
          </div>
     )
}