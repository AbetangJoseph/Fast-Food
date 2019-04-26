const User = require("./User");
const Food = require("./Food");

function Admin(name, password, email, phone) {
   User.call(this, name, password, email, phone);
   this.isAdmin = true;
   this.address = null;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.createFoodItem = function(name, category, price, quantity) {
   return Food.prototype.createFoodItem(name, category, price, quantity);
};

Admin.prototype.updateFoodItem = function(
   foodToUpdate,
   newFoodName,
   category,
   price,
   quantity
) {
   return Food.prototype.updateFoodItem(
      foodToUpdate,
      newFoodName,
      category,
      price,
      quantity
   );
};

Admin.prototype.deleteFoodItem = function(foodId) {
   return Food.prototype.deleteFoodItem(foodId);
};

module.exports = Admin;
