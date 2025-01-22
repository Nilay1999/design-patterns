interface QueryBuilder {
	select(columns: string[]): QueryBuilder;
	from(table: string): QueryBuilder;
	join(table: string, condition: string): QueryBuilder;
	where(condition: string): QueryBuilder;
	groupBy(columns: string[]): QueryBuilder;
	having(condition: string): QueryBuilder;
	build(): string;
}

class SQLQueryBuilder implements QueryBuilder {
	private query: {
		select: string[];
		from: string;
		joins: string[];
		where: string[];
		groupBy: string[];
		having: string[];
	};

	constructor() {
		this.reset();
	}

	private reset(): void {
		this.query = {
			select: [],
			from: '',
			joins: [],
			where: [],
			groupBy: [],
			having: [],
		};
	}

	public select(columns: string[]): QueryBuilder {
		this.query.select = columns;
		return this;
	}

	public from(table: string): QueryBuilder {
		this.query.from = table;
		return this;
	}

	public join(table: string, condition: string): QueryBuilder {
		this.query.joins.push(`JOIN ${table} ON ${condition}`);
		return this;
	}

	public where(condition: string): QueryBuilder {
		this.query.where.push(condition);
		return this;
	}

	public groupBy(columns: string[]): QueryBuilder {
		this.query.groupBy = columns;
		return this;
	}

	public having(condition: string): QueryBuilder {
		this.query.having.push(condition);
		return this;
	}

	public build(): string {
		const parts: string[] = [];

		parts.push(`SELECT ${this.query.select.join(', ') || '*'}`);
		parts.push(`FROM ${this.query.from}`);

		if (this.query.joins.length > 0) {
			parts.push(this.query.joins.join(' '));
		}

		if (this.query.where.length > 0) {
			parts.push(`WHERE ${this.query.where.join(' AND ')}`);
		}

		if (this.query.groupBy.length > 0) {
			parts.push(`GROUP BY ${this.query.groupBy.join(', ')}`);
		}

		if (this.query.having.length > 0) {
			parts.push(`HAVING ${this.query.having.join(' AND ')}`);
		}

		return parts.join(' ') + ';';
	}
}

const queryBuilder = new SQLQueryBuilder();
const query = queryBuilder
	.select([
		'o.order_id',
		'c.name',
		'COUNT(*) as item_count',
		'SUM(oi.price) as total',
	])
	.from('orders o')
	.join('customers c', 'o.customer_id = c.id')
	.join('order_items oi', 'o.order_id = oi.order_id')
	.where('o.status = "completed"')
	.where('o.order_date >= "2024-01-01"')
	.groupBy(['o.order_id', 'c.name'])
	.having('COUNT(*) > 5')
	.build();

console.log(query);
