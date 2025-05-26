# SOLID Principles in TypeScript

SOLID is an acronym representing five design principles that promote scalable, maintainable, and robust object-oriented software design. This document explains each principle with practical TypeScript examples.

## 1. Single Responsibility Principle (SRP)

A class should have only one reason to change, meaning it should have a single responsibility.

### Example: Separating User Management and Email Sending

Instead of having a class handle both user data and email notifications, we split the responsibilities.

```typescript
// Bad: Single class handling multiple responsibilities
class UserManager {
	createUser(name: string, email: string) {
		// Save user to database
		console.log(`Saving user ${name} with email ${email}`);
		// Send welcome email
		console.log(`Sending welcome email to ${email}`);
	}
}

// Good: Separate responsibilities
class UserService {
	createUser(name: string, email: string) {
		// Only handles user creation
		console.log(`Saving user ${name} with email ${email}`);
	}
}

class EmailService {
	sendWelcomeEmail(email: string) {
		// Only handles email sending
		console.log(`Sending welcome email to ${email}`);
	}
}

// Usage
const userService = new UserService();
const emailService = new EmailService();
userService.createUser('John Doe', 'john@example.com');
emailService.sendWelcomeEmail('john@example.com');
```

### Why It Matters

SRP reduces class complexity, improves readability, and makes maintenance easier by ensuring each class has a focused purpose.

## 2. Open/Closed Principle (OCP)

Software entities should be open for extension but closed for modification.

### Example: Payment Processing System

Instead of modifying a payment processor to add new payment methods, extend it through polymorphism.

```typescript
// Bad: Modifying class for new payment methods
class PaymentProcessor {
	processPayment(method: string, amount: number) {
		if (method === 'credit') {
			console.log(`Processing credit payment of ${amount}`);
		} else if (method === 'paypal') {
			console.log(`Processing PayPal payment of ${amount}`);
		}
		// Adding new methods requires modifying this class
	}
}

// Good: Open for extension, closed for modification
interface PaymentMethod {
	process(amount: number): void;
}

class CreditCardPayment implements PaymentMethod {
	process(amount: number) {
		console.log(`Processing credit card payment of ${amount}`);
	}
}

class PayPalPayment implements PaymentMethod {
	process(amount: number) {
		console.log(`Processing PayPal payment of ${amount}`);
	}
}

class PaymentProcessor {
	constructor(private paymentMethod: PaymentMethod) {}

	processPayment(amount: number) {
		this.paymentMethod.process(amount);
	}
}

// Usage
const creditPayment = new PaymentProcessor(new CreditCardPayment());
creditPayment.processPayment(100);

const paypalPayment = new PaymentProcessor(new PayPalPayment());
paypalPayment.processPayment(50);
```

### Why It Matters

OCP allows adding new functionality (e.g., new payment methods) without altering existing code, reducing the risk of introducing bugs.

## 3. Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types without altering the program's correctness.

### Example: Shape Hierarchy

Subclasses of a base `Shape` class should work seamlessly when used in place of the base class.

```typescript
// Bad: Square breaking LSP by modifying Rectangle behavior
class Rectangle {
	constructor(protected width: number, protected height: number) {}

	setWidth(width: number) {
		this.width = width;
	}
	setHeight(height: number) {
		this.height = height;
	}
	getArea(): number {
		return this.width * this.height;
	}
}

class Square extends Rectangle {
	constructor(side: number) {
		super(side, side);
	}

	// Breaks LSP: Changing width changes height to maintain square
	setWidth(width: number) {
		this.width = width;
		this.height = width;
	}

	setHeight(height: number) {
		this.width = height;
		this.height = height;
	}
}

// Good: Proper abstraction
interface Shape {
	getArea(): number;
}

class RectangleShape implements Shape {
	constructor(private width: number, private height: number) {}

	getArea(): number {
		return this.width * this.height;
	}
}

class SquareShape implements Shape {
	constructor(private side: number) {}

	getArea(): number {
		return this.side * this.side;
	}
}

// Usage
function printArea(shape: Shape) {
	console.log(`Area: ${shape.getArea()}`);
}

const rectangle = new RectangleShape(5, 10);
const square = new SquareShape(5);
printArea(rectangle); // Area: 50
printArea(square); // Area: 25
```

### Why It Matters

LSP ensures that subclasses can replace their base classes without unexpected behavior, maintaining program reliability.

## 4. Interface Segregation Principle (ISP)

Clients should not be forced to depend on interfaces they do not use.

### Example: Worker Interfaces

Instead of a large interface, split it into smaller, specific interfaces.

```typescript
// Bad: Large interface forcing unnecessary implementations
interface прожWorker {
	work(): void;
	eat(): void;
	sleep(): void;
}

class HumanWorker implements Worker {
	work() {
		console.log('Human working');
	}
	eat() {
		console.log('Human eating');
	}
	sleep() {
		console.log('Human sleeping');
	}
}

class RobotWorker implements Worker {
	work() {
		console.log('Robot working');
	}
	// Robot doesn't need these, but forced to implement
	eat() {
		throw new Error("Robots don't eat");
	}
	sleep() {
		throw new Error("Robots don't sleep");
	}
}

// Good: Segregated interfaces
interface Workable {
	work(): void;
}

interface Eatable {
	eat(): void;
}

interface Sleepable {
	sleep(): void;
}

class HumanWorker implements Workable, Eatable, Sleepable {
	work() {
		console.log('Human working');
	}
	eat() {
		console.log('Human eating');
	}
	sleep() {
		console.log('Human sleeping');
	}
}

class RobotWorker implements Workable {
	work() {
		console.log('Robot working');
	}
}

// Usage
const human = new HumanWorker();
const robot = new RobotWorker();
human.work();
human.eat();
robot.work();
```

### Why It Matters

ISP prevents classes from being forced to implement irrelevant methods, reducing complexity and improving maintainability.

## 5. Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

### Example: Logging System

Instead of a high-level module depending on a concrete logger, depend on an abstraction.

```typescript
// Bad: High-level module depends on concrete class
class FileLogger {
	log(message: string) {
		console.log(`Logging to file: ${message}`);
	}
}

class App {
	private logger: FileLogger;

	constructor() {
		this.logger = new FileLogger(); // Tight coupling
	}

	performAction() {
		this.logger.log('Action performed');
	}
}

// Good: Depend on abstraction
interface Logger {
	log(message: string): void;
}

class FileLogger implements Logger {
	log(message: string) {
		console.log(`Logging to file: ${message}`);
	}
}

class ConsoleLogger implements Logger {
	log(message: string) {
		console.log(`Logging to console: ${message}`);
	}
}

class App {
	constructor(private logger: Logger) {} // Dependency injection

	performAction() {
		this.logger.log('Action performed');
	}
}

// Usage
const fileLogger = new FileLogger();
const consoleLogger = new ConsoleLogger();
const appWithFile = new App(fileLogger);
const appWithConsole = new App(consoleLogger);
appWithFile.performAction();
appWithConsole.performAction();
```

### Why It Matters

DIP reduces coupling, making systems more flexible and easier to test by allowing dependencies to be swapped via abstractions.

## Conclusion

Applying SOLID principles in TypeScript leads to cleaner, more maintainable, and scalable code. Each principle addresses specific design challenges:

-   **SRP**: Ensures focused classes.
-   **OCP**: Allows extension without modification.
-   **LSP**: Guarantees substitutability of subclasses.
-   **ISP**: Avoids unnecessary dependencies.
-   **DIP**: Promotes loose coupling through abstractions.

By adhering to these principles, developers can build robust TypeScript applications that are easier to extend and maintain.
