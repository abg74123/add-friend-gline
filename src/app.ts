import 'dotenv/config'
import { FriendService } from "./services/friend.service";
import { FileService } from "./services/file.service";

// * Declare Service
const friendService = new FriendService();
const fileService = new FileService();

friendService.addFriend().then((customer) => {
  // Convert data to CSV and specify the file path
  const csvContent = fileService.convertToCSV(customer);
  const filePath = "assets/customer.csv";

  // Write the CSV to the specified file
  fileService.writeCSVToFile(csvContent, filePath);
});
