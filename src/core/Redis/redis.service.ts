// import * as Redis from 'ioredis';
// import { Injectable } from '@nestjs/common';
// import { RedisService as RedisServiceCore } from 'nestjs-redis';
//
// @Injectable()
// export default class RedisService {
//   private readonly redisClient: Redis.Redis;
//
//   constructor(private readonly redisService: RedisServiceCore) {
//     this.redisClient = redisService.getClient();
//   }
//
//   public async set(
//     key: string,
//     value: string,
//     expiry: number = 3600,
//     expiryMode: string = 'EX',
//   ): Promise<'OK' | null> {
//
//     return this.redisClient.set(key, value, expiryMode, expiry);
//   }
//
//   public get(key: string): Promise<string | null> {
//     return this.redisClient.get(key);
//   }
// }