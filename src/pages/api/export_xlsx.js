// Import necessary utilities from 'xlsx' library
import { write, utils } from "xlsx";

// Define the default export function for the API route
export default function handler(req, res) {
  // Check if the incoming request method is POST
  if (req.method === "POST") {
    try {
      // Extract the data for sheets from the request body
      const sheetsData = req.body;

      // Create a new empty workbook to store sheets
      const wb = utils.book_new();

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

      // Set the response headers to denote Excel filetype and attachment
      // filename
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", "attachment; filename=export.xlsx");

      // Send the prepared Excel file as the API response
      res.status(200).send(binaryData);
    } catch (error) {
      // Log any errors that occur during processing to the console
      console.log(error);
      // Respond with a status 500 (server error) and an error message
      res.status(500).json({ error: "Failed to export data." });
    }
  } else {
    // If the request method is not POST, respond with a status 405
    // (method not allowed)
    res.status(405).json({ error: "Method not allowed." });
  }
}
