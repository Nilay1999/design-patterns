class DatabaseConnection {
	private static instance: DatabaseConnection;
	private connection: any; // Represents the database connection

	// Private constructor to prevent direct instantiation
	private constructor() {
		// Simulate a database connection
		this.connection = this.initializeConnection();
	}

	// Method to initialize the database connection
	private initializeConnection(): any {
		console.log('Initializing database connection...');
		// Replace this with actual database connection logic
		return { status: 'Connected' };
	}

	// Public method to get the singleton instance
	public static getInstance(): DatabaseConnection {
		if (!DatabaseConnection.instance) {
			DatabaseConnection.instance = new DatabaseConnection();
		}
		return DatabaseConnection.instance;
	}

	// Method to execute a query
	public query(sql: string): void {
		console.log(`Executing query: ${sql}`);
		// Replace this with actual query execution logic
	}

	// Method to close the connection
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

console.log(db1 === db2);
