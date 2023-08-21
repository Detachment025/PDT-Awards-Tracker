// pages/api/get_cfg.js
import fs from "fs";
import os from "os";
import path from "path";

// Get user config handler
export default function handler(req, res) {
  // Try to get the config file
  try {
    // Get the pathing to the cfg.json file
    const userHomeDirectory = os.homedir();
    const trackerDirectory = path.join(userHomeDirectory, ".tracker");
    const cfgPath = path.join(trackerDirectory, "cfg.json");

    // Grab the file and return
    if (fs.existsSync(cfgPath)) {
      // Read and return the cfg.json file
      const rawData = fs.readFileSync(cfgPath, "utf-8");
      const data = JSON.parse(rawData);
      return res.status(200).json(data);
    } else {
      // Return error if the config was not found
      return res.status(404).json({ error: "Config not found." });
    }
  } catch (error) {
    // Catch any errors
    res.status(500).json({ error: "Failed to read config." });
  }
};
