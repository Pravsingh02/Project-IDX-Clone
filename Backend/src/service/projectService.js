import fs from 'node:fs/promises';
import uuid4 from 'uuid4';
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';
import { execPromisify } from '../utils/execUtility.js';
import directoryTree from 'directory-tree';
import path from 'node:path';
export const createProjectService = async () => {
     const ProjectId = uuid4();
     console.log('New project ID:', ProjectId);
     
     await fs.mkdir(`./projects/${ProjectId}`);

     const response = await execPromisify(REACT_PROJECT_COMMAND,
          { cwd: `./projects/${ProjectId}`}
     );
     return ProjectId;
}
export const getProjectTreeService = async (projectId) =>{
     const projectPath = path.resolve(`./projects/${projectId}`);
     const tree = directoryTree(projectPath);
     return tree; 
}