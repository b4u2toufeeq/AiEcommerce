import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import path from 'node:path';
import { PrismaModule } from './prisma/prisma.modules.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.resolve(__dirname, '../../.env'),
        path.resolve(process.cwd(), '../.env'),
        path.resolve(process.cwd(), '.env'),
      ],
      isGlobal: true,
    }),
    PrismaModule,
    ProductsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
