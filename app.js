const electron = require('electron');
const path = require('path');
const url = require('url');

const {app,BrowserWindow,Menu,ipcMain} = electron;

let mainWindow;
app.on('ready',()=>{
    mainWindow = new BrowserWindow({
      width:600,
      height:480,
      webPreferences:{
        nodeIntegration:true
      },
      title:'Covid-19 Tracker',
      frame:false
    });
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'index.html'),
        protocol:'file',
        slashes:true
    }));
    mainWindow.on('closed',()=>{
      mainWindow = null;
      app.quit();
    })
});

//IpcMain
ipcMain.on('close',()=>{
  app.quit()
})
