"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/",        label: "홈" },
  { href: "/pokedex", label: "포켓몬 도감" },
  { href: "/items",   label: "도구" },
  { href: "/natures", label: "성격/크기" },
  { href: "/curry",   label: "카레 레시피" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-pokegray border-b border-pokeyellow/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-1 overflow-x-auto">
        {navItems.map(({ href, label }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                active
                  ? "bg-pokeyellow text-pokegray"
                  : "text-gray-300 hover:text-pokeyellow hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
