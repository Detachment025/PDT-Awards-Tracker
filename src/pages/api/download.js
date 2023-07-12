// Imports
import fs from "fs";
import os from "os";
import path from "path";

// Downloader function
export default function handler(req, res) {
  // Check if method was using POST
  if (req.method === "GET") {
    // Calculate user's tracker directory
    const userHomeDirectory = os.homedir();
    const trackerDirectory = path.join(userHomeDirectory, ".tracker/data.json");

    // Check if file exists
    if (fs.existsSync(trackerDirectory)) {
      // Set Headers
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + path.basename(trackerDirectory)
      );

      // Read the file and send it
      const fileStream = fs.createReadStream(trackerDirectory);
      fileStream.pipe(res);
    } else {
      // If file not found
      res.status(404).send("File not found");
    }
  } else {
    // Handle any request method other than GET
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
