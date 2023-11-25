import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from "redis";

export class KeyStorageConnectorService {
    private _client?: RedisClientType;

    constructor(private readonly configService: ConfigService) {}

    public async client() {
        const config = {
            host: this.configService.get<string>('redis.host'),
            port: this.configService.get<number>('redis.port'),
            password: this.configService.get<string>('redis.password'),
        };

        if (this._client?.isOpen) {
            return this._client;
        }

        this._client = createClient({
            socket: {
                host: config.host,
                port: config.port,
            },
            password: config.password,
        });

        await this._client.connect();

        return this._client;
    }
}