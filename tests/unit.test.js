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
