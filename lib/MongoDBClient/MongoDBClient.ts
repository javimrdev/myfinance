import { MongoClient, Collection, Db } from 'mongodb';

export class MongoDBClient {
    private client: MongoClient;
    private db: Db | null = null;
    private readonly dbName: string;

    constructor(uri: string, dbName: string) {
        this.dbName = dbName;
        this.client = new MongoClient(uri);
    }

    async connect(): Promise<void> {
        try {
            await this.client.connect();
            this.db = this.client.db(this.dbName);
            console.log('Successfully connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    async executeQuery<T>(collectionName: string, query: object): Promise<T[]> {
        if (!this.db) {
            throw new Error('Database connection not established');
        }

        try {
            const collection: Collection = this.db.collection(collectionName);
            return await collection.find(query).toArray() as T[];
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async close(): Promise<void> {
        try {
            await this.client.close();
            console.log('MongoDB connection closed');
        } catch (error) {
            console.error('Error closing MongoDB connection:', error);
            throw error;
        }
    }
}

