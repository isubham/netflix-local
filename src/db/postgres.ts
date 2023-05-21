import { Client, Pool, PoolClient } from "pg";

class db {

    static pool: Pool;

    constructor(host: string, user: string, password: string, maxConnections: number, database: string) {
        if (db.pool == undefined) {
            db.pool = new Pool({
                host: host,
                user: user,
                password: password,
                max: maxConnections,
                database: database,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000,
            });
        }
    }



    getClient(): Promise<PoolClient> {
        return db.pool.connect();
    }

    getPool(): Pool {
        return db.pool;
    }

    async getPoolClient() {
        await db.pool.connect();
    }


    async query(query: string, data: Array<any>) {
        try {
            const results = await db.pool.query(query, data)
            return results;
        } catch (e) {
        }
    }

    async transaction(query: string, data: Array<any>) {

        const poolClient = await db.pool.connect();
        try {
            poolClient.query("BEGIN")
            const results = await poolClient.query(query, data)
            poolClient.query("COMMIT")
            return results;
        } catch (e) {
            poolClient.query("ROLLBACK")
        }
    }

    async closePool() {
        try {
            // we can only end pool if totalCount and idleCount is same. i.e. there are no active clients.
            await db.pool.end(); // on remove gets called
        } catch (e) {
            console.log(e);
        }
    }

}

const tvDatabase = new db('localhost', 'subham', 'mysecretpassword', 100, 'tv');

export { tvDatabase };

