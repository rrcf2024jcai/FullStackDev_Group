import prisma from "../prisma/prisma";

// Find user by clerkId
export async function getByClerkId(clerkId: string) {
  return await prisma.user.findUnique({ where: { clerkId } });
}

// Create new user
export async function create(clerkId: string) {
  return await prisma.user.create({ data: { clerkId } });
}

// Find or create user by clerkId
export async function findOrCreate(clerkId: string) {
  const existing = await getByClerkId(clerkId);
  if (existing) return existing;
  return await create(clerkId);
}