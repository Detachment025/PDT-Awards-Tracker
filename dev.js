// Import required modules
const { app, BrowserWindow } = require("electron");
const path = require('path');
const fs = require('fs');

// Function to create a new window
function createWindow() {
  // Create a new window with the following configurations
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

  // Maximize window
  window.maximize();

  // Loads the URL of the app
  window.loadURL('http://localhost:3000');
}

// Set your directory and file paths
const dirPath = path.join(__dirname, './data');
const filePath = path.join(dirPath, 'data.json');

// Check if the directory exists
if (!fs.existsSync(dirPath)) {
  // If the directory does not exist, create it
  fs.mkdirSync(dirPath, { recursive: true });
}

// Check if the file exists
if (!fs.existsSync(filePath)) {
  // If the file does not exist, create it
  fs.writeFileSync(filePath, JSON.stringify({}), 'utf8');
}

// When Electron has finished initialization and is ready
// to create browser windows, call the createWindow function
app.on("ready", createWindow)

// Quit the application when all windows are closed
// (except on macOS)
app.on("window-all-closed", function () {
  // Kill all associated processes
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// When the application gets activated, create a window if
// there isn't one already
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

//                           /\
//                          |  |
//                          |  |
//                         .'  '.
//                         |    |
//                         |    |
//                         | /\ |
//                       .' |__|'.
//                       |  |  |  |
//                      .'  |  |  '.
//                 /\   |   \__/   |   /\
//                |  |  |   |  |   |  |  |
//            /|  |  |,-\   |  |   /-,|  |  |\
//            ||  |,-'   |  |  |  |   '-,|  ||
//            ||-'       |  |  |  |       '-||
// |\     _,-'           |  |  |  |           '-,_     /|
// ||  ,-'   _           |  |  |  |               '-,  ||
// ||-'    =(*)=         |  |  |  |                  '-||
// ||                    |  \  /  |                    ||
// |\________....--------\   ||   /--------....________/|
//                       /|  ||  |\
//                      / |  ||  | \
//                     /  |  \/  |  \
//                    /   |      |   \
//                  //   .|      |.   \\
//                .' |_./ |      | \._| '.
//               /     _.-|||  |||-._     \
//               \__.-'   \||/\||/   '-.__/