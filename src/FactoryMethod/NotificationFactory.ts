/**
 * Interface for notification classes.
 * Ensures all notification types implement a `send` method.
 */
interface INotification {
	/**
	 * Sends a notification message.
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
	 * Creates a notification instance based on the type.
	 * @param {string} type - The type of notification ('email', 'sms', 'push').
	 * @param {string} recipient - The recipient's address (email, phone, or device token).
	 * @returns {INotification} - An instance of the corresponding notification class.
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
