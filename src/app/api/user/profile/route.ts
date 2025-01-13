import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = session?.user;

    const { phone, nationalId } = await req.json();
    let isComplete;
    if (phone && nationalId) {
      isComplete = true;
    }
    const userData = { ...user, phone, nationalId, isComplete };

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: userData,
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {}
}
