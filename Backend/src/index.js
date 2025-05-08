import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/index.js';
import chokidar from 'chokidar';
import { handleEditorSocketEvents } from './sockethandlers/editorHandlers.js';
import { handleContainerCreate } from './containers/handleContainerCreate.js';
import { WebSocketServer } from 'ws';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/api',apiRouter);

app.get('/ping', (req, res) => {
     return res.json({ message: 'Pong!' });
});

const editorNamespace = io.of('/editor');
editorNamespace.on("connection", (socket) => {
  console.log('Editor Connected');

  const query = { ...socket.handshake.query };
  const projectId = query.projectId;
  
  console.log("Project id received after connection", projectId);

  if (projectId) {
    var watcher = chokidar.watch(`./projects/${projectId}`, {
      ignored: (path) => path.includes('node_modules'),
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100,
      },
      ignoreInitial: true,
    });

    watcher.on("all", (event, path) => {
      console.log(event, path);
    });
  }
  handleEditorSocketEvents(socket,editorNamespace);

});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(process.cwd());
} );

const webSocketForTerminal = new WebSocketServer({
  noServer: true,
});
server.on('upgrade', (req, tcpSocket, head) => {
  const isTerminal = req.url.includes(`/terminal`);

  if(isTerminal)
  {
    console.log("requested url : ",req.url);
    const projectId = req.url.split('=')[1];
    console.log("Project id received after connection", projectId);
    handleContainerCreate(projectId,webSocketForTerminal,req,tcpSocket,head);
  }
  

});
webSocketForTerminal.on(`connection`, (ws,req) => {
  console.log("Terminal connected",ws,req);
})
  