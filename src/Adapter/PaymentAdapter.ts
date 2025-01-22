/**
 * Represents the target interface for payment processing.
 * @interface
 */
interface PaymentGateway {
	/**
	 * Processes a payment.
	 * @param {number} amount - The amount to be paid.
	 * @returns {string} - A confirmation message.
	 */
	processPayment(amount: number): string;
}

/**
 * Represents the Stripe payment gateway with an incompatible interface.
 * @class
 */
class StripeGateway {
	/**
	 * Makes a payment using Stripe.
	 * @param {number} amount - The amount to be paid.
	 * @returns {string} - A confirmation message.
	 */
	makePayment(amount: number): string {
		return `Payment of $${amount} processed via Stripe.`;
	}
}

/**
 * Adapts the StripeGateway to the PaymentGateway interface.
 * @class
 */
class StripeAdapter implements PaymentGateway {
	private stripeGateway: StripeGateway;

	/**
	 * Initializes the adapter with a StripeGateway instance.
	 * @constructor
	 */
	constructor() {
		this.stripeGateway = new StripeGateway();
	}

	/**
	 * Processes a payment using the StripeGateway.
	 * @param {number} amount - The amount to be paid.
	 * @returns {string} - A confirmation message.
	 */
	processPayment(amount: number): string {
		return this.stripeGateway.makePayment(amount);
	}
}

/**
 * Represents the PayPal payment gateway with an incompatible interface.
 * @class
 */
class PayPalGateway {
	/**
	 * Sends a payment using PayPal.
	 * @param {number} amount - The amount to be paid.
	 * @returns {string} - A confirmation message.
	 */
	sendPayment(amount: number): string {
		return `Payment of $${amount} processed via PayPal.`;
	}
}

/**
 * Adapts the PayPalGateway to the PaymentGateway interface.
 * @class
 */
class PayPalAdapter implements PaymentGateway {
	private payPalGateway: PayPalGateway;

	/**
	 * Initializes the adapter with a PayPalGateway instance.
	 * @constructor
	 */
	constructor() {
		this.payPalGateway = new PayPalGateway();
	}

	/**
	 * Processes a payment using the PayPalGateway.
	 * @param {number} amount - The amount to be paid.
	 * @returns {string} - A confirmation message.
	 */
	processPayment(amount: number): string {
		return this.payPalGateway.sendPayment(amount);
	}
}

// Create instances of the adapters
const stripeAdapter: PaymentGateway = new StripeAdapter();
const payPalAdapter: PaymentGateway = new PayPalAdapter();

// Process payments using the adapters
console.log(stripeAdapter.processPayment(100)); // Output: Payment of $100 processed via Stripe.
console.log(payPalAdapter.processPayment(200)); // Output: Payment of $200 processed via PayPal.
