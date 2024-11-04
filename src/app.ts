import 'dotenv/config'

import { FriendService } from "./services/friend.service";

// * Declare Service
const friendService = new FriendService();

friendService.addFriend()
