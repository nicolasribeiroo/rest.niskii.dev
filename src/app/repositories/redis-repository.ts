export abstract class RedisRepository {
	public abstract get(key: string): Promise<string | null>;
	public abstract set(key: string, value: string, ttl: number): Promise<string>;
	public abstract psetex(key: string, milliseconds: number, value: string): Promise<unknown>;
	public abstract del(key: string): Promise<number>;
}
