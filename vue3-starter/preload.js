const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  startDevServer: () => ipcRenderer.send('start-dev-server'),
  onOutput: (callback) => ipcRenderer.on('server-output', (event, data) => callback(data))
})