const fs = require('fs');
const path = require('path');
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
        icon: ".\\src\\public\\icon.ico"
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

// define the path of the file
let filePath = path.join(__dirname, './data/data.json');

fs.access(filePath, fs.constants.F_OK, (err) => {
    // if the file doesn't exist
    if(err){
        // ensure data directory exists
        fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
            if (err) throw err;

            // write an empty json object to the file
            fs.writeFile(filePath, JSON.stringify({}), 'utf8', (err) => {
                if (err) throw err;
                console.log('Data file has been created');
            });
        });
    } else {
        console.log('File exists');
    }
});