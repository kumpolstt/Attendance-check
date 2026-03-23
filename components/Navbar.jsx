"use client";

import { Menu, History, UserCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Roll Call", href: "/", icon: UserCheck },
    { name: "History", href: "/history", icon: History },
  ];

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 glass-nav border-b border-[#bfc8cf]/15 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 h-16 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-[#f0f4f7] transition-colors active:scale-95 duration-200">
              <Menu className="w-6 h-6 text-[#00668B]" />
            </button>
            <Link href="/" className="text-xl font-bold text-[#00668B] tracking-tight">
              The Serene Ledger
            </Link>
          </div>
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  pathname === item.href
                    ? "text-[#00668B] font-bold"
                    : "text-[#40484e] font-semibold hover:text-[#00668B]"
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 glass-nav border-t border-[#bfc8cf]/15 shadow-[0px_-8px_24px_rgba(23,28,31,0.06)] z-50 rounded-t-3xl bg-white/90 backdrop-blur-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center transition-all duration-300 active:scale-90 px-6 py-2 rounded-2xl ${
                isActive
                  ? "bg-gradient-to-br from-[#00668B] to-[#004d69] text-white shadow-lg shadow-sky-900/20"
                  : "text-[#171c1f]/60 hover:text-[#00668B]"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[11px] font-medium uppercase tracking-[0.05rem] mt-1">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
