import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { envSchema } from "./config/env.validation";
import { TypeOrmModule } from "@nestjs/typeorm";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as dotenv from 'dotenv';
import { EventsModule } from "./application/events/events.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const parsedEnv  = envSchema.safeParse(config);
        if (!parsedEnv.success) {
          console.error("Environment variables validation failed", parsedEnv.error.format());
          throw new Error("Invalid environment configuration");
        }
        return parsedEnv.data;
      }
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,  //Todo: make this false in production
      }),
      inject: [ConfigService]
    }),
    EventsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
