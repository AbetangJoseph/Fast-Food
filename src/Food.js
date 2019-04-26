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
      quantity: this.quantity,
      isDeleted: false
   };

   DB.FOOD.foodStore.push(food_payload);
   return "SUCCESS: Food Added";
}

// Adding Methods to Food prototype
Food.prototype = {
   constructor: Food,

   createFoodItem: function(name, category, price, quantity) {
      return new Food(name, category, price, quantity);
   },

   updateFoodItem: function(
      foodToUpdate,
      newFoodName,
      category,
      price,
      quantity
   ) {
      DB.FOOD.foodStore.find(food => {
         if (food.name === foodToUpdate) {
            food.name = newFoodName || food.name;
            food.category = category || food.category;
            food.price = price || food.price;
            food.quantity = quantity || food.quantity;
         }
      });
      return "SUCCESS: Food Updated";
   },

   deleteFoodItem: function(foodId) {
      DB.FOOD.foodStore.find(food => {
         if (food.id === foodId) {
            food.isDeleted = true;
         }
      });
      return "SUCCESS: Food Item Deleted";
   }
};

module.exports = Food;
