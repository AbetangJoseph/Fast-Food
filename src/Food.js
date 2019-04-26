const DB = require("./db");

// Food ID
let foodId = 0;

function Food(name, category, price, quantity) {
   foodId++;
   this.foodId = foodId;
   this.name = name;
   this.category = category;
   this.price = price;
   this.quantity = quantity;

   food_payload = {
      id: this.foodId,
      name: this.name,
      category: this.category,
      price: this.price,
      quantity: this.quantity
   };

   DB.FOOD.foodStore.push(food_payload);
   return "SUCCESS: Food Added";
}

// Adding Methods to Food prototype
Food.prototype = {
   constructor: Food,

   createFoodItem: function(name, category, price, quantity) {
      return new Food(name, category, price, quantity);
   }
};

module.exports = Food;
