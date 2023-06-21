// Import required modules
const { app, BrowserWindow } = require("electron");
const childProcess = require('child_process');
const express = require('express');
const waitOn = require('wait-on');
const path = require('path');
const next = require('next');
const url = require('url');

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
  window.loadURL('http://localhost:3000');
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