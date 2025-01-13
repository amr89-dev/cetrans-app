import Link from "next/link";
import {
  LayoutDashboard,
  MapPin,
  Wallet,
  User,
  DollarSign,
} from "lucide-react";

export function Toolbar() {
  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/viajes", label: "Viajes", icon: MapPin },
    { href: "/gastos", label: "Gastos", icon: Wallet },
    { href: "/finanzas", label: "Finanzas", icon: DollarSign },
    { href: "/perfil", label: "Perfil", icon: User },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16">
      {links.map((el) => (
        <Link
          key={el.href}
          href={el.href}
          className="flex flex-col items-center text-gray-600 hover:text-blue-500"
        >
          <el.icon className="h-6 w-6" />
          <span className="text-xs mt-1">{el.label}</span>
        </Link>
      ))}
    </nav>
  );
}
