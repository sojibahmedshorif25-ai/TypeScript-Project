"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthContext";
import { Menu, X, ChevronDown, LayoutDashboard, PlusCircle, ListOrdered, User, LogOut } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-shadow">
              <span className="text-white font-bold text-sm">TM</span>
            </div>
            <span className="text-xl font-bold gradient-text">TypeMarket</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "text-blue-700 bg-blue-50/80"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <div className="relative group">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50/60 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Listings</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute top-full right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link href="/items/add" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                      <PlusCircle className="w-4 h-4 text-blue-500" />
                      Add Item
                    </Link>
                    <Link href="/items/manage" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                      <ListOrdered className="w-4 h-4 text-blue-500" />
                      Manage Items
                    </Link>
                  </div>
                )}
              </div>
            )}
            {user?.role === "admin" && (
              <Link href="/dashboard"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive("/dashboard")
                    ? "text-indigo-700 bg-indigo-50/80"
                    : "text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/60"
                }`}>
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {loading ? (
              <div className="w-24 h-9 shimmer rounded-lg" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link href="/profile"
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/profile")
                      ? "text-blue-700 bg-blue-50/80"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/60"
                  }`}>
                  <User className="w-4 h-4" />
                  {user.name.split(" ")[0]}
                </Link>
                <button onClick={logout}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50/60 rounded-lg transition-all">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/60 rounded-lg transition-all">
                  Login
                </Link>
                <Link href="/register"
                  className="px-5 py-2 text-sm font-medium text-white btn-gradient rounded-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-100/60 transition-all">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-blue-700 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}>
                {link.label}
              </Link>
            ))}
            {user && (
              <>
                <hr className="my-2 border-gray-100" />
                <Link href="/items/add" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50">
                  <PlusCircle className="w-4 h-4" />
                  Add Item
                </Link>
                <Link href="/items/manage" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50">
                  <ListOrdered className="w-4 h-4" />
                  Manage Items
                </Link>
              </>
            )}
            {user?.role === "admin" && (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            )}
            <hr className="my-2 border-gray-100" />
            {loading ? (
              <div className="w-full h-9 shimmer rounded-lg" />
            ) : user ? (
              <>
                <Link href="/profile" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <button onClick={() => { logout(); setMobileOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50">
                  <LogOut className="w-4 h-4" />
                  Logout ({user.name})
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-1">
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 text-center">
                  Login
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-white btn-gradient text-center">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
