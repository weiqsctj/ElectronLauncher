const { app, BrowserWindow, ipcMain } = require('electron')
const { spawn } = require('child_process')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 500,
    height: 400,
    resizable: false,
    icon: path.join(__dirname, 'assets', 'vue-icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.on('start-dev-server', (event) => {
  const projectPath = 'D:\\VS code\\WorkSpace2\\vue3-wei-starter'

  const child = spawn('npm', ['run', 'dev'], {
    cwd: projectPath,
    shell: true
  })

  child.stdout.setEncoding('utf8')
  child.stderr.setEncoding('utf8')

  child.stdout.on('data', (data) => {
    event.sender.send('server-output', data)
  })

  child.stderr.on('data', (data) => {
    event.sender.send('server-output', `[错误] ${data}`)
  })

  child.on('close', (code) => {
    event.sender.send('server-output', `服务已退出，代码: ${code}\n`)
  })
})