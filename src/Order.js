const DB = require("./db");

let date = new Date();

let order_id = 0;

function Order(foodName, quantity, user_id) {
   order_id++;
   var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
   ];
   this.order_id = order_id;
   this.foodName = foodName;
   this.quantity = quantity;
   this.user_id = user_id;
   this.timeOfOrder = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
   });
   this.dateOfOrder = `${date.getDate()}-${
      months[date.getMonth()]
   }-${date.getUTCFullYear()}`;
   this.isDeleted = false;

   order_payload = {
      order_id: this.order_id,
      user_id: this.user_id,
      timeOfOrder: this.timeOfOrder,
      dateOfOrder: this.dateOfOrder,
      foodName: this.foodName,
      quantity: this.quantity,
      isDeleted: this.isDeleted
   };

   DB.FOOD.orders.push(order_payload);
}

Order.prototype.placeOrder = function(foodName, quantity, user_id) {
   const isAvailable = DB.FOOD.foodStore.find(
      food => food.foodName === foodName
   );
   if (!isAvailable) return "no such meal";
   if (isAvailable.quantity >= quantity) {
      isAvailable.quantity -= quantity;
      new Order(foodName, quantity, user_id);
      return "SUCCESS: Order was successful";
   } else return "not enough meal";
};

Order.prototype.getAllFoodOrder = function() {
   return DB.FOOD.orders.filter(food => food.isDeleted === false);
};

Order.prototype.deleteOneFoodOrder = function(order_id) {
   DB.FOOD.orders.find(food => {
      if (food.order_id === order_id) {
         food.isDeleted = true;
      }
   });
   return "SUCCESS: Food Item Deleted";
};

Order.prototype.updateFoodOrder = function(foodName, quantity, user_id) {
   const isAvailable = DB.FOOD.foodStore.find(
      food => food.foodName === foodName && food.isDeleted === false
   );
   if (!isAvailable) return "INFO: No such meal";

   let order = DB.FOOD.orders.find(
      order =>
         order.user_id === user_id &&
         order.foodName === foodName &&
         order.isDeleted === false
   );

   isAvailable.quantity += order.quantity;

   if (isAvailable.quantity >= quantity) {
      isAvailable.quantity -= quantity;
      let order = DB.FOOD.orders.find(
         order =>
            order.user_id === user_id &&
            order.foodName === foodName &&
            order.isDeleted === false
      );

      order.foodName = foodName || order.foodName;
      order.quantity = quantity || order.quantity;
      return "SUCCESS: Record Updated";
   } else {
      return "not enough meal";
   }
};

module.exports = Order;
