import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/FileIcon";
import { useEditorSocketStore } from "../../../stores/editorSocketStore";
import { useFileConextMenuStore } from "../../../stores/fileContextMenuStore";
import { useFolderContextMenuStore } from "../../../stores/folderContextMenuStore";

export const TreeNode = ({ fileFolderData }) => {
  const [visibility, setVisibility] = useState({});
  const { editorSocket } = useEditorSocketStore();
  const {
        setFile,
        setIsOpen:setFileContextMenuIsOpen,
        setX:setFileContextMenuX,
        setY:setFileContextMenuY,
  } = useFileConextMenuStore();
  const {
        setFolder,
        setIsOpen:setFolderContextMenuIsOpen,
        setX:setFolderContextMenuX,
        setY:setFolderContextMenuY,
      } = useFolderContextMenuStore();
    
  function toggleVisibility(name) {
    setVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }
  function computeExtension(fileFolderData) {
    const names = fileFolderData.name.split(".");
    return names[names.length - 1];
  }    
  function handleDoubleClick(fileFolderData) {
    console.log("Double clicked:", fileFolderData);
    editorSocket.emit("readFile", {
      pathToFileFolder: fileFolderData.path,
    });
  }
  function handleContextMenuForFiles(e, path) {
    e.preventDefault();
    console.log("Right clicked on file:", path,e);
    setFile(path);
    setFileContextMenuX(e.clientX);
    setFileContextMenuY(e.clientY);
    setFileContextMenuIsOpen(true);
  }
  function handleContextMenuForFolders(e, path) {
    e.preventDefault();
    console.log("Right clicked on folder:", path,e);
    setFolder(path);
    setFolderContextMenuX(e.clientX);
    setFolderContextMenuY(e.clientY);
    setFolderContextMenuIsOpen(true);
  }
  function handleDoubleClickOnFolder(fileFolderData) {
    console.log("Double clicked on folder:", fileFolderData);
    editorSocket.emit("readFolder", {
      pathToFileFolder: fileFolderData.path,
    });
  }
  return (
    (fileFolderData && 
    <div style={{ paddingLeft: "15px", color: "white" }}>
      {fileFolderData.children ? (
        <button
          onClick={() => toggleVisibility(fileFolderData.name)}
          style={{
            border: "none",
            cursor: "pointer",
            outline: "none",
            color: "white",
            backgroundColor: "transparent",
            padding: "15px",
            fontSize: "16px",
          }}
          onContextMenu={(e) => handleContextMenuForFolders(e,fileFolderData.path)}
          onDoubleClick={() => handleDoubleClickOnFolder(fileFolderData)}
        >
          {visibility[fileFolderData.name] ? <IoIosArrowDown/> : 
            <IoIosArrowForward/>}
          {fileFolderData.name}
        </button>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <FileIcon extension={computeExtension(fileFolderData)}/>
          <p
               style={{
               paddingTop: "5px",
               fontSize: "15px",
               cursor: "pointer",
               marginLeft: "5px",
               }}
              onContextMenu={(e) => handleContextMenuForFiles(e,fileFolderData.path)}
              onDoubleClick={() =>  handleDoubleClick(fileFolderData)}
          >
               {fileFolderData.name}
          </p>
        </div>
     )}

      {visibility[fileFolderData.name] &&
        fileFolderData.children &&
        fileFolderData.children.map((child) => (
          <TreeNode fileFolderData={child} key={child.name} />
        ))}
    </div>)
  );
};
