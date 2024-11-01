import { v4 as uuidv4 } from "uuid";
import { LineService } from "./line.service";
// * Variable
const token = process.env.ACCESS_TOKEN;
const compId = process.env.COMPANY;
const socialChannelId = process.env.SOCIAL_CHANNEL;

// * Declare Service
const lineService = new LineService();

export class FriendService {

  async addFriend() {
    let end = 0;
    let countFail = 0;

    // * Start Column Name
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

        // * Create Row
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
          0,
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

}
