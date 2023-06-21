// Import required modules
const { app, BrowserWindow } = require("electron");
const express = require('express');
const waitOn = require('wait-on');
const path = require('path');
const next = require('next');
const fs = require('fs');

// Variable declaration
let server;

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

// Your express server code
const nextApp = next({ dev: false });
const handle = nextApp.getRequestHandler();

// Prepare application
nextApp.prepare().then(() => {
  // Get the server's express instance
  server = express();

  // Router call
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Server initialization
  server = server.listen(3000, (err) => {
    // Error handling
    if (err) throw err;

    // Console print
    console.log(`> Ready on http://localhost:3000`);

    // Wait for server to be ready before creating the window
    waitOn({ resources: ['http-get://localhost:3000'] }, (err) => {
      if (err) {
        console.error('Error waiting for resource:', err);
        return;
      }

      createWindow();
    });
  });
});

// Run server
app.whenReady().then(() => {
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});


// Quit the application when all windows are closed
// (except on macOS)
app.on("window-all-closed", function () {
  // Kill all associated processes
  if (process.platform !== 'darwin') {
    if (server) {
      server.close();
    }
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