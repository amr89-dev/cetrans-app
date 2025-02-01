import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({ message: "hola" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
