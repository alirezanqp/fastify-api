import { User } from "@prisma/client";
import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput): Promise<User> {
  const { password, email, name } = input;

  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      salt,
      password: hash,
    },
  });

  return user;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUsers() {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
}
