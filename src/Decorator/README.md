# Decorator Design Pattern - Coffee Example

This project demonstrates the **Decorator Design Pattern** using a real-world example of customizing a coffee order. The decorator pattern allows behavior to be added to individual objects dynamically, without affecting the behavior of other objects from the same class.

---

## Table of Contents

1. [What is the Decorator Design Pattern?](#what-is-the-decorator-design-pattern)
2. [Project Structure](#project-structure)
3. [Code Explanation](#code-explanation)
4. [Usage Example](#usage-example)
5. [How to Run](#how-to-run)

---

## What is the Decorator Design Pattern?

The **Decorator Design Pattern** is a **structural design pattern** that allows behavior to be added to individual objects dynamically, at runtime, without affecting the behavior of other objects from the same class. It is an alternative to subclassing for extending functionality.

### Real-World Analogy

Think of ordering coffee at a café:

-   You start with a **base coffee** (e.g., simple coffee).
-   You can add **decorations** like milk, sugar, whipped cream, or caramel.
-   Each decoration adds to the cost and modifies the description of the coffee.

The decorator pattern allows you to add these decorations dynamically without modifying the base coffee class.

---

## Project Structure

The project consists of the following classes:

1. **`Coffee`**: Represents the base interface for all coffee types.
2. **`SimpleCoffee`**: Represents the base coffee without any decorations.
3. **`CoffeeDecorator`**: An abstract class that serves as the base for all decorators.
4. **`MilkDecorator`**, **`SugarDecorator`**, **`WhippedCreamDecorator`**, **`CaramelDecorator`**: Concrete decorators that add specific behaviors to the coffee.

---

## Code Explanation

### 1. `Coffee` Interface

Represents the base interface for all coffee types.

```typescript
/**
 * Represents the base interface for all coffee types.
 * @interface
 */
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
```

---

### 2. `SimpleCoffee` Class

Represents the base coffee without any decorations.

```typescript
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
```

---

### 3. `CoffeeDecorator` Abstract Class

Serves as the base for all decorators.

```typescript
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
```

---

### 4. Concrete Decorator Classes

Add specific behaviors to the coffee.

#### `MilkDecorator`

```typescript
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
```

#### `SugarDecorator`

```typescript
/**
 * Represents a decorator that adds sugar to the coffee.
 * @class
 */
class SugarDecorator extends CoffeeDecorator {
	cost(): number {
		return this.coffee.cost() + 0.2;
	}

	description(): string {
		return this.coffee.description() + ', sugar';
	}
}
```

#### `WhippedCreamDecorator`

```typescript
/**
 * Represents a decorator that adds whipped cream to the coffee.
 * @class
 */
class WhippedCreamDecorator extends CoffeeDecorator {
	cost(): number {
		return this.coffee.cost() + 0.7;
	}

	description(): string {
		return this.coffee.description() + ', whipped cream';
	}
}
```

#### `CaramelDecorator`

```typescript
/**
 * Represents a decorator that adds caramel to the coffee.
 * @class
 */
class CaramelDecorator extends CoffeeDecorator {
	cost(): number {
		return this.coffee.cost() + 0.6;
	}

	description(): string {
		return this.coffee.description() + ', caramel';
	}
}
```

---

## Usage Example

```typescript
// Start with a simple coffee
let coffee: Coffee = new SimpleCoffee();

// Add decorations dynamically
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee = new WhippedCreamDecorator(coffee);
coffee = new CaramelDecorator(coffee);

// Output the final cost and description
console.log(`Cost: $${coffee.cost()}`); // Outputs: Cost: $3.0
console.log(`Description: ${coffee.description()}`); // Outputs: Description: Simple coffee, milk, sugar, whipped cream, caramel
```

---

## How to Run

1. Save the code in a file, e.g., `coffee-decorator.ts`.
2. Compile the TypeScript code to JavaScript:
    ```bash
    tsc coffee-decorator.ts
    ```
3. Run the compiled JavaScript file:
    ```bash
    node coffee-decorator.js
    ```

---

## Output

```
Cost: $3.0
Description: Simple coffee, milk, sugar, whipped cream, caramel
```

---

## Key Takeaways

-   The **Decorator Design Pattern** allows behavior to be added to objects dynamically.
-   It is an alternative to subclassing for extending functionality.
-   Decorators wrap the original object and add new behaviors without modifying the original class.

---
