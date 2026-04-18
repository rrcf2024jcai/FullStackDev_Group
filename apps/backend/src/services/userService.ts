import * as userRepository from "../repositories/userRepository";

export async function syncUser(clerkId: string) {
  return await userRepository.findOrCreate(clerkId);
}

export async function getUserByClerkId(clerkId: string) {
  return await userRepository.getByClerkId(clerkId);
}