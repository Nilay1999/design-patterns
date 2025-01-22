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
