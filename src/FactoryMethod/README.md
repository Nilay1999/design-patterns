### Factory Pattern Explanation and Code Documentation

#### What is the Factory Pattern?

The Factory Pattern is a **creational design pattern** that provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created. It is particularly useful when:

1. The exact type of objects to be created is not known until runtime.
2. The creation logic is complex or involves multiple steps.
3. You want to decouple the client code from the concrete implementations of the objects.

#### Real-World Use Cases

1. **Notification Systems**: As shown in the code, a factory can create different types of notifications (email, SMS, push) based on the input.
2. **Database Connections**: A factory can create different types of database connections (MySQL, PostgreSQL, MongoDB) based on configuration.
3. **UI Components**: A factory can create different UI components (buttons, modals, dropdowns) based on the platform or user preferences.
4. **Payment Gateways**: A factory can create different payment gateway instances (PayPal, Stripe, Credit Card) based on the user's choice.

---

### Code Documentation with JSDoc

Here’s the refactored code with **JSDoc** comments to explain each component:

```typescript
/**
 * Interface for notification objects.
 * All notification types must implement this interface.
 */
interface INotification {
	/**
	 * Sends a message using the notification.
	 * @param {string} message - The message to be sent.
	 */
	send(message: string): void;
}

/**
 * Email notification implementation.
 */
class EmailNotification implements INotification {
	private email: string;

	/**
	 * Creates an instance of EmailNotification.
	 * @param {string} email - The recipient's email address.
	 */
	constructor(email: string) {
		this.email = email;
	}

	/**
	 * Sends an email notification.
	 * @param {string} message - The message to be sent.
	 */
	public send(message: string): void {
		console.log(`Sending email to ${this.email}: ${message}`);
	}
}

/**
 * SMS notification implementation.
 */
class SMSNotification implements INotification {
	private phone: string;

	/**
	 * Creates an instance of SMSNotification.
	 * @param {string} phone - The recipient's phone number.
	 */
	constructor(phone: string) {
		this.phone = phone;
	}

	/**
	 * Sends an SMS notification.
	 * @param {string} message - The message to be sent.
	 */
	public send(message: string): void {
		console.log(`Sending SMS to ${this.phone}: ${message}`);
	}
}

/**
 * Push notification implementation.
 */
class PushNotification implements INotification {
	private deviceToken: string;

	/**
	 * Creates an instance of PushNotification.
	 * @param {string} deviceToken - The recipient's device token.
	 */
	constructor(deviceToken: string) {
		this.deviceToken = deviceToken;
	}

	/**
	 * Sends a push notification.
	 * @param {string} message - The message to be sent.
	 */
	public send(message: string): void {
		console.log(
			`Sending push notification to device ${this.deviceToken}: ${message}`
		);
	}
}

/**
 * Factory class for creating notification instances.
 */
class NotificationFactory {
	/**
	 * Creates a notification instance based on the type and recipient.
	 * @param {string} type - The type of notification (email, sms, push).
	 * @param {string} recipient - The recipient's address (email, phone, device token).
	 * @returns {INotification} - A notification instance.
	 * @throws {Error} - If the notification type is invalid.
	 */
	public createNotification(type: string, recipient: string): INotification {
		switch (type.toLowerCase()) {
			case 'email':
				return new EmailNotification(recipient);
			case 'sms':
				return new SMSNotification(recipient);
			case 'push':
				return new PushNotification(recipient);
			default:
				throw new Error('Invalid notification type');
		}
	}
}

// Example usage
const notificationFactory = new NotificationFactory();

const emailNotification = notificationFactory.createNotification(
	'email',
	'user@example.com'
);
emailNotification.send('Your order has been confirmed');

const smsNotification = notificationFactory.createNotification(
	'sms',
	'+1234567890'
);
smsNotification.send('Your OTP is 1234');

const pushNotification = notificationFactory.createNotification(
	'push',
	'device_token_123'
);
pushNotification.send('New message received');
```

---

### README.md

````markdown
# Factory Pattern Example: Notification System

This project demonstrates the **Factory Pattern** in TypeScript by implementing a notification system. The factory creates different types of notifications (email, SMS, push) based on the input provided.

## Factory Pattern Overview

The Factory Pattern is a creational design pattern that provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created. It is useful when:

1. The exact type of objects to be created is not known until runtime.
2. The creation logic is complex or involves multiple steps.
3. You want to decouple the client code from the concrete implementations of the objects.

## Code Structure

-   **`INotification`**: Interface defining the `send` method for all notification types.
-   **`EmailNotification`**: Implements `INotification` for sending email notifications.
-   **`SMSNotification`**: Implements `INotification` for sending SMS notifications.
-   **`PushNotification`**: Implements `INotification` for sending push notifications.
-   **`NotificationFactory`**: Factory class that creates instances of the appropriate notification type based on the input.

## Example Usage

```typescript
const notificationFactory = new NotificationFactory();

const emailNotification = notificationFactory.createNotification(
	'email',
	'user@example.com'
);
emailNotification.send('Your order has been confirmed');

const smsNotification = notificationFactory.createNotification(
	'sms',
	'+1234567890'
);
smsNotification.send('Your OTP is 1234');

const pushNotification = notificationFactory.createNotification(
	'push',
	'device_token_123'
);
pushNotification.send('New message received');
```
````

## Real-World Use Cases

1. **Notification Systems**: Create different types of notifications dynamically.
2. **Database Connections**: Create different database connections based on configuration.
3. **UI Components**: Create different UI components based on the platform or user preferences.
4. **Payment Gateways**: Create different payment gateway instances based on the user's choice.
