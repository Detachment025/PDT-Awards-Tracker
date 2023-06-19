// Import required modules
const fs = require('fs');
const path = require('path');
const { app, BrowserWindow } = require("electron");

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

    // Loads the URL of the app
    window.loadURL("http://localhost:3000");
}

// When Electron has finished initialization and is ready
// to create browser windows, call the createWindow function
app.on("ready", createWindow)

// Quit the application when all windows are closed
// (except on macOS)
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// When the application gets activated, create a window if
// there isn't one already
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// // Define the path of the file
// let filePath = path.join(__dirname, './data/data.json');

// // Check if the file exists
// fs.access(filePath, fs.constants.F_OK, (err) => {
//     // If the file doesn't exist
//     if(err){
//         // Create the directory (and its parents if necessary)
//         fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
//             if (err) throw err;  // Throw an error if an error occurred

//             // Write an empty JSON object to the file
//             fs.writeFile(filePath, JSON.stringify({}), 'utf8', (err) => {
//                 if (err) throw err;  // Throw an error if an error occurred
//                 console.log('Data file has been created');  // Log that the file was created
//             });
//         });
//     } else {
//         // If the file exists, log it
//         console.log('File exists');
//     }
// });

















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