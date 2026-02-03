declare module '@prisma/client' {
  // Minimal ambient declaration to satisfy TypeScript until proper generated types are available
  // We keep types loose to avoid blocking builds; you can replace with generated d.ts later.
  export class PrismaClient {
    constructor(...args: any[]);
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
  export const Prisma: any;
  export type Prisma = any;
  export default PrismaClient;
}
