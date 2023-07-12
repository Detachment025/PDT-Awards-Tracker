// pages/api/save.js
import fs from "fs";
import os from "os";
import { join } from "path";

// Save file handler
export default function handler(req, res) {
  // Check if method was using POST
  if (req.method === "POST") {
    // Get data from request body
    const data = req.body;

    // Try
    try {
      // Define a filename
      const filename = "data.json";

      // Calculate user's tracker directory
      const userHomeDirectory = os.homedir();
      const trackerDirectory = join(userHomeDirectory, '.tracker');

      // Define a path for the file
      const filePath = join(trackerDirectory, filename);

      // Write the data to the file
      fs.writeFileSync(filePath, data);

      // Send a response
      return res.status(200).json({ message: "Data saved successfully." });

      // If an error is caught, send an error response
    } catch (error) {
      return res.status(500).json({ message: "Unable to save data." });
    }

    // If a different method was used, respond with an error
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
