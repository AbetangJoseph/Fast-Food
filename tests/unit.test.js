const User = require("../src/User");

describe("CREATE NEW USER", function() {
   it("Should return a value when called", function() {
      const joe = new User(
         "Joseph",
         "pass1",
         "joe@gmail",
         "08312929393",
         "Lekki"
      );

      expect(joe.saveAccount()).toBeDefined();
   });

   it("Should create and save users account to DB", function() {
      const joe = new User(
         "Joseph",
         "pass1",
         "joe@gmail",
         "08312929393",
         "Lekki"
      );

      expect(joe.saveAccount()).toMatch("SUCCESS: Account Saved");
   });
});
