// Import
import os from "os";
import { join } from "path";

// Export config
export const config = require("./config.json");

// Export user config content
export const get_user_config = async () => {
  // Try to get it
  try {
    // Call API and extract data
    const response = await fetch("/api/get_cfg");
    const data = await response.json();

    // Return the data
    return data;
  } catch (error) {
    // Return null if there's any error
    return {};
  }
};
