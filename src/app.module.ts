import { Module ,CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule ,ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PassportModule } from "@nestjs/passport";
import { UserService } from "./modules/user/user.service";
import {JwtService} from "@nestjs/jwt";
import {localAuthGuard} from "./modules/user/guards/local-guard";
import {LocalAuthGuard} from "./modules/user/strategies/local-strategy";
import {JWTGuard} from "./modules/user/guards/jwt-guard";
import { JwtStrategy } from "./modules/user/strategies/jwt-strategy";
import { envSchema } from "./config/schema/env.schema";




@Module({
  imports: [
   ,
    // Database connection
    ConfigModule.forRoot(
      {
        cache: true,
        isGlobal: true,
        expandVariables: true,
        envFilePath: ['.env'],
        validationSchema: envSchema,
      }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: process.env.MONGO_URI,
      }),
      inject: [ConfigService],
    }),
  // redis connection
  //   RedisModule.register({
  //     host: `${host}`,
  //     port: 6379,
  //   }),

    // CacheModule.register({
    //
    //   host: 'localhost', //default host
    //   port: 6379 //default port
    // }),

    //   RedisModule.register({
    //   url: process.env.REDIS_URL,
    //   onClientReady: async (client): Promise<void> => {
    //     client.on('error', console.error);
    //     client.on('ready', () => {
    //       console.log('Redis: Connection successful.');
    //     });
    //     client.on('restart', () => {
    //       console.log('Attempt to restart the redis server');
    //     });
    //   },
    //   reconnectOnError: (): boolean => true,
    // }),


    AuthModule,
    UserModule,
    PassportModule,
  ],
  controllers: [],
  providers: [UserService,JwtService ,localAuthGuard ,LocalAuthGuard ,JWTGuard,JwtStrategy],
})
export class AppModule {}
