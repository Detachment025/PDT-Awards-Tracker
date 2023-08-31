// pages/api/save.js
import fs from "fs";
import os from "os";
import path from "path";
import { write, utils } from "xlsx";

// Helper function to change pathing
export function insertBeforeExt(filePath, str) {
  const basename = path.basename(filePath);
  const ext = path.extname(basename);
  const newBasename = basename.replace(ext, `${str}${ext}`);
  return filePath.replace(basename, newBasename);
}

// Save file handler
export default function handler(req, res) {
  // STOPPER
  return res.status(200).json("STOP");

  // Check if method was using POST
  if (req.method === "POST") {
    // Try
    try {
      // Get the pathing to the cfg.json file
      const userHomeDirectory = os.homedir();
      const trackerDirectory = path.join(userHomeDirectory, ".tracker");
      const cfgPath = path.join(trackerDirectory, "cfg.json");

      // Read and return the cfg.json file
      const rawData = fs.readFileSync(cfgPath, "utf-8");
      const cfg_data = JSON.parse(rawData);

      // Extract the data for sheets from the request body
      const sheetsData = req.body.data;
      const tracker = req.body.tracker;

      // Create a new empty workbook to store sheets
      const wb = utils.book_new();

      // Return if the sheetData is empty
      if (Object.keys(sheetsData).length == 0) {
        return res.status(200).json("Empty");
      }

      // Iterate through each sheet's data to add it to the workbook
      for (let sheetName in sheetsData) {
        // Destructure header and content for the current sheet
        const { header, content } = sheetsData[sheetName];

        // Convert the combined header and content into a worksheet format
        const ws = utils.aoa_to_sheet([header, ...content]);

        // Manually set the range of the sheet, ensuring correct header
        // interpretation
        ws["!ref"] = utils.encode_range({
          s: { r: 0, c: 0 },
          e: { r: content.length, c: header.length - 1 },
        });

        // Append the created worksheet to the workbook with the given sheet
        // name
        utils.book_append_sheet(wb, ws, sheetName);
      }

      // Convert the workbook into binary data for sending as a response
      const binaryData = write(wb, { bookType: "xlsx", type: "buffer" });

      // Change the pathing
      const pathing = insertBeforeExt(cfg_data.sixYearPath, `_${tracker}`);

      // Write file
      fs.writeFileSync(cfg_data.sixYearPath, binaryData);

      // Return the content
      return res.status(200).json("Success");

      // If an error is caught, send an error response
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Unable to write data." });
    }

    // If a different method was used, respond with an error
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
