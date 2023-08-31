// pages/api/readConfig.js
import { error } from "console";
import fs from "fs";
import os from "os";
import path from "path";

// Function to check the given contents of the
function cfg_checker(key, value) {
  // Get the pathing for the user's config
  const userHomeDirectory = os.homedir();
  const trackerDirectory = path.join(userHomeDirectory, ".tracker");
  const cfgPath = path.join(trackerDirectory, "cfg.json");

  // Read the current config
  const currentData = JSON.parse(fs.readFileSync(cfgPath, "utf-8"));

  // If the datapath key is passed, make sure it is in the right format
  if (key == "datapath") {
    // Check if the path is in the right file extension
    const path_file_ext = value.endsWith(".json");
    if (!path_file_ext) {
      return [false, "Path is not in the right file extension."];
    }

    // Get the new datapath's directory path
    const directoryPath = path.dirname(value);

    // Ensure directory exists
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Create the file if it doesn't exist
    if (!fs.existsSync(value)) {
      fs.writeFileSync(value, JSON.stringify({}, null, 2), "utf-8");
      fs.copyFileSync(currentData.datapath, value);
    }

    // Return with success
    return [true, "Success"];
  }

  // If the datapath key is passed, make sure it is in the right format
  else if (key == "sixYearPath") {
    // Check if the path is in the right file extension
    const path_file_ext = value.endsWith(".xlsx");
    if (!path_file_ext) {
      return [false, "Path is not in the right file extension."];
    }

    // Get the new datapath's directory path
    const directoryPath = path.dirname(value);

    // Ensure directory exists
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Create the file if it doesn't exist
    if (!fs.existsSync(value)) {
      fs.writeFileSync(value, JSON.stringify({}, null, 2), "utf-8");
      fs.copyFileSync(currentData.sixYearPath, value);
    }

    // Return with success
    return [true, "Success"];
  }
}

// Get user config handler
export default function handler(req, res) {
  // Try to get the config file
  try {
    // Get the pathing
    const userHomeDirectory = os.homedir();
    const trackerDirectory = path.join(userHomeDirectory, ".tracker");
    const cfgPath = path.join(trackerDirectory, "cfg.json");

    // Grab the file and return
    if (fs.existsSync(cfgPath)) {
      // Extract key and value to be updated from the request body
      const { key, value } = req.body;

      // Validation: Ensure key and value are provided
      if (!key || value === undefined) {
        return res.status(400).json({ error: "Key and value are required." });
      }

      // Pass the key and value into a checker function
      const [res_state, err_msg] = cfg_checker(key, value);
      if (!res_state) return res.status(404).json({ error: err_msg });

      // Read the current config
      const currentData = JSON.parse(fs.readFileSync(cfgPath, "utf-8"));

      // Update the key's value
      currentData[key] = value;

      // Write the updated config back to the file
      fs.writeFileSync(cfgPath, JSON.stringify(currentData, null, 2));

      // Return success
      return res.status(200).json({ message: "Config updated successfully." });
    } else {
      // Return error if the config was not found
      return res.status(404).json({ error: "Config not found." });
    }
  } catch (error) {
    // Catch any errors
    console.log(error);
    return res.status(500).json({ error: "Failed to read config." });
  }
}
