declare const process: any;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.employee.createMany({
    data: [
      {
        firstName: "Chenyang",
        lastName: "Ma",
        role: "Manager",
        department: "Human Resources",
      },
      {
        firstName: "Jiyu",
        lastName: "Cai",
        role: "Manager",
        department: "Information Technology",
      },
      {
        firstName: "Alyssa",
        lastName: "Urquiola",
        role: "Manager",
        department: "Financial Services",
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });