import * as fs from "fs";

import { FileService } from "./file.service";
import { LineService } from "./line.service";
import { v4 as uuidv4 } from "uuid";

// * Variable
const token = process.env.ACCESS_TOKEN;
const compId = process.env.COMPANY;
const socialChannelId = process.env.SOCIAL_CHANNEL;

// * Declare Service
const lineService = new LineService();
const fileService = new FileService();

export class FriendService {

  async addFriend() {

    await fs.unlink("assets/reports/customer_success.csv", (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully!');
      }
    });

   await fs.unlink("assets/reports/customer_fail.csv", (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully!');
      }
    });

    // let end = 0;
    let countFail = 0;

    // * Start Column Name
    const header_success = [
      "id",
      "uuid",
      "avatarUrl",
      "email",
      "displayName",
      "firstName",
      "lastName",
      "phone",
      "position",
      "note",
      "isBlock",
      "consultant",
      "createdAt",
      "updatedAt",
      "companyId",
      "teamId",
      "customerCompany",
      "rating",
      "socialChannelId",
      "nickName",
      "status",
    ]

    // * Start Column Name
    const header_fail = [
      "uuid",
      "error",
      "date"
    ]

    // * Create File Header
    // Convert data to CSV and specify the file path
    const csvContent_success = fileService.convertToCSV(header_success);
    const filePath_success = "assets/reports/customer_success.csv";

    // Write the CSV to the specified file
    fileService.writeCSVToFile(csvContent_success, filePath_success);


    // * Create File Header
    // Convert data to CSV and specify the file path
    const csvContent_fail = fileService.convertToCSV(header_fail);
    const filePath_fail = "assets/reports/customer_fail.csv";

    // Write the CSV to the specified file
    fileService.writeCSVToFile(csvContent_fail, filePath_fail);

    // * ## Get Friend List Ids From Line
    /**
     * ['Uc296ae7....','Uc296ae7....','Uc296ae7....']
     */
    const Ids: any = await lineService.getFriendIds(token);
    console.log("--- ---Ids Length---", Ids.length);

    for (const [index, id] of Ids.entries()) {
      // if (end === 5) break;
      console.log(`--- --- ---CUSTOMER[${index + 1}/${Ids.length}]---`);
      console.log(`--- --- ---FAIL[${countFail}]---`);
      try {
        let uuid = uuidv4();
        const date = new Date();
        const dateString = date.toISOString();
        // * Get Profile User From Line
        const profile: any = await lineService.getProfileUser(token, id);

        // * Create Row Customer
        const customer = [
          uuid,
          id,
          profile && profile.pictureUrl ? profile.pictureUrl : "",
          "",
          profile && profile.displayName ? '"' + profile.displayName + '"' : "",
          "",
          "",
          "",
          "",
          "",
          false,
          "",
          dateString,
          dateString,
          compId,
          "",
          "",
          0,
          socialChannelId,
          "",
          0,
        ];

        // Convert data to CSV and specify the file path
        const csvContent = fileService.convertToCSV(customer);
        const filePath = "assets/reports/customer_success.csv";

        // Write the CSV to the specified file
        fileService.writeCSVToFile(csvContent, filePath);
      } catch (error) {

        countFail++;
        const data = [id, error, new Date()]

        // Convert data to CSV and specify the file path
        const csvContent = fileService.convertToCSV(data);
        const filePath = "assets/reports/customer_fail.csv";

        // Write the CSV to the specified file
        fileService.writeCSVToFile(csvContent, filePath);
      }
      // end++;
    }

  }

}
