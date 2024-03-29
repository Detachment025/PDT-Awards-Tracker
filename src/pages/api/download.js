// Imports
import fs from "fs";
import os from "os";
import path from "path";

// Downloader function
export default function handler(req, res) {
  // Check if method was using POST
  if (req.method === "GET") {
    // Get the pathing to the cfg.json file
    const userHomeDirectory = os.homedir();
    const trackerDirectory = path.join(userHomeDirectory, ".tracker");
    const cfgPath = path.join(trackerDirectory, "cfg.json");

    // Read and return the cfg.json file
    const rawData = fs.readFileSync(cfgPath, "utf-8");
    const cfg_data = JSON.parse(rawData);
    const datapath = cfg_data.datapath;

    // Check if file exists
    if (fs.existsSync(datapath)) {
      // Set Headers
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + path.basename(datapath)
      );

      // Read the file and send it
      const fileStream = fs.createReadStream(datapath);
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
