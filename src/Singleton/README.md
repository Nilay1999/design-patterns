# Singleton Design Pattern in TypeScript

This repository demonstrates the **Singleton Design Pattern** implemented in TypeScript. The Singleton pattern ensures that a class has only one instance and provides a global point of access to that instance.

## Table of Contents

-   [Singleton Design Pattern in TypeScript](#singleton-design-pattern-in-typescript)
    -   [Table of Contents](#table-of-contents)
    -   [What is the Singleton Design Pattern?](#what-is-the-singleton-design-pattern)
        -   [Key Features:](#key-features)
    -   [Use Case](#use-case)
        -   [Benefits:](#benefits)
    -   [Code Example](#code-example)

---

## What is the Singleton Design Pattern?

The **Singleton Design Pattern** is a creational design pattern that ensures a class has only one instance and provides a global point of access to that instance. It is useful when exactly one object is needed to coordinate actions across a system.

### Key Features:

-   **Single Instance**: Only one instance of the class is created.
-   **Global Access**: The instance is globally accessible.
-   **Lazy Initialization**: The instance is created only when it is needed.

---

## Use Case

A common use case for the Singleton pattern is managing a **database connection** in a web application. Creating a new database connection for every request can be expensive and inefficient. Instead, the Singleton pattern ensures that only one instance of the database connection is created and shared across the application.

### Benefits:

-   **Resource Efficiency**: Reduces overhead by reusing the same connection.
-   **Consistency**: Ensures all parts of the application use the same connection.
-   **Centralized Management**: The connection lifecycle (creation, usage, and closing) is managed in one place.

---

## Code Example

Below is an example of a Singleton class for managing a database connection in TypeScript:

```typescript
class DatabaseConnection {
	private static instance: DatabaseConnection;
	private connection: any; // Represents the database connection

	/**
	 * Private constructor to prevent direct instantiation.
	 */
	private constructor() {
		this.connection = this.initializeConnection();
	}

	/**
	 * Initializes the database connection.
	 * @returns {any} A simulated database connection object.
	 */
	private initializeConnection(): any {
		console.log('Initializing database connection...');
		// Replace this with actual database connection logic
		return { status: 'Connected' };
	}

	/**
	 * Returns the singleton instance of the DatabaseConnection class.
	 * If the instance does not exist, it creates one.
	 * @returns {DatabaseConnection} The singleton instance.
	 */
	public static getInstance(): DatabaseConnection {
		if (!DatabaseConnection.instance) {
			DatabaseConnection.instance = new DatabaseConnection();
		}
		return DatabaseConnection.instance;
	}

	/**
	 * Executes a database query.
	 * @param {string} sql - The SQL query to execute.
	 */
	public query(sql: string): void {
		console.log(`Executing query: ${sql}`);
		// Replace this with actual query execution logic
	}

	/**
	 * Closes the database connection.
	 */
	public close(): void {
		console.log('Closing database connection...');
		this.connection = null;
	}
}

// Usage
const db1 = DatabaseConnection.getInstance();
db1.query('SELECT * FROM users');

const db2 = DatabaseConnection.getInstance();
db2.query('SELECT * FROM products');

console.log(db1 === db2); // true, both references point to the same instance
```
