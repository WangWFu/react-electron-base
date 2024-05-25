import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'

let win: BrowserWindow | null = null
const preload = join(__dirname,'../preload/index.js')


process.env.DIST_ELECTRON = join(__dirname, "../");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
let url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");


const createWindow = () => {
   win = new BrowserWindow({
    width: 500,
    height: 400,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
   })
  if(process.env.NODE_ENV === 'development'){
    win.loadURL(url as string)
  } else {
    win.loadFile(indexHtml)    
  }
}
app.whenReady().then(() => { 
  ipcMain.handle('ping',()=>'pong')
  createWindow()
  app.on('ready', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
app.on('window-all-closed', () => { 
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
