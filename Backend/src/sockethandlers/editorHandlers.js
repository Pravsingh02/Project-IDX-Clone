import fs from "fs/promises";
import path from "path";
export const handleEditorSocketEvents = (socket,editorNamespace) => {
     socket.on("writeFile", async ({data,pathToFileFolder}) =>{
          try {
               const response = await fs.writeFile(pathToFileFolder, data);
               editorNamespace.emit("writeFileSuccess", {
                    data: "File written successfully",
                    path: pathToFileFolder,
               });
          } catch (error) {
               console.log("Error writing file", error);
               socket.emit("error", {data: "Error writing file"});
          }
     });
     socket.on("createFile", async ({pathToFileFolder}) =>{
          const isFileAlreadyExists = await fs.stat(pathToFileFolder);
          if(isFileAlreadyExists){
               socket.emit("fileCreated", {data: "File already exists"});
               return;
          }
          try {
               const response = await fs.writeFile(pathToFileFolder, "");
               socket.emit("fileCreated", {data: "File created successfully"});
          } catch (error) {
               console.log("Error creating file", error);
               socket.emit("error", {data: "Error creating file"});     
          }
     });
     socket.on("readFile", async ({pathToFileFolder}) =>{
          try {

               const response = await fs.readFile(pathToFileFolder);
               console.log(response.toString());
               socket.emit("readFileSuccess", {value: response.toString(),path:pathToFileFolder});

          } catch (error) {
               console.log("Error reading file", error);
               socket.emit("error", {data: "Error reading file"});     
          }
     });
     socket.on("deleteFile", async ({pathToFileFolder}) =>{
          try {
               const response = await fs.unlink(pathToFileFolder);
               socket.emit("deleteFileSuccess", {data: "File deleted successfully"});
          } catch (error) {
               console.log("Error deleting file", error);
               socket.emit("error", {data: "Error deleting file"});     
          }
     });
     socket.on("renameFile", async ({oldPathToFileFolder, newPathToFileFolder}) =>{
          try {
               const response = await fs.rename(oldPathToFileFolder, newPathToFileFolder);
               socket.emit("fileRenamed", {data: "File renamed successfully"});
          } catch (error) {
               console.log("Error renaming file", error);
               socket.emit("error", {data: "Error renaming file"});     
          }
     });
     socket.on("renameFolder", async ({oldPathToFileFolder, newPathToFileFolder}) =>{
          try {
               const response = await fs.rename(oldPathToFileFolder, newPathToFileFolder);
               socket.emit("folderRenamed", {data: "Folder renamed successfully"});
          } catch (error) {
               console.log("Error renaming folder", error);
               socket.emit("error", {data: "Error renaming folder"});     
          }
     });
     socket.on("createFolder", async ({pathToFileFolder}) =>{
          try {
               const response = await fs.mkdir(pathToFileFolder);
               socket.emit("folderCreated", {data: "Folder created successfully"});
          } catch (error) {
               console.log("Error creating folder", error);
               socket.emit("error", {data: "Error creating folder"});     
          }
     });
     socket.on("deleteFolder", async ({ pathToFileFolder }) => {
          try {
              // Try setting folder to writable before deletion (important on Windows)
              await fs.chmod(pathToFileFolder, 0o666);
      
              await fs.rm(pathToFileFolder, { recursive: true, force: true });
      
              socket.emit("folderDeleted", { data: "Folder deleted successfully" });
          } catch (error) {
              console.log("Error deleting folder", error);
              socket.emit("error", { data: "Error deleting folder" });
          }
      });
     socket.on("getFileList", async ({pathToFileFolder}) =>{
          try {
               const response = await fs.readdir(pathToFileFolder);
               socket.emit("fileList", {data: response});
          } catch (error) {
               console.log("Error getting file list", error);
               socket.emit("error", {data: "Error getting file list"});     
          }
     });
     socket.on("readFolder", async ({pathToFileFolder}) =>{
          try {
               const response = await fs.readdir(pathToFileFolder, {withFileTypes: true});
               const files = response.map((file) => {
                    return {
                         name: file.name,
                         isDirectory: file.isDirectory(),
                    };
               });
               socket.emit("folderRead", {data: files});
          } catch (error) {
               console.log("Error reading folder", error);
               socket.emit("error", {data: "Error reading folder"});     
          }
     });

}