# Facade Design Pattern - Restaurant Example

This project demonstrates the **Facade Design Pattern** using a real-world example of a restaurant. The pattern simplifies interactions with a complex system (like a restaurant's kitchen) by providing a unified interface (the facade) to the client.

---

## Table of Contents

1. [What is the Facade Design Pattern?](#what-is-the-facade-design-pattern)
2. [Project Structure](#project-structure)
3. [Code Explanation](#code-explanation)
4. [Usage Example](#usage-example)
5. [How to Run](#how-to-run)

---

## What is the Facade Design Pattern?

The **Facade Design Pattern** is a **structural design pattern** that provides a simplified interface to a complex system. It hides the complexity of the system and makes it easier for clients to interact with it.

### Real-World Analogy

Think of a restaurant:

-   The **customer** (client) interacts with the **waiter** (facade).
-   The **waiter** handles all interactions with the **kitchen** (complex system).
-   The customer doesn't need to know how the kitchen works; they just place an order and receive their food.

---

## Project Structure

The project consists of the following classes:

1. **`Order`**: Represents an order placed by a customer.
2. **`RestaurantFacade`**: Acts as the facade, simplifying interactions between the customer and the restaurant system.
3. **`Waiter`**: Handles order management and communication with the kitchen.
4. **`Kitchen`**: Represents the complex subsystem that prepares the orders.

---

## Code Explanation

### 1. `Order` Class

Represents an order with properties like `id`, `name`, `category`, `isVegan`, `price`, and `isReady`.

```javascript
/**
 * Represents an order placed by a customer.
 * @class
 */
class Order {
	/**
	 * @param {Object} order - The order details.
	 * @param {string} order.id - The unique ID of the order.
	 * @param {string} order.name - The name of the order.
	 * @param {string} order.category - The category of the order (e.g., Main Course).
	 * @param {boolean} order.isVegan - Whether the order is vegan.
	 * @param {number} order.price - The price of the order.
	 */
	constructor(order) {
		this.id = order.id;
		this.name = order.name;
		this.category = order.category;
		this.isVegan = order.isVegan;
		this.price = order.price;
		this.isReady = false; // Default value for new orders
	}
}
```

---

### 2. `RestaurantFacade` Class

Acts as the facade, providing a simplified interface for the customer to interact with the restaurant system.

```javascript
/**
 * Represents the facade for the restaurant system.
 * @class
 */
class RestaurantFacade {
	/**
	 * Initializes the facade with a waiter and a kitchen.
	 * @constructor
	 */
	constructor() {
		this.kitchen = new Kitchen();
		this.waiter = new Waiter();
	}

	/**
	 * Takes an order from the customer and initiates the preparation process.
	 * @param {Object} orderData - The order details.
	 */
	takeOrder(orderData) {
		const order = new Order(orderData);
		this.waiter.takeOrder(order);
		this.kitchen.prepareOrder(order, (readyOrder) => {
			this.waiter.receivePreparedOrder(readyOrder);
		});
	}

	/**
	 * Serves the prepared order to the customer.
	 * @param {string} orderId - The ID of the order to serve.
	 * @returns {Order | null} - The served order or null if not found.
	 */
	serveOrder(orderId) {
		return this.waiter.serveOrder(orderId);
	}
}
```

---

### 3. `Waiter` Class

Manages orders and communicates with the kitchen.

```javascript
/**
 * Represents the waiter who manages orders and communicates with the kitchen.
 * @class
 */
class Waiter {
	/**
	 * Initializes the waiter with an empty list of orders.
	 * @constructor
	 */
	constructor() {
		this.orders = [];
	}

	/**
	 * Takes an order from the customer and adds it to the list.
	 * @param {Order} order - The order to take.
	 */
	takeOrder(order) {
		this.orders.push(order);
		console.log(`Order received: ${order.name}`);
	}

	/**
	 * Marks an order as ready to serve.
	 * @param {Order} order - The prepared order.
	 */
	receivePreparedOrder(order) {
		const existingOrder = this.orders.find((o) => o.id === order.id);
		if (existingOrder) {
			existingOrder.isReady = true;
			console.log(`Order is ready to serve: ${order.name}`);
		}
	}

	/**
	 * Serves an order to the customer.
	 * @param {string} orderId - The ID of the order to serve.
	 * @returns {Order | null} - The served order or null if not found.
	 */
	serveOrder(orderId) {
		const servedOrder = this.orders.find((o) => o.id === orderId);
		if (!servedOrder) {
			console.error(`Order with ID ${orderId} not found.`);
			return null;
		}
		this.orders = this.orders.filter((o) => o.id === orderId);
		console.log(`Serving order: ${servedOrder.name}`);
		return servedOrder;
	}
}
```

---

### 4. `Kitchen` Class

Represents the kitchen, which prepares the orders.

```javascript
/**
 * Represents the kitchen, which prepares the orders.
 * @class
 */
class Kitchen {
	/**
	 * Prepares an order and notifies the waiter when it's ready.
	 * @param {Order} order - The order to prepare.
	 * @param {Function} onOrderReady - Callback function to notify when the order is ready.
	 */
	prepareOrder(order, onOrderReady) {
		console.log(`Preparing order: ${order.name}`);
		onOrderReady(order);
		console.log(`Order prepared: ${order.name}`);
	}
}
```

---

## Usage Example

```javascript
// Create a restaurant facade
const restaurant = new RestaurantFacade();

// Take an order
restaurant.takeOrder({
	id: '1',
	name: 'Vegan Burger',
	category: 'Main Course',
	isVegan: true,
	price: 12.99,
});

// Serve the order after preparation
const servedOrder = restaurant.serveOrder('1');
console.log(`Served Order:`, servedOrder);
```
