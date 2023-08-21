// Export the handler function for the API route
export default function handler(req, res) {
  // Check if the incoming request is a POST request
  if (req.method === "POST") {
    try {
      // Extract the body content from the request
      const { rows, headers } = req.body;

      // Initialize a string for CSV content, setting the MIME type and charset
      let csvContent = "";

      // If headers are provided, add them to the CSV content
      if (headers && headers.length) {
        csvContent +=
          headers.map((header) => `"${header.replace(/"/g, '""')}"`).join(",") +
          "\r\n";
      }

      // Iterate through each row of the data and format it as CSV
      rows.forEach((row) => {
        csvContent +=
          row.map((item) => `"${item.replace(/"/g, '""')}"`).join(",") + "\r\n";
      });

      // Set headers to indicate the response will be a downloadable CSV file
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=data.csv");

      // Send the formatted CSV content as the response
      res.status(200).send(csvContent);
    } catch (error) {
      // In case of any errors during processing, send an error response
      res.status(500).json({ error: "Failed to export data." });
    }
  } else {
    // Handle any request method other than POST
    res.status(405).json({ error: "Method not allowed." });
  }
}
