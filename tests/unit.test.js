const User = require("../src/User");
const Admin = require("../src/Admin");
const Food = require("../src/Food");
const db = require("../src/db");

const admin1 = new Admin("Joseph", "pass1", "admin1@gmail", "08312929393");
const admin2 = new Admin("Paul", "pass2", "admin2@gmail", "08312944493");
const user1 = new User("John", "pass1", "joe@gmail", "08312929393", "Lekki");
const user2 = new User("Jane", "pass2", "jane@gmail", "08310009393", "Ajao");
const user3 = new User("Victor3", "pass3", "vic@gmail", "08310009393", "Ikeja");
admin2.saveAccount();
user3.saveAccount();

user2.saveAccount();

describe("CREATE NEW ADMIN USER", function() {
   const savedAdmin1 = admin1.saveAccount();

   it("Should return success if admin account saved to db", function() {
      expect(savedAdmin1).toMatch("SUCCESS: Account Saved");
   });
});

describe("ADMIN CAN CREATE FOOD ITEM", function() {
   it("Should return success if food was created", function() {
      expect(admin1.createFoodItem("rice", "grains", 500, 18)).toMatch(
         "SUCCESS: Food Added"
      );

      expect(admin1.createFoodItem("beans", "protein", 450, 28)).toMatch(
         "SUCCESS: Food Added"
      );
      expect(admin1.createFoodItem("yoghurt", "dairy", 600, 8)).toMatch(
         "SUCCESS: Food Added"
      );
      expect(admin1.createFoodItem("Orange", "fruit", 100, 20)).toMatch(
         "SUCCESS: Food Added"
      );
   });
});

describe("ADMIN CAN GETALL, UPDATE, DELETE", function() {
   it("Should return values for all operation", function() {
      expect(admin1.getAllFoodItem).toBeDefined();
      expect(admin1.getAllFoodItem.length).toBeGreaterThan(0);
      expect(admin1.getAllFoodItem).toContainEqual({
         id: 1,
         foodName: "rice",
         category: "grains",
         price: 500,
         quantity: 18,
         isDeleted: false
      });
      expect(admin1.updateFoodItem(2, "rice", "grains", 400, 10)).toMatch(
         "SUCCESS: Food Updated"
      );
      expect(admin1.updateFoodItem(4, "", "", "", "")).toMatch(
         "SUCCESS: Food Updated"
      );
      expect(admin1.deleteOneFoodItem(4)).toMatch("SUCCESS: Food Item Deleted");
      expect(admin1.getOneFoodItem("yoghurt")).toEqual({
         category: "dairy",
         foodName: "yoghurt",
         id: 3,
         isDeleted: false,
         price: 600,
         quantity: 8
      });
   });
});

describe("CREATE NEW USER", function() {
   const savedUser1 = user1.saveAccount();
   it("Should return a value when called", function() {
      expect(savedUser1).toBeDefined();
   });

   it("Should return a success message when saved", function() {
      expect(savedUser1).toMatch("SUCCESS: Account Saved");
   });
});

describe("USER CAN PLACE NEW ORDER", function() {
   it("Should return a success message when order", function() {
      expect(user1.placeOrder()).toMatch("INFO: No such meal");

      expect(user1.placeOrder("rice", 5)).toMatch(
         "SUCCESS: Order was successful"
      );

      expect(user1.placeOrder("Orange", 8)).toMatch(
         "SUCCESS: Order was successful"
      );

      expect(user2.placeOrder("yoghurt", 2)).toMatch(
         "SUCCESS: Order was successful"
      );

      expect(user2.placeOrder("yoghurt", 12)).toMatch("INFO: Not enough meal");
   });
});

describe("USER CAN UPDATE ACCOUNT INFO", function() {
   it("Should return a value when called", function() {
      expect(user1.updateAccountInfo()).toBeDefined();
   });

   it("Should return success when record is updated", function() {
      expect(user1.updateAccountInfo("Victor", "pass01")).toMatch(
         "SUCCESS: Record Updated"
      );
   });
});

describe("ADMIN CAN GET ALL ORDERS AND DELETE ONE", function() {
   it("Should return all orders", function() {
      expect(admin1.getAllFoodOrder.length).toBeGreaterThan(0);
   });

   it("Should delete one order", function() {
      expect(admin1.deleteOneFoodOrder(2)).toMatch(
         "SUCCESS: Food Item Deleted"
      );
      expect(admin1.deleteOneFoodOrder(21)).toMatch(
         "INFO: Food Item not found"
      );
   });
});

describe("USER CAN UPDATE ORDER", function() {
   it("Should update order", function() {
      expect(user1.updateFoodOrder("yam", 1)).toMatch("INFO: No such meal");
      expect(user1.updateFoodOrder("rice", "")).toMatch(
         "SUCCESS: Record Updated"
      );
      expect(user1.updateFoodOrder("rice", 3)).toMatch(
         "SUCCESS: Record Updated"
      );
      expect(user2.updateFoodOrder("yoghurt", 19)).toMatch("not enough meal");
   });
});

describe("ADMIN CAN DELETE ONE AND ALL USERS", function() {
   it("Should return all orders", function() {
      expect(admin1.deleteOneUser(2)).toMatch("SUCCESS: User was deleted");
      expect(admin1.deleteOneUser()).toMatch("INFO: No such user");
      expect(admin1.deleteAllUsers).toMatch("SUCCESS: All Users was deleted");
   });
});

describe("ADMIN CAN DELETE ALL FOOD ITEMS", function() {
   it("Should delete all foodItems", function() {
      expect(admin1.deleteAllFoodItem).toMatch(
         "SUCCESS: All Food Items Deleted"
      );
   });
});
