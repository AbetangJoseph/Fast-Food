const DB = require("./db");

// Food ID
let foodId = 0;

function Food(foodName, category, price, quantity) {
   foodId++;
   this.foodId = foodId;
   this.foodName = foodName;
   this.category = category;
   this.price = price;
   this.quantity = quantity;

   food_payload = {
      id: this.foodId,
      foodName: this.foodName,
      category: this.category,
      price: this.price,
      quantity: this.quantity,
      isDeleted: false
   };

   DB.FOOD.foodStore.push(food_payload);
   return "SUCCESS: Food Added";
}

// Adding Methods to Food prototype
Food.prototype.createFoodItem = function(foodName, category, price, quantity) {
   return new Food(foodName, category, price, quantity);
};

Food.prototype.updateFoodItem = function(
   foodId,
   foodName,
   category,
   price,
   quantity
) {
   DB.FOOD.foodStore.find(food => {
      if (food.id === foodId) {
         food.foodName = foodName || food.foodName;
         food.category = category || food.category;
         food.price = price || food.price;
         food.quantity = quantity || food.quantity;
      }
   });
   return "SUCCESS: Food Updated";
};

Food.prototype.deleteOneFoodItem = function(foodId) {
   DB.FOOD.foodStore.find(food => {
      if (food.id === foodId) {
         food.isDeleted = true;
      }
   });
   return "SUCCESS: Food Item Deleted";
};

Food.prototype.deleteAllFoodItem = function() {
   DB.FOOD.foodStore.map(food => (food.isDeleted = true));
   return "SUCCESS: All Food Items Deleted";
};

module.exports = Food;
