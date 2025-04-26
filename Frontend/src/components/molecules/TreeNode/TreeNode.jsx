import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/FileIcon";
import { useEditorSocketStore } from "../../../stores/editorSocketStore";

export const TreeNode = ({ fileFolderData }) => {
  const [visibility, setVisibility] = useState({});
  const { editorSocket } = useEditorSocketStore();
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
    
  if (!fileFolderData) return null;

  return (
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
        >
          {visibility[fileFolderData.name] ? (
            <IoIosArrowDown style={{ height: "10px", width: "10px" }} />
          ) : (
            <IoIosArrowForward style={{ height: "10px", width: "10px" }} />
          )}
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
    </div>
  );
};
