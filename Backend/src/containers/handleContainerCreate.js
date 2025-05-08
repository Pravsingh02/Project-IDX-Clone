import Docker from 'dockerode';

const docker = new Docker();

export const handleContainerCreate = async (projectId, socket,req,tcpSocket,head) => { 
     console.log('project id received for container create', projectId);
     try {
          const container = await docker.createContainer({
               Image: 'sandbox',
               AttachStdin: true,
               AttachStdout: true,
               AttachStderr: true,
               Cmd: ['/bin/bash'],
               Tty: true,
               User: 'sandbox',
               Volumes:{
                    "/home/sandbox/app":{}
               },
               ExposedPorts: {
                    "5173/tcp": {}
               },
               Env:["HOST=0.0.0.0"],
               HostConfig: {
                    Binds: [
                         `${process.cwd()}/projects/${projectId}:/home/sandbox/app`
                    ],
                    PortBindings: {
                         "5173/tcp": [
                              {
                                   "HostPort": '0'// random port
                              }
                         ]
                    },
                    
               }
          }); 
          console.log("Container created", container.id);
          await container.start();
          console.log("Container started successfully");
          socket.handleUpgrade(req, tcpSocket, head,(establishedWSConn) => {
                    establishedWSConn.emit(`connection`, establishedWSConn, req,container); 
          });

     } catch (error) {
          console.error('Error creating container:', error);          
     }
  
}
