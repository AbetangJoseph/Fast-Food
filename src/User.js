const DB = require("./db");
const Order = require("./Order");

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
User.prototype.saveAccount = function() {
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
};

User.prototype.placeOrder = function(foodName, quantity) {
   return Order.prototype.placeOrder(foodName, quantity, this.userId);
};

User.prototype.updateAccountInfo = function(
   name,
   password,
   email,
   phone,
   address
) {
   let user = DB.USERS.find(user => user.id === this.userId);

   user.name = name || user.name;
   user.password = password || user.password;
   user.email = email || user.email;
   user.phone = phone || user.phone;
   user.address = address || user.address;

   return "SUCCESS: Record Updated";
};

module.exports = User;
