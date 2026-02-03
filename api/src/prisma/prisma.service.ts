import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  INestApplication,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Use default PrismaClient constructor. If you need a custom
    // connection pooling strategy or adapter, add the corresponding
    // package and options — but the simplest, correct pattern is
    // to call `super()` and let Prisma manage the connection based
    // on your DATABASE_URL.
    super();
  }

  // 4. Hook când modulul se inițializează - conectează la DB
  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma connected to database');
  }

  // 5. Hook când modulul se distruge - deconectează de la DB
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ Prisma disconnected from database');
  }

  // 6. (Optional) Helper method pentru tranzacții
  executeTransaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    // The generated Prisma client's $transaction typing can be complex and
    // occasionally trigger `@typescript-eslint/no-unsafe-*` ESLint errors in
    // mixed generated/type environments. Cast to `any` locally to avoid
    // noisy lint errors while preserving runtime behavior.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return this.$transaction(fn as any) as Promise<T>;
  }

  // 7. (Optional) Helper pentru clean shutdown
  enableShutdownHooks(app: INestApplication) {
    // The handler closes the Nest application when Prisma emits `beforeExit`.
    // Some lint rules can report unsafe calls when mixing generated client
    // types with application types; cast to any in the callback to silence
    // those false positives.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.$on('beforeExit', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await (app as any).close();
    });
  }
}
