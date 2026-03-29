import { PrismaClient } from '@prisma/client';

// Initialize the Prisma Client
const prisma = new PrismaClient();

// Export it so your Services can import it later
export default prisma;