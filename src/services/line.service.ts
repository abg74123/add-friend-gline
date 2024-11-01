import { Client } from "@line/bot-sdk";

export class LineService {

  async getFriendIds(channelAccessToken) {
    console.log("--- FUNC | getFriendIds---");
    try {
      const client = new Client({
        channelAccessToken: channelAccessToken,
      });
      const FriendIds = await client.getBotFollowersIds();
      console.log("FriendIds => ", FriendIds);
      return FriendIds;
    } catch (error) {
      console.log("getFriendIds Error=> ", error);
    }
  }

  async getProfileUser(channelAccessToken, userId) {
    try {
      const client = new Client({
        channelAccessToken: channelAccessToken,
      });
      const profileUser = await client.getProfile(userId);
      console.log("profileUser => ", profileUser);
      return profileUser;
    } catch (error) {
      console.log("getProfileUser Error=> ", error);
    }
  }
  
}
