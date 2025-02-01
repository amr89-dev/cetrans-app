import { prisma } from "@/lib/prisma";
import { User } from "@/types";

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      vehicles: true,
      tripsAsDriver: true,
      tripsAsClient: true,
      expenses: true,
      documents: true,
      notifications: true,
      bankAccounts: true,
      ratings: true,
      givenRatings: true,
      payments: true,
    },
  });

  return user;
}

export async function getUserByNationalId(nationalId: string) {
  const user = await prisma.user.findUnique({
    where: { nationalId },
    include: {
      vehicles: true,
      tripsAsDriver: true,
      tripsAsClient: true,
      expenses: true,
      documents: true,
      notifications: true,
      bankAccounts: true,
      ratings: true,
      givenRatings: true,
      payments: true,
    },
  });
  return user;
}

export async function addUser(user: User) {
  try {
    const upsertData = {
      where: { id: user.id },
      create: {
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        emailVerified: user.emailVerified || null,
        image: user.image || "",
        phone: user.phone || "",
        nationalId: user.nationalId || "",
        role: user.role || "CLIENT",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        birthDate: user.birthDate,
        gender: user.gender || "OTHER",
        isComplete: user.isComplete,
        address: {
          create: user.address || [],
        },
        emergencyContact: {
          create: user.emergencyContact || [],
        },
      },
      update: {
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        emailVerified: user.emailVerified || null,
        image: user.image || "",
        phone: user.phone || "",
        nationalId: user.nationalId || "",
        role: user.role || "CLIENT",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        birthDate: user.birthDate || null,
        gender: user.gender || "OTHER",
        isComplete: user.isComplete,
        address: {
          create: user.address || [],
        },
        emergencyContact: {
          create: user.emergencyContact || [],
        },
      },
    };
    const newUser = await prisma.user.upsert(upsertData);

    return newUser;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error completo:", {
        message: err.message,

        name: err.name,
      });
      throw err;
    }
  }
}

export async function deleteUser(id: string) {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return deletedUser;
}
