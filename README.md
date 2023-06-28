<div align="center">
  <img src="./src/public/icon.ico" width="400" height="400">
  <h1>PDT & Awards Tracker</h1>
  Developed by <a href="https://github.com/BenjaminHerrera">Benjamin Herrera</a>
  <br />
  <br />
  <br />
</div>

This product is a cross-platform application that allows cadre to track Awards and PDTs.
This application aims to ease the stress of using unstandardized forms of tracking and
improve communications regarding granting such opportunities.

# Installation

Go to the [Releases Page](https://github.com/Detachment025/PDT-Awards-Tracker/releases/) to download
the installer for the latest version of this project. Once you have downloaded the installer, run
it and follow the instructions shown on the screen. Customize the installer's options to your liking.
Once the application is installed, run it and you should have the product working!

# Getting Started
There are two ways to track PDTs and Awards with this application. The first option is by creating a 
whole new dataset. The second option is to import a dataset. All data will be stored in the 
`./data/data.json` file. Note that the aforementioned path is relative to the installation path of the
application. When importing data from a separate file, the data is copied to the `./data/data.json` file;
it does not modify the content of the imported source file. 

# Building
If you would like to build this application on your own end, first ensure that you have `Node.js` and `npm`
installed. Once you've ensured that you have the prerequisite software, git clone this repo via this command:
`git clone https://github.com/Detachment025/PDT-Awards-Tracker.git`. Once you've cloned this repo, run 
`yarn electron:build`. This will create a `dist` folder which will show application files for you to run on
your own system. 

# Issues? Questions? Feedback?
If you have any issues, questions, or feedback, please send them to the 
[Issues Page](https://github.com/Detachment025/Award-PDT-Tracker/issues) so that I can track and monitor 
the state of the application. If you prefer a different form of communication, you may email me at 
[b10@asu.edu](b10@asu.edu).
