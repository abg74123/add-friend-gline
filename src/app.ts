import { Client } from "@line/bot-sdk";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

// * Variable
const token = process.env.TOKEN
const compId = process.env.COMPANY
const socialChannelId = process.env.SOCIAL_CHANNEL

async function getFriendIds(channelAccessToken) {
  console.log("--- FUNC | getFriendIds---");
  try {
    const client = new Client({
      channelAccessToken: channelAccessToken,
    });
    const FriendIds = await client.getBotFollowersIds();
    console.log("FriendIds => ", FriendIds);
    return FriendIds;
  } catch (error) {
    this.shareService.handleError(error, "getFriendIds");
  }
}

async function getProfileUser(channelAccessToken, userId) {
  try {
    const client = new Client({
      channelAccessToken: channelAccessToken,
    });
    const profileUser = await client.getProfile(userId);
    console.log("profileUser => ", profileUser);
    return profileUser;
  } catch (error) {
    this.shareService.handleError(error, "getProfileUser");
  }
}

// Function to convert data to CSV format
function convertToCSV(data: string[][]): string {
  return data.map((row) => row.join(",")).join("\n");
}

// Function to write CSV to a file
function writeCSVToFile(csvContent: string, filePath: string) {
  fs.writeFile(filePath, csvContent, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("CSV file written successfully.");
    }
  });
}

async function addFriend() {
  const customers = [
    [
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
    ],
  ];
  // * ## Get Friend Ids
  const Ids: any = await getFriendIds(token);
  let end = 0;
  console.log("--- ---Ids Length---", Ids.length);
  let countFail = 0;
  for (const [index, id] of Ids.entries()) {
    // if (end === 5) break;
    console.log(`--- --- ---CUSTOMER[${index + 1}/${Ids.length}]---`);
    console.log(`--- --- ---FAIL[${countFail}]---`);
    try {
      let uuid = uuidv4();
      const profile: any = await getProfileUser(token, id);
      const date = new Date();
      const dateString = date.toISOString();

      console.log("Your UUID is: " + uuid);
      const customer = [
        uuid,
        id,
        profile.pictureUrl || "",
        "",
        profile.displayName || "",
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
        0
      ];
      customers.push(customer);
    } catch (error) {
      countFail++;
    }
    // end++;
  }

  console.log("customers => ", customers);

  return customers;
}

addFriend().then((customer) => {
  // Convert data to CSV and specify the file path
  const csvContent = convertToCSV(customer);
  const filePath = "assets/customer.csv";

  // Write the CSV to the specified file
  writeCSVToFile(csvContent, filePath);
});
