# Adapter Design Pattern - Payment Gateway Example

## Table of Contents

1. [What is the Adapter Design Pattern?](#what-is-the-adapter-design-pattern)
2. [Project Structure](#project-structure)
3. [Code Explanation](#code-explanation)
4. [Usage Example](#usage-example)
5. [How to Run](#how-to-run)

---

## What is the Adapter Design Pattern?

The **Adapter Design Pattern** is a **structural design pattern** that allows two incompatible interfaces to work together. It acts as a bridge between two interfaces, converting the interface of one class into another that the client expects.

### Real-World Analogy

Think of a travel adapter:

-   You have a device with a specific plug (e.g., a US plug).
-   The socket in another country has a different interface (e.g., a European socket).
-   A **travel adapter** acts as a bridge, allowing your device to work with the foreign socket.

In software, the adapter pattern is used to make two incompatible interfaces work together.

---

## Project Structure

The project consists of the following classes:

1. **`PaymentGateway`**: Represents the target interface that the client expects.
2. **`StripeGateway`**: Represents an existing payment gateway with an incompatible interface.
3. **`StripeAdapter`**: Adapts the `StripeGateway` to the `PaymentGateway` interface.
4. **`PayPalGateway`**: Represents another existing payment gateway with an incompatible interface.
5. **`PayPalAdapter`**: Adapts the `PayPalGateway` to the `PaymentGateway` interface.

---

## Code Explanation

### 1. `PaymentGateway` Class

Represents the target interface that the client expects.

```javascript
/**
 * Represents the target interface for payment processing.
 * @class
 */
class PaymentGateway {
	/**
	 * Processes a payment.
	 * @param {number} amount - The amount to be paid.
	 * @returns {string} - A confirmation message.
	 */
	processPayment(amount) {
		throw new Error("Method 'processPayment()' must be implemented.");
	}
}
```

---

### 2. `StripeGateway` Class

Represents an existing payment gateway with an incompatible interface.

```javascript
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
	makePayment(amount) {
		return `Payment of $${amount} processed via Stripe.`;
	}
}
```

---

### 3. `StripeAdapter` Class

Adapts the `StripeGateway` to the `PaymentGateway` interface.

```javascript
/**
 * Adapts the StripeGateway to the PaymentGateway interface.
 * @class
 */
class StripeAdapter extends PaymentGateway {
	/**
	 * Initializes the adapter with a StripeGateway instance.
	 * @constructor
	 */
	constructor() {
		super();
		this.stripeGateway = new StripeGateway();
	}

	/**
	 * Processes a payment using the StripeGateway.
	 * @param {number} amount - The amount to be paid.
	 * @returns {string} - A confirmation message.
	 */
	processPayment(amount) {
		return this.stripeGateway.makePayment(amount);
	}
}
```

---

### 4. `PayPalGateway` Class

Represents another existing payment gateway with an incompatible interface.

```javascript
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
	sendPayment(amount) {
		return `Payment of $${amount} processed via PayPal.`;
	}
}
```

---

### 5. `PayPalAdapter` Class

Adapts the `PayPalGateway` to the `PaymentGateway` interface.

```javascript
/**
 * Adapts the PayPalGateway to the PaymentGateway interface.
 * @class
 */
class PayPalAdapter extends PaymentGateway {
	/**
	 * Initializes the adapter with a PayPalGateway instance.
	 * @constructor
	 */
	constructor() {
		super();
		this.payPalGateway = new PayPalGateway();
	}

	/**
	 * Processes a payment using the PayPalGateway.
	 * @param {number} amount - The amount to be paid.
	 * @returns {string} - A confirmation message.
	 */
	processPayment(amount) {
		return this.payPalGateway.sendPayment(amount);
	}
}
```

---

## Usage Example

```javascript
// Create instances of the adapters
const stripeAdapter = new StripeAdapter();
const payPalAdapter = new PayPalAdapter();

// Process payments using the adapters
console.log(stripeAdapter.processPayment(100)); // Output: Payment of $100 processed via Stripe.
console.log(payPalAdapter.processPayment(200)); // Output: Payment of $200 processed via PayPal.
```

---

## How to Run

1. Clone the repository.
2. Install Node.js (if not already installed).
3. Run the script using Node.js:
    ```bash
    node adapter-payment-gateway.js
    ```

---

## Key Takeaways

-   The **Adapter Design Pattern** allows incompatible interfaces to work together.
-   The `StripeAdapter` and `PayPalAdapter` classes act as bridges between the `PaymentGateway` interface and the `StripeGateway`/`PayPalGateway` implementations.
-   This pattern is useful when integrating third-party libraries or legacy code into a new system.
