interface Coffee {
	/**
	 * Returns the cost of the coffee.
	 * @returns {number} - The cost of the coffee.
	 */
	cost(): number;

	/**
	 * Returns the description of the coffee.
	 * @returns {string} - The description of the coffee.
	 */
	description(): string;
}

/**
 * Represents the base class for all coffee decorators.
 * @abstract
 * @class
 */
abstract class CoffeeDecorator implements Coffee {
	/**
	 * Initializes the decorator with a base coffee object.
	 * @constructor
	 * @param {Coffee} coffee - The base coffee object.
	 */
	constructor(protected coffee: Coffee) {}

	/**
	 * Returns the cost of the decorated coffee.
	 * @abstract
	 * @returns {number} - The cost of the decorated coffee.
	 */
	abstract cost(): number;

	/**
	 * Returns the description of the decorated coffee.
	 * @abstract
	 * @returns {string} - The description of the decorated coffee.
	 */
	abstract description(): string;
}

/**
 * Represents the base coffee without any decorations.
 * @class
 */
class SimpleCoffee implements Coffee {
	cost(): number {
		return 1;
	}

	description(): string {
		return 'Simple coffee';
	}
}

/**
 * Represents a decorator that adds milk to the coffee.
 * @class
 */
class MilkDecorator extends CoffeeDecorator {
	cost(): number {
		return this.coffee.cost() + 0.5;
	}

	description(): string {
		return this.coffee.description() + ', milk';
	}
}

class SugarDecorator extends CoffeeDecorator {
	cost(): number {
		return this.coffee.cost() + 0.2;
	}

	description(): string {
		return this.coffee.description() + ', sugar';
	}
}

class WhippedCreamDecorator extends CoffeeDecorator {
	cost(): number {
		return this.coffee.cost() + 0.7;
	}

	description(): string {
		return this.coffee.description() + ', whipped cream';
	}
}

class CaramelDecorator extends CoffeeDecorator {
	cost(): number {
		return this.coffee.cost() + 0.6;
	}

	description(): string {
		return this.coffee.description() + ', caramel';
	}
}

let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee = new WhippedCreamDecorator(coffee);
coffee = new CaramelDecorator(coffee);

console.log(`Cost: $${coffee.cost()}`); // Outputs: Cost: $3.0
console.log(`Description: ${coffee.description()}`); // Outputs: Description: Simple coffee, milk, sugar, whipped cream, caramel
