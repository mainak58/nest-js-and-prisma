// import { Injectable } from '@nestjs/common';
// import { PrismaClient } from 'generated/prisma';

// @Injectable()
// export class PrismaService extends PrismaClient {
//   constructor() {
//     super();
//   }
// }

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect(); // Ensures DB is connected when app starts
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Closes DB connection gracefully
  }
}
