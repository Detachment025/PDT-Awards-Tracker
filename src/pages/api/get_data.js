// pages/api/save.js
import fs from "fs";
import os from "os";
import path from "path";

// Save file handler
export default function handler(req, res) {
  // Check if method was using POST
  if (req.method === "GET") {
    // Try
    try {
      // Get the pathing to the cfg.json file
      const userHomeDirectory = os.homedir();
      const trackerDirectory = path.join(userHomeDirectory, ".tracker");
      const cfgPath = path.join(trackerDirectory, "cfg.json");

      // Read and return the cfg.json file
      const rawData = fs.readFileSync(cfgPath, "utf-8");
      const cfg_data = JSON.parse(rawData);
      const filePath = cfg_data.datapath;

      // Read the content from the specified filePath
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const fileData = JSON.parse(fileContent);

      // Return the content
      return res.status(200).json(fileData);

    // If an error is caught, send an error response
    } catch (error) {
      return res.status(500).json({ message: "Unable to read data." });
    }

  // If a different method was used, respond with an error
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
