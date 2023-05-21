/*
import { createClient } from 'redis';

const client = createClient();

const connect = async () => {
    try {
        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();
    } catch (e) {
        console.log('error connecting to redis', e);
    }
}

const redisList = {
    lpush: async (element: any, items: Array<any>): Promise<any> => {
        return await client.lPush(element, items)
    },
    lpop: async (element: any,) => {
        return await client.lPop(element,)
    },
    all: async (element: any): Promise<Array<any>> => {
        return await client.lRange(element, 0, -1)
    },
    lrange: async (element: any, start: number, end: number) => {
        return await client.lRange(element, start, end)
    }
}

const redisHash = {
    set: async (key: string, field: string, value: any) => {
        return await client.hSet(key, field, value)
    },
    setMultiple: async (key: string, field: Record<string, string>) => {
        return await client.hSet(key, field)
    },
    get: async (key: string, field: string): Promise<any> => {
        return await client.hGet(key, field)
    },
    all: async (element: any): Promise<any> => {
        return await client.hGetAll(element)
    },
}
const disconnect = async () => {
    await client.disconnect();
}

export { connect, disconnect, redisList, redisHash, client as redisClient }
*/