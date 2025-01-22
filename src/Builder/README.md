# Builder Pattern Example: Custom Pizza Builder

This code demonstrates the **Builder Pattern** in TypeScript. The Builder Pattern is a creational design pattern that separates the construction of a complex object from its representation. It allows you to create objects step-by-step, providing flexibility and clarity in the construction process.

### Overview

The code defines a `Pizza` class and a `CustomPizzaBuilder` class that implements the `PizzaBuilder` interface. The `CustomPizzaBuilder` allows you to create a `Pizza` object by setting its size, crust type, and toppings in a fluent and readable manner.

### Key Components

1. **`PizzaBuilder` Interface**:

    - Defines methods for setting the size, crust type, and toppings of a pizza.
    - Includes a `reset` method to start a new pizza and a `build` method to finalize and return the pizza.

2. **`Pizza` Class**:

    - Represents the final pizza object with properties like size, crust type, and toppings.
    - Includes a `describe` method to provide a human-readable description of the pizza.

3. **`CustomPizzaBuilder` Class**:
    - Implements the `PizzaBuilder` interface.
    - Provides a fluent API for constructing a `Pizza` object step-by-step.

### Code Example

```typescript
const pizzaBuilder = new CustomPizzaBuilder();

const veggiePizza = pizzaBuilder
	.setSize('large')
	.setCrustType('thin')
	.addTopping('mushrooms')
	.addTopping('bell peppers')
	.addTopping('onions')
	.build();

console.log(veggiePizza.describe()); // Output: "large thin crust pizza with mushrooms, bell peppers, onions"
```

### How It Works

1. The `CustomPizzaBuilder` class maintains an instance of the `Pizza` class.
2. Methods like `setSize`, `setCrustType`, and `addTopping` are used to configure the pizza.
3. The `build` method finalizes the pizza and returns it, while resetting the builder for the next pizza.

### Benefits of Using the Builder Pattern

-   **Flexibility**: Allows you to create objects with different configurations using the same construction process.
-   **Readability**: Provides a fluent API that makes the code more readable and intuitive.
-   **Separation of Concerns**: Separates the construction logic from the representation of the object.
-   **Reusability**: The builder can be reused to create multiple objects with similar configurations.

### When to Use the Builder Pattern

-   When the construction of an object involves many steps or parameters.
-   When you want to create different representations of the same object.
-   When you need to ensure that the object is immutable once constructed.

---

## Refactored Code with JSDoc

Here’s the refactored version of your code with JSDoc comments:

```typescript
/**
 * Interface for the PizzaBuilder.
 * Defines methods for constructing a Pizza object step-by-step.
 */
interface PizzaBuilder {
	/**
	 * Resets the builder to start creating a new pizza.
	 */
	reset(): void;

	/**
	 * Sets the size of the pizza.
	 * @param {string} size - The size of the pizza (e.g., 'small', 'medium', 'large').
	 * @returns {PizzaBuilder} - The builder instance for method chaining.
	 */
	setSize(size: string): PizzaBuilder;

	/**
	 * Sets the crust type of the pizza.
	 * @param {string} type - The type of crust (e.g., 'thin', 'thick', 'stuffed').
	 * @returns {PizzaBuilder} - The builder instance for method chaining.
	 */
	setCrustType(type: string): PizzaBuilder;

	/**
	 * Adds a topping to the pizza.
	 * @param {string} topping - The topping to add (e.g., 'mushrooms', 'pepperoni').
	 * @returns {PizzaBuilder} - The builder instance for method chaining.
	 */
	addTopping(topping: string): PizzaBuilder;

	/**
	 * Builds and returns the final Pizza object.
	 * @returns {Pizza} - The constructed Pizza object.
	 */
	build(): Pizza;
}

/**
 * Represents a Pizza object with size, crust type, and toppings.
 */
class Pizza {
	private toppings: string[] = [];
	private size: string = '';
	private crustType: string = '';

	/**
	 * Sets the size of the pizza.
	 * @param {string} size - The size of the pizza.
	 */
	public setSize(size: string): void {
		this.size = size;
	}

	/**
	 * Sets the crust type of the pizza.
	 * @param {string} type - The type of crust.
	 */
	public setCrustType(type: string): void {
		this.crustType = type;
	}

	/**
	 * Adds a topping to the pizza.
	 * @param {string} topping - The topping to add.
	 */
	public addTopping(topping: string): void {
		this.toppings.push(topping);
	}

	/**
	 * Provides a human-readable description of the pizza.
	 * @returns {string} - A description of the pizza.
	 */
	public describe(): string {
		return `${this.size} ${
			this.crustType
		} crust pizza with ${this.toppings.join(', ')}`;
	}
}

/**
 * Builder class for creating custom Pizza objects.
 */
class CustomPizzaBuilder implements PizzaBuilder {
	private pizza: Pizza;

	/**
	 * Initializes a new instance of CustomPizzaBuilder.
	 */
	constructor() {
		this.pizza = new Pizza();
	}

	/**
	 * Resets the builder to start creating a new pizza.
	 */
	public reset(): void {
		this.pizza = new Pizza();
	}

	/**
	 * Sets the size of the pizza.
	 * @param {string} size - The size of the pizza.
	 * @returns {PizzaBuilder} - The builder instance for method chaining.
	 */
	public setSize(size: string): PizzaBuilder {
		this.pizza.setSize(size);
		return this;
	}

	/**
	 * Sets the crust type of the pizza.
	 * @param {string} type - The type of crust.
	 * @returns {PizzaBuilder} - The builder instance for method chaining.
	 */
	public setCrustType(type: string): PizzaBuilder {
		this.pizza.setCrustType(type);
		return this;
	}

	/**
	 * Adds a topping to the pizza.
	 * @param {string} topping - The topping to add.
	 * @returns {PizzaBuilder} - The builder instance for method chaining.
	 */
	public addTopping(topping: string): PizzaBuilder {
		this.pizza.addTopping(topping);
		return this;
	}

	/**
	 * Builds and returns the final Pizza object.
	 * @returns {Pizza} - The constructed Pizza object.
	 */
	public build(): Pizza {
		const result = this.pizza;
		this.reset();
		return result;
	}
}

// Example usage
const pizzaBuilder = new CustomPizzaBuilder();

const veggiePizza = pizzaBuilder
	.setSize('large')
	.setCrustType('thin')
	.addTopping('mushrooms')
	.addTopping('bell peppers')
	.addTopping('onions')
	.build();

console.log(veggiePizza.describe()); // Output: "large thin crust pizza with mushrooms, bell peppers, onions"
```

---

### Key Refactorings

1. **JSDoc Comments**:

    - Added detailed JSDoc comments for all classes, methods, and parameters.
    - This improves code readability and provides better IDE support for autocompletion and type checking.

2. **Fluent API**:

    - The `CustomPizzaBuilder` methods return `this`, enabling method chaining for a more readable and intuitive API.

3. **Immutability**:
    - The `build` method returns a fully constructed `Pizza` object and resets the builder, ensuring immutability of the final object.

---

### Why Use the Builder Pattern?

1. **Complex Object Creation**:

    - When an object requires multiple steps or configurations to be created, the Builder Pattern simplifies the process.

2. **Readability**:

    - The fluent API makes the code more readable and self-explanatory.

3. **Flexibility**:

    - You can create different representations of the same object without changing the construction logic.

4. **Separation of Concerns**:
    - The construction logic is separated from the object's representation, making the code easier to maintain and extend.

---

This should give you a clear understanding of the Builder Pattern and how it’s implemented in your code. Let me know if you need further assistance!
