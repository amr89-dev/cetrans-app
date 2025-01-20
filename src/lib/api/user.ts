import { UserInput } from "@/types";

export async function completeUserProfile(data: UserInput) {
  const res = await fetch("/api/user/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar perfil");
  }

  return res.json();
}
