import fs from "fs/promises";
export const handleEditorSocketEvents = (socket) => {
     socket.on("writeFile", async ({data,pathToFileFolder}) =>{
          try {
               const response = await fs.writeFile(pathToFileFolder, data);
               socket.emit("writeFile Success", {data: "File written successfully"});
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
               socket.emit("fileDeleted", {data: "File deleted successfully"});
          } catch (error) {
               console.log("Error deleting file", error);
               socket.emit("error", {data: "Error deleting file"});     
          }
     });
     socket.on("creaeFolder", async ({pathToFileFolder}) =>{
          try {
               const response = await fs.mkdir(pathToFileFolder);
               socket.emit("folderCreated", {data: "Folder created successfully"});
          } catch (error) {
               console.log("Error creating folder", error);
               socket.emit("error", {data: "Error creating folder"});     
          }
     });
     socket.on("deleteFolder", async ({pathToFileFolder}) =>{
          try {
               const response = await fs.rmdir(pathToFileFolder,{recursive: true});
               socket.emit("folderDeleted", {data: "Folder deleted successfully"});
          } catch (error) {
               console.log("Error deleting folder", error);
               socket.emit("error", {data: "Error deleting folder"});     
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

}