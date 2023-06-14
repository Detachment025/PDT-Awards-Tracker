const { app, BrowserWindow } = require("electron");

function createWindow() {
    const window = new BrowserWindow({
        width: 1440,
        height: 900,
        autoHideMenuBar: true,
        outline: "none",
        webPreferences: {
            enableRemoteModule: true
        },
        title: "PDT and Awards Tracker",
        icon: __dirname + "\\icon.ico"
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