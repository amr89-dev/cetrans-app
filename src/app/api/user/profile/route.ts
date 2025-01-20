import { auth } from "@/auth";
import { addUser } from "@/services/user.service";
import { User } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = session?.user;

    const {
      phone,
      nationalId,
      firstName,
      lastName,
      role,
      address,
      birthDate,
      gender,
      emergencyContact,
    } = await req.json();

    let isComplete = false;
    if (
      phone &&
      nationalId &&
      firstName &&
      lastName &&
      address &&
      role &&
      birthDate &&
      gender &&
      emergencyContact
    ) {
      isComplete = true;
    }

    const userData: User = {
      ...user,
      id: user.id || "",
      phone,
      nationalId,
      firstName,
      lastName,
      createdAt: new Date(),
      isVerified: false,
      rating: 0,
      totalRatings: 0,

      role,
      address,
      emergencyContact,
      birthDate,
      gender,
      isComplete,
      updatedAt: new Date(),
      isActive: true,
    };

    const userCreated = await addUser(userData);
    return NextResponse.json(userCreated, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
