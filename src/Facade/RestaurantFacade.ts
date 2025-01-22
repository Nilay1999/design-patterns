class Order {
	id: string;
	name: string;
	category: string;
	isVegan: boolean;
	price: number;
	isReady: boolean;

	constructor(order: Omit<Order, 'isReady'>) {
		this.id = order.id;
		this.name = order.name;
		this.category = order.category;
		this.isVegan = order.isVegan;
		this.price = order.price;
		this.isReady = false; // Default value for new orders
	}
}

class RestaurantFacade {
	private waiter: Waiter;
	private kitchen: Kitchen;

	constructor() {
		this.kitchen = new Kitchen();
		this.waiter = new Waiter();
	}

	takeOrder(orderData: Omit<Order, 'isReady'>): void {
		const order = new Order(orderData);
		this.waiter.takeOrder(order);
		this.kitchen.prepareOrder(order, (readyOrder) => {
			this.waiter.receivePreparedOrder(readyOrder);
		});
	}

	serveOrder(orderId: string): Order | null {
		return this.waiter.serveOrder(orderId);
	}
}

class Waiter {
	private orders: Order[];

	constructor() {
		this.orders = [];
	}

	takeOrder(order: Order): void {
		this.orders.push(order);
		console.log(`Order received: ${order.name}`);
	}

	receivePreparedOrder(order: Order): void {
		const existingOrder = this.orders.find((o) => o.id === order.id);
		if (existingOrder) {
			existingOrder.isReady = true;
			console.log(`Order is ready to serve: ${order.name}`);
		}
	}

	serveOrder(orderId: string): Order | null {
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

class Kitchen {
	prepareOrder(order: Order, onOrderReady: (order: Order) => void): void {
		console.log(`Preparing order: ${order.name}`);
		onOrderReady(order);
		console.log(`Order prepared: ${order.name}`);
	}
}

// Usage Example
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
