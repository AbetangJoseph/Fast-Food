const DB = require("./db");

// User ID
let userId = 0;

// User Constructor
function User(name, password, email, phone, address) {
   userId++;
   this.userId = userId;
   this.name = name;
   this.password = password;
   this.email = email;
   this.phone = phone;
   this.address = address;
   this.isDeleted = false;
   this.isAdmin = false;
}

// Adding Methods to User prototype
User.prototype = {
   constructor: User,

   saveAccount: function() {
      user_payload = {
         id: this.userId,
         name: this.name,
         password: this.password,
         email: this.email,
         phone: this.phone,
         address: this.address,
         isDeleted: this.isDeleted,
         isAdmin: this.isAdmin
      };

      DB["USERS"].push(user_payload);
      return "SUCCESS: Account Saved";
   }
};

module.exports = User;
