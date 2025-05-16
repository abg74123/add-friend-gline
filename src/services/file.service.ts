import * as fs from "fs";

export class FileService {
  convertName(text: string) {
    let itemString = String(text); // Convert to string
    itemString = itemString.replace(/"/g, '""');

    // If the string contains commas, double quotes, or newlines, enclose it in double quotes
    if (
      itemString.includes(",") ||
      itemString.includes('"') ||
      itemString.includes("\n")
    ) {
      itemString = `"${itemString}"`;
    }
    return itemString;
  }

  // Function to convert data to CSV format
  convertToCSV(data: string[]): string {
    return `${data.join(",")}\n`;
  }

  // Function to write CSV to a file
  async writeCSVToFile(csvContent: string, filePath: string) {
    try {
      // Read the existing JSON file
      const data = await fs.readFileSync(filePath, "utf8");
      const updatedData = data + csvContent;

      // Write the modified JSON data back to the file
      await fs.writeFileSync(filePath, updatedData, "utf8");

      console.log("Row appended successfully!");
    } catch (err) {
      console.error("Error appending row:", err);

      const pathFail = `assets/reports/customer_fail.csv`;

      // Read the existing JSON file
      const dataOld = await fs.readFileSync(pathFail, "utf8");

      // * Put Log On Not Found File
      const data: any = [csvContent, err, new Date()];
      const dataConvert = this.convertToCSV(data);
      const updatedData = dataOld + dataConvert;

      await fs.writeFileSync(pathFail, updatedData, "utf8");
    }
  }

  // Function to write CSV to a file
  async writeJSONToFile(csvContent: any, filePath: string) {
    try {
      // Read the existing JSON file
      const data = await fs.readFileSync(filePath, "utf8");
      let jsonData = JSON.parse(data);

      // Push the new row to the appropriate array
      jsonData.data.push(csvContent); // Assuming 'data' is the array key

      // Write the modified JSON data back to the file
      await fs.writeFileSync(
        filePath,
        JSON.stringify(jsonData, null, 2),
        "utf8"
      );

      console.log("Row appended successfully!");
    } catch (err) {
      console.error("Error appending row:", err);
      // * Put Log On Not Found File
      const fileJsonPath = `assets/reports/customer_fail.json`;

      // Read the existing JSON file
      const data = await fs.readFileSync(fileJsonPath, "utf8");
      let jsonData = JSON.parse(data);

      const dataJson = {
        uuid: csvContent,
        error: err,
        date: new Date(),
      };

      // Push the new row to the appropriate array
      jsonData.data.push(dataJson); // Assuming 'data' is the array key

      await fs.writeFileSync(
        fileJsonPath,
        JSON.stringify(jsonData, null, 2),
        "utf8"
      );
    }
  }
}
