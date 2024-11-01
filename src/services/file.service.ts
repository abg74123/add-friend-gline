import * as fs from "fs";

export class FileService {

  // Function to convert data to CSV format
  convertToCSV(data: string[][]): string {
    return data.map((row) => row.join(",")).join("\n");
  }

  // Function to write CSV to a file
  writeCSVToFile(csvContent: string, filePath: string) {
    fs.writeFile(filePath, csvContent, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("CSV file written successfully.");
      }
    });
  }
  
}
