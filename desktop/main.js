const { app, BrowserWindow } = require("electron");

function createWindow() {
    const window = new BrowserWindow({
        width: 1280,
        height: 720, 
        autoHideMenuBar: true,
        webPreferences: {
            enableRemoteModule: true
        }
    });

    window.loadURL("http://localhost:3000");
}

app.on("ready", createWindow)

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});