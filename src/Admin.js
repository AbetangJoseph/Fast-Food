const User = require("./User");
const Food = require("./Food");
const Order = require("./Order");

function Admin(name, password, email, phone) {
   User.call(this, name, password, email, phone);
   this.isAdmin = true;
   this.address = null;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.createFoodItem = function(foodName, category, price, quantity) {
   return Food.prototype.createFoodItem(foodName, category, price, quantity);
};

Admin.prototype.updateFoodItem = function(
   foodId,
   foodName,
   category,
   price,
   quantity
) {
   return Food.prototype.updateFoodItem(
      foodId,
      foodName,
      category,
      price,
      quantity
   );
};

Admin.prototype.deleteOneFoodItem = function(foodId) {
   return Food.prototype.deleteOneFoodItem(foodId);
};

Object.defineProperty(Admin.prototype, "deleteAllFoodItem", {
   get: function() {
      return Food.prototype.deleteAllFoodItem();
   }
});

Object.defineProperty(Admin.prototype, "getAllFoodItem", {
   get: function() {
      return Food.prototype.getAllFoodItem();
   }
});

Admin.prototype.getOneFoodItem = function(foodName) {
   return Food.prototype.getOneFoodItem(foodName);
};

Object.defineProperty(Admin.prototype, "getAllFoodOrder", {
   get: function() {
      return Order.prototype.getAllFoodOrder();
   }
});

Admin.prototype.deleteOneFoodOrder = function(order_id) {
   return Order.prototype.deleteOneFoodOrder(order_id);
};

Admin.prototype.deleteOneUser = function(user_id) {
   let user = DB.USERS.find(
      user => user.id === user_id && user.isDeleted === false
   );

   if (!user) return "INFO: No such user";
   user.isDeleted = true;

   return "SUCCESS: User was deleted";
};

Object.defineProperty(Admin.prototype, "deleteAllUsers", {
   get: function() {
      DB.USERS.map(users =>
         users.isAdmin !== true ? (users.isDeleted = true) : users
      );
      return "SUCCESS: All Users was deleted"
   }
});

module.exports = Admin;
