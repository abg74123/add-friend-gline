import * as fs from "fs";

export class FileService {

  // Function to convert data to CSV format
  convertToCSV(data: string[]): string {
    return `${data.join(",")}\n`;
  }

  // Function to write CSV to a file
  writeCSVToFile(csvContent: string, filePath: string) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (data) {
        if (err) throw err;

        const newRow = csvContent;
        const updatedData = data + newRow;

        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
          if (err) throw err;
        });
      } else {
        fs.writeFile(filePath, csvContent, 'utf8', (err) => {
          if (err) throw err;
        });
      }

    });
  }

}
